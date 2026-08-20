import type { VercelRequest, VercelResponse } from '@vercel/node';

interface ApiWaitlistFormData {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  company: string;
  companyWebsite: string;
  role: string;
  companyType: string;
  companySize: string;
  useCase: string;
  problem: string;
  currentVendor: string;
  currentDataSources: string;
  needsApiAccess: string;
  timeline: string;
  openToFollowUp: string;
}

const COMPANY_TYPES = new Set([
  'Digital health startup',
  'Pharmacy or pharmacy tech',
  'PBM, benefits, or navigation',
  'EHR or clinical software',
  'Research or academic',
  'Consulting',
  'Data platform',
  'Payer or employer health',
  'Other',
]);

const COMPANY_SIZES = new Set([
  '1-10',
  '11-50',
  '51-200',
  '201-1000',
  '1000+',
]);

const USE_CASES = new Set([
  'Population health and utilization',
  'Payer coverage and mix',
  'Claims analytics',
  'Medication feature in a product',
  'Replace a proprietary drug database',
  'Formulary and benefit design',
  'Healthcare AI or data product',
  'Academic or clinical research',
  'Other',
]);

const YES_NO = new Set(['Yes', 'No']);
const API_ACCESS = new Set(['Yes', 'No', 'Not sure']);
const TIMELINES = new Set([
  'Just exploring',
  'Immediately',
  '1–3 months',
  '3–6 months',
  '6+ months',
]);

const WAITLIST_TO_EMAIL = 'api@coderx.io';

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidWebsite(value: string): boolean {
  if (!value) {
    return false;
  }
  try {
    const url = new URL(value.includes('://') ? value : `https://${value}`);
    return Boolean(url.hostname.includes('.'));
  } catch {
    return false;
  }
}

