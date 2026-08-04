import type { VercelRequest, VercelResponse } from '@vercel/node';

interface OpenRequestFormData {
  name: string;
  email: string;
  company: string;
  companySize: string;
  useCase: string;
}

const COMPANY_SIZES = new Set([
  '1-10',
  '11-50',
  '51-200',
  '201-1000',
  '1000+',
]);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatEmailHtml(data: OpenRequestFormData): string {
  return `
    <h2>New CodeRx Open Request</h2>
    <p>Someone requested access to the free CodeRx Open drug database.</p>
    <hr>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Company size:</strong> ${escapeHtml(data.companySize)}</p>
    <hr>
    <h3>Use case</h3>
    <p>${escapeHtml(data.useCase).replace(/\n/g, '<br>')}</p>
  `;
}

function formatEmailText(data: OpenRequestFormData): string {
  return `
New CodeRx Open Request

Someone requested access to the free CodeRx Open drug database.

Name: ${data.name}
Email: ${data.email}
Company: ${data.company}
Company size: ${data.companySize}

Use case:
${data.useCase}
  `.trim();
}

async function sendEmailWithResend(data: OpenRequestFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = (process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev').trim();
  const toEmail = (process.env.CONTACT_EMAIL || process.env.RESEND_TO_EMAIL)?.trim();

  if (!apiKey || !toEmail) {
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: data.email,
        subject: `CodeRx Open: ${data.company} (${data.name})`,
        html: formatEmailHtml(data),
        text: formatEmailText(data),
      }),
    });

    if (!response.ok) {
      console.error('Resend API error:', response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return false;
  }
}

async function sendEmailWithSendGrid(data: OpenRequestFormData): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const toEmail = process.env.CONTACT_EMAIL || process.env.SENDGRID_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return false;
  }

  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: toEmail }],
            reply_to: { email: data.email, name: data.name },
          },
        ],
        from: { email: fromEmail },
        subject: `CodeRx Open: ${data.company} (${data.name})`,
        content: [
          { type: 'text/plain', value: formatEmailText(data) },
          { type: 'text/html', value: formatEmailHtml(data) },
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email with SendGrid:', error);
    return false;
  }
}

async function sendToWebhook(data: OpenRequestFormData): Promise<boolean> {
  const webhookUrl =
    process.env.OPEN_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;

  if (!webhookUrl) {
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: 'coderx-open-form',
        pipeline: 'coderx-open',
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending to webhook:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, company, companySize, useCase } =
      req.body as OpenRequestFormData;

    if (!name || !email || !company || !companySize || !useCase) {
      return res.status(400).json({
        error:
          'Missing required fields: name, email, company, companySize, and useCase are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!COMPANY_SIZES.has(companySize)) {
      return res.status(400).json({ error: 'Invalid company size' });
    }

    if (useCase.length > 10000) {
      return res.status(400).json({ error: 'Use case is too long' });
    }

    const payload: OpenRequestFormData = {
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      companySize,
      useCase: useCase.trim(),
    };

    // Webhook first so leads land in the CRM even if email delivery is down
    let delivered = await sendToWebhook(payload);

    if (process.env.RESEND_API_KEY) {
      const emailed = await sendEmailWithResend(payload);
      delivered = delivered || emailed;
    }

    if (!delivered && process.env.SENDGRID_API_KEY) {
      delivered = await sendEmailWithSendGrid(payload);
    }

    if (!delivered) {
      console.error('No lead capture destination configured for CodeRx Open');
      return res.status(500).json({
        error:
          'Lead capture is not configured. Set OPEN_WEBHOOK_URL, CONTACT_WEBHOOK_URL, or RESEND_API_KEY with CONTACT_EMAIL.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'CodeRx Open request submitted successfully',
    });
  } catch (error) {
    console.error('Error processing CodeRx Open request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
