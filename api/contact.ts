import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Validate email format
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Send email using Resend (recommended for Vercel)
async function sendEmailWithResend(data: ContactFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
  const toEmail = process.env.CONTACT_EMAIL || process.env.RESEND_TO_EMAIL;

  if (!apiKey) {
    console.error('RESEND_API_KEY not configured');
    return false;
  }

  if (!toEmail) {
    console.error('CONTACT_EMAIL or RESEND_TO_EMAIL not configured');
    return false;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: toEmail,
        reply_to: data.email,
        subject: `Contact Form: ${data.subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${data.name} (${data.email})</p>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <hr>
          <h3>Message:</h3>
          <p>${data.message.replace(/\n/g, '<br>')}</p>
        `,
        text: `
New Contact Form Submission

From: ${data.name} (${data.email})
Subject: ${data.subject}

Message:
${data.message}
        `,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Resend API error:', response.status, errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending email with Resend:', error);
    return false;
  }
}

// Alternative: Send email using SendGrid
async function sendEmailWithSendGrid(data: ContactFormData): Promise<boolean> {
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
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: toEmail }],
            reply_to: { email: data.email, name: data.name },
          },
        ],
        from: { email: fromEmail },
        subject: `Contact Form: ${data.subject}`,
        content: [
          {
            type: 'text/plain',
            value: `
New Contact Form Submission

From: ${data.name} (${data.email})
Subject: ${data.subject}

Message:
${data.message}
            `,
          },
          {
            type: 'text/html',
            value: `
              <h2>New Contact Form Submission</h2>
              <p><strong>From:</strong> ${data.name} (${data.email})</p>
              <p><strong>Subject:</strong> ${data.subject}</p>
              <hr>
              <h3>Message:</h3>
              <p>${data.message.replace(/\n/g, '<br>')}</p>
            `,
          },
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Error sending email with SendGrid:', error);
    return false;
  }
}

// Send to webhook (useful for services like Zapier, Make, etc.)
async function sendToWebhook(data: ContactFormData): Promise<boolean> {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

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
        source: 'contact-form',
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
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CORS headers (adjust origins as needed)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, email, subject, message } = req.body as ContactFormData;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields: name, email, subject, and message are required',
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({
        error: 'Invalid email address',
      });
    }

    // Basic spam protection: check message length
    if (message.length > 10000) {
      return res.status(400).json({
        error: 'Message is too long',
      });
    }

    // Try to send email using available services (in order of preference)
    let sent = false;

    // Try Resend first (recommended)
    if (process.env.RESEND_API_KEY) {
      sent = await sendEmailWithResend({ name, email, subject, message });
    }

    // Fallback to SendGrid
    if (!sent && process.env.SENDGRID_API_KEY) {
      sent = await sendEmailWithSendGrid({ name, email, subject, message });
    }

    // Fallback to webhook
    if (!sent && process.env.CONTACT_WEBHOOK_URL) {
      sent = await sendToWebhook({ name, email, subject, message });
    }

    if (!sent) {
      console.error('No email service configured. Available env vars:', {
        hasResendKey: !!process.env.RESEND_API_KEY,
        hasSendGridKey: !!process.env.SENDGRID_API_KEY,
        hasWebhook: !!process.env.CONTACT_WEBHOOK_URL,
      });
      return res.status(500).json({
        error: 'Email service not configured. Please configure RESEND_API_KEY, SENDGRID_API_KEY, or CONTACT_WEBHOOK_URL',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully',
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return res.status(500).json({
      error: 'Internal server error',
    });
  }
}