function normalizeWebsite(value: string): string {
  return value.includes('://') ? value : `https://${value}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function display(value: string): string {
  return value || '—';
}

function formatEmailHtml(data: ApiWaitlistFormData): string {
  return `
    <h2>New CodeRx API Waitlist Request</h2>
    <p>Someone joined the waitlist for the CodeRx API.</p>
    <hr>
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Work email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Company:</strong> ${escapeHtml(data.company)}</p>
    <p><strong>Company website:</strong> ${escapeHtml(data.companyWebsite)}</p>
    <p><strong>Role or title:</strong> ${escapeHtml(data.role)}</p>
    <p><strong>Company type:</strong> ${escapeHtml(data.companyType)}</p>
    <p><strong>Company size:</strong> ${escapeHtml(data.companySize)}</p>
    <p><strong>Intended use case:</strong> ${escapeHtml(data.useCase)}</p>
    <hr>
    <h3>What drug data problem are you trying to solve?</h3>
    <p>${escapeHtml(data.problem).replace(/\n/g, '<br>')}</p>
    <hr>
    <p><strong>Currently using a drug database vendor:</strong> ${escapeHtml(display(data.currentVendor))}</p>
    <p><strong>Current data sources:</strong> ${escapeHtml(display(data.currentDataSources))}</p>
    <p><strong>Needs API access:</strong> ${escapeHtml(display(data.needsApiAccess))}</p>
    <p><strong>Timeline:</strong> ${escapeHtml(display(data.timeline))}</p>
    <p><strong>Open to a follow-up conversation:</strong> ${escapeHtml(display(data.openToFollowUp))}</p>
  `;
}

function formatEmailText(data: ApiWaitlistFormData): string {
  return `
New CodeRx API Waitlist Request

Someone joined the waitlist for the CodeRx API.

Name: ${data.name}
Work email: ${data.email}
Company: ${data.company}
Company website: ${data.companyWebsite}
Role or title: ${data.role}
Company type: ${data.companyType}
Company size: ${data.companySize}
Intended use case: ${data.useCase}

What drug data problem are you trying to solve?
${data.problem}

Currently using a drug database vendor: ${display(data.currentVendor)}
Current data sources: ${display(data.currentDataSources)}
Needs API access: ${display(data.needsApiAccess)}
Timeline: ${display(data.timeline)}
Open to a follow-up conversation: ${display(data.openToFollowUp)}
  `.trim();
}

async function sendEmailWithResend(data: ApiWaitlistFormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const fromEmail = (process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev').trim();
  const toEmail = (
    process.env.API_WAITLIST_EMAIL ||
    WAITLIST_TO_EMAIL
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
        subject: `CodeRx API waitlist: ${data.company} (${data.name})`,
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

async function sendEmailWithSendGrid(data: ApiWaitlistFormData): Promise<boolean> {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  const toEmail = process.env.API_WAITLIST_EMAIL || WAITLIST_TO_EMAIL;

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
        subject: `CodeRx API waitlist: ${data.company} (${data.name})`,
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

async function sendToWebhook(data: ApiWaitlistFormData): Promise<boolean> {
  const webhookUrl =
    process.env.API_WAITLIST_WEBHOOK_URL ||
    process.env.OPEN_WEBHOOK_URL ||
    process.env.CONTACT_WEBHOOK_URL;

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
        source: 'coderx-api-waitlist-form',
        pipeline: 'coderx-api-waitlist',
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

function isAllowedOptional(value: string, allowed: Set<string>): boolean {
  return value === '' || allowed.has(value);
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
    const body = (req.body ?? {}) as Record<string, unknown>;
    const firstName = asString(body.firstName);
    const lastName = asString(body.lastName);
    const email = asString(body.email);
    const company = asString(body.company);
    const companyWebsite = asString(body.companyWebsite);
    const role = asString(body.role);
    const companyType = asString(body.companyType);
    const companySize = asString(body.companySize);
    const useCase = asString(body.useCase);
    const problem = asString(body.problem);
    const currentVendor = asString(body.currentVendor);
    const currentDataSources = asString(body.currentDataSources);
    const needsApiAccess = asString(body.needsApiAccess);
    const timeline = asString(body.timeline);
    const openToFollowUp = asString(body.openToFollowUp);

    if (
      !firstName ||
      !lastName ||
      !email ||
      !company ||
      !companyWebsite ||
      !role ||
      !companyType ||
      !companySize ||
      !useCase ||
      !problem
    ) {
      return res.status(400).json({
        error:
          'Missing required fields: firstName, lastName, email, company, companyWebsite, role, companyType, companySize, useCase, and problem are required',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    if (!isValidWebsite(companyWebsite)) {
      return res.status(400).json({ error: 'Invalid company website' });
    }

    if (!COMPANY_TYPES.has(companyType)) {
      return res.status(400).json({ error: 'Invalid company type' });
    }

    if (!COMPANY_SIZES.has(companySize)) {
      return res.status(400).json({ error: 'Invalid company size' });
    }

    if (!USE_CASES.has(useCase)) {
      return res.status(400).json({ error: 'Invalid use case' });
    }

    if (!isAllowedOptional(currentVendor, YES_NO)) {
      return res.status(400).json({ error: 'Invalid vendor answer' });
    }

    if (!isAllowedOptional(needsApiAccess, API_ACCESS)) {
      return res.status(400).json({ error: 'Invalid API access answer' });
    }

    if (!isAllowedOptional(timeline, TIMELINES)) {
      return res.status(400).json({ error: 'Invalid timeline' });
    }

    if (!isAllowedOptional(openToFollowUp, YES_NO)) {
      return res.status(400).json({ error: 'Invalid follow-up answer' });
    }

    if (problem.length > 10000) {
      return res.status(400).json({ error: 'Problem description is too long' });
    }

    if (currentDataSources.length > 2000) {
      return res.status(400).json({ error: 'Data sources answer is too long' });
    }

    const payload: ApiWaitlistFormData = {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      company,
      companyWebsite: normalizeWebsite(companyWebsite),
      role,
      companyType,
      companySize,
      useCase,
      problem,
      currentVendor,
      currentDataSources,
      needsApiAccess,
      timeline,
      openToFollowUp,
    };

    let delivered = await sendToWebhook(payload);

    if (process.env.RESEND_API_KEY) {
      const emailed = await sendEmailWithResend(payload);
      delivered = delivered || emailed;
    }

    if (!delivered && process.env.SENDGRID_API_KEY) {
      delivered = await sendEmailWithSendGrid(payload);
    }

    if (!delivered) {
      console.error('No lead capture destination configured for CodeRx API waitlist');
      return res.status(500).json({
        error:
          'Lead capture is not configured. Set RESEND_API_KEY (emails api@coderx.io) or API_WAITLIST_WEBHOOK_URL.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'CodeRx API waitlist request submitted successfully',
    });
  } catch (error) {
    console.error('Error processing CodeRx API waitlist request:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
