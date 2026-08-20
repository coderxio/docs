import type { VercelRequest, VercelResponse } from '@vercel/node';

interface InquiryFormData {
  name: string;
  email: string;
  message: string;
}

const INQUIRY_TO_EMAIL = 'hello@coderx.io';

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

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

function formatEmailHtml(data: InquiryFormData): string {
  return `
    <h2>New homepage walkthrough inquiry</h2>
    <p>Someone asked to talk through the purpose-built data marts.</p>
    <hr>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Work email:</strong> ${escapeHtml(data.email)}</p>
    <hr>
    <h3>Message</h3>
    <p>${escapeHtml(data.message).replace(/\n/g, '<br>')}</p>
  `;
}

function formatEmailText(data: InquiryFormData): string {
  return `
New homepage walkthrough inquiry

Someone asked to talk through the purpose-built data marts.

Name: ${data.name}
Work email: ${data.email}

Message:
${data.message}
  `.trim();
}

async function sendEmailWithResend(data: InquiryFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = (
    process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
  ).trim();
  const toEmail = (
    process.env.CONTACT_EMAIL ||
    process.env.RESEND_TO_EMAIL ||
    INQUIRY_TO_EMAIL
  ).trim();

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
        subject: `Walkthrough inquiry: ${data.name}`,
        html: formatEmailHtml(data),
        text: formatEmailText(data),
      }),
    });

    if (!response.ok) {
      console.error(
        'Resend API error:',
        response.status,
        await response.text(),
      );
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return false;
  }
}

async function sendEmailWithSendGrid(data: InquiryFormData): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const toEmail =
    process.env.CONTACT_EMAIL || process.env.SENDGRID_TO_EMAIL || INQUIRY_TO_EMAIL;

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
            to: [{email: toEmail}],
            reply_to: {email: data.email, name: data.name},
          },
        ],
        from: {email: fromEmail},
        subject: `Walkthrough inquiry: ${data.name}`,
        content: [
          {type: 'text/plain', value: formatEmailText(data)},
          {type: 'text/html', value: formatEmailHtml(data)},
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email with SendGrid:', error);
    return false;
  }
}

async function sendToWebhook(data: InquiryFormData): Promise<boolean> {
  const webhookUrl =
    process.env.INQUIRY_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;

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
        source: 'homepage-walkthrough-inquiry',
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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  try {
    const body = (req.body ?? {}) as Record<string, unknown>;
    const name = asString(body.name);
    const email = asString(body.email);
    const message = asString(body.message);

    if (!name || !email || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, and message are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({error: 'Invalid email address'});
    }

    if (message.length > 10000) {
      return res.status(400).json({error: 'Message is too long'});
    }

    const payload: InquiryFormData = {name, email, message};

    let delivered = await sendToWebhook(payload);

    if (process.env.RESEND_API_KEY) {
      const emailed = await sendEmailWithResend(payload);
      delivered = delivered || emailed;
    }

    if (!delivered && process.env.SENDGRID_API_KEY) {
      delivered = await sendEmailWithSendGrid(payload);
    }

    if (!delivered) {
      console.error(
        'No lead capture destination configured for walkthrough inquiry',
      );
      return res.status(500).json({
        error:
          'Lead capture is not configured. Set RESEND_API_KEY (emails hello@coderx.io) or CONTACT_WEBHOOK_URL.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Walkthrough inquiry submitted successfully',
    });
  } catch (error) {
    console.error('Error processing walkthrough inquiry:', error);
    return res.status(500).json({error: 'Internal server error'});
  }
}
