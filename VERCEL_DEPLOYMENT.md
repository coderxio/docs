# Vercel Deployment Guide

This guide will help you deploy your CodeRx Docusaurus documentation site with a contact form to Vercel.

## Prerequisites

- A Vercel account (sign up at [vercel.com](https://vercel.com))
- Your code in a Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Configure Email Service

The contact form requires an email service to send form submissions. Choose one of the following options:

### Option A: Resend (Recommended)

Resend offers a free tier with 3,000 emails/month and is optimized for Vercel.

1. **Sign up for Resend**: Go to [resend.com](https://resend.com) and create an account
2. **Create an API Key**: 
   - Go to API Keys in your Resend dashboard
   - Click "Create API Key"
   - Copy the API key
3. **Verify your domain** (optional but recommended):
   - Add your domain in Resend
   - Add the required DNS records
   - Once verified, you can use emails from your domain (e.g., `noreply@yourdomain.com`)

### Option B: SendGrid

1. **Sign up for SendGrid**: Go to [sendgrid.com](https://sendgrid.com)
2. **Create an API Key**: 
   - Go to Settings → API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the API key
3. **Verify your sender email**: Add and verify your sender email address

### Option C: Webhook

If you prefer to use a service like Zapier, Make (Integromat), or a custom endpoint:

1. Set up your webhook endpoint
2. Use the webhook URL in your environment variables

## Step 2: Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Add contact form"
   git push
   ```

2. **Import your project in Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your repository
   - Vercel will auto-detect Docusaurus

3. **Configure Build Settings**:
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

4. **Set Environment Variables**:
   
   For **Resend**:
   ```
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=noreply@yourdomain.com (or use onboarding@resend.dev for testing)
   CONTACT_EMAIL=your-email@example.com
   ```
   
   For **SendGrid**:
   ```
   SENDGRID_API_KEY=SG.your_api_key_here
   SENDGRID_FROM_EMAIL=noreply@yourdomain.com
   CONTACT_EMAIL=your-email@example.com
   ```
   
   For **Webhook**:
   ```
   CONTACT_WEBHOOK_URL=https://your-webhook-url.com/endpoint
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait for the build to complete
   - Your site will be live!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   cd docs
   vercel
   ```
   - Follow the prompts to link your project
   - Choose your preferred settings

4. **Set Environment Variables**:
   ```bash
   # For Resend
   vercel env add RESEND_API_KEY
   vercel env add RESEND_FROM_EMAIL
   vercel env add CONTACT_EMAIL
   
   # Or for SendGrid
   vercel env add SENDGRID_API_KEY
   vercel env add SENDGRID_FROM_EMAIL
   vercel env add CONTACT_EMAIL
   
   # Or for Webhook
   vercel env add CONTACT_WEBHOOK_URL
   ```
   
   Enter the values when prompted. Make sure to add to "Production" environment (and "Preview"/"Development" if needed).

5. **Redeploy with environment variables**:
   ```bash
   vercel --prod
   ```

## Step 3: Test the Contact Form

1. Visit your deployed site at `https://your-site.vercel.app/contact-us`
2. Fill out and submit the contact form
3. Check your email inbox for the form submission

## Step 4: Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain (e.g., `docs.coderx.io`)
3. Follow Vercel's instructions to configure DNS
4. Once DNS propagates, your site will be available on your custom domain

## Troubleshooting

### Contact form not working?

1. **Check environment variables**:
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Verify all required variables are set correctly
   - **Important**: If using Resend, you need BOTH `RESEND_API_KEY` AND `CONTACT_EMAIL` (or `RESEND_TO_EMAIL`)
   - Make sure they're added to the correct environment (Production, Preview, Development)
   - **After adding/updating environment variables, you must redeploy for changes to take effect**

2. **Check serverless function logs**:
   - Go to Vercel Dashboard → Your Project → Functions
   - Click on the `/api/contact` function
   - Check the logs for any errors

3. **Test API endpoint directly**:
   ```bash
   curl -X POST https://your-site.vercel.app/api/contact \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test User",
       "email": "test@example.com",
       "subject": "Test",
       "message": "This is a test message"
     }'
   ```

### Email not sending?

1. **Resend**: 
   - Verify your API key is correct
   - Check Resend dashboard for delivery status
   - If using `onboarding@resend.dev`, make sure you've verified your account

2. **SendGrid**:
   - Verify API key has "Mail Send" permissions
   - Check SendGrid Activity Feed for delivery status
   - Verify sender email is verified in SendGrid

3. **Check serverless function logs** in Vercel dashboard for specific error messages

## Environment Variables Summary

| Variable | Required For | Description |
|----------|--------------|-------------|
| `RESEND_API_KEY` | Resend | Your Resend API key |
| `RESEND_FROM_EMAIL` | Resend | Email address to send from (must be verified in Resend). Defaults to `onboarding@resend.dev` if not set. |
| `RESEND_TO_EMAIL` | Resend | Optional - email to receive submissions (falls back to CONTACT_EMAIL) |
| `SENDGRID_API_KEY` | SendGrid | Your SendGrid API key |
| `SENDGRID_FROM_EMAIL` | SendGrid | Email address to send from (must be verified in SendGrid) |
| `SENDGRID_TO_EMAIL` | SendGrid | Optional - email to receive submissions (falls back to CONTACT_EMAIL) |
| `CONTACT_EMAIL` | **Required** | Email address to receive contact form submissions. **Must be set if using Resend or SendGrid.** |
| `CONTACT_WEBHOOK_URL` | Webhook | Webhook URL to receive form submissions |

## Support

If you encounter any issues:
- Check the [Vercel Documentation](https://vercel.com/docs)
- Check the [Resend Documentation](https://resend.com/docs) (if using Resend)
- Check the [SendGrid Documentation](https://docs.sendgrid.com/) (if using SendGrid)
- Review serverless function logs in Vercel dashboard
