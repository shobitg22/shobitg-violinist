# Setup Guide for Shobit G Violinist Website

This guide will help you set up the admin panel and Google Sheets integration for your violin portfolio website.

## Table of Contents
1. [GitHub OAuth Setup for Admin Panel](#github-oauth-setup-for-admin-panel)
2. [Google Sheets Integration Setup](#google-sheets-integration-setup)
3. [Environment Variables Configuration](#environment-variables-configuration)
4. [Deployment to Vercel](#deployment-to-vercel)

---

## GitHub OAuth Setup for Admin Panel

The admin panel at `/admin` uses Decap CMS with GitHub backend. You need to create a GitHub OAuth App to enable authentication.

### Step 1: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the following details:
   - **Application name**: `Shobit G Violinist CMS`
   - **Homepage URL**: `https://shobitg-violinist-ojdsqtous-shobitg22s-projects.vercel.app`
   - **Authorization callback URL**: `https://shobitg-violinist-ojdsqtous-shobitg22s-projects.vercel.app/api/auth`
4. Click **"Register application"**

### Step 2: Get OAuth Credentials

1. After creating the app, you'll see the **Client ID** - copy it
2. Click **"Generate a new client secret"** and copy the secret
3. Save both values securely - you'll need them in the next step

### Step 3: Add Credentials to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `shobitg-violinist`
3. Go to **Settings** → **Environment Variables**
4. Add the following variables:
   - `GITHUB_OAUTH_CLIENT_ID` = your client ID from step 2
   - `GITHUB_OAUTH_CLIENT_SECRET` = your client secret from step 2
5. Click **Save**
6. Redeploy your site for changes to take effect

### Step 4: Test the Admin Panel

1. Visit: `https://shobitg-violinist-ojdsqtous-shobitg22s-projects.vercel.app/admin`
2. Click **"Login with GitHub"**
3. Authorize the application
4. You should now be able to edit content!

---

## Google Sheets Integration Setup

The booking form saves submissions to Google Sheets automatically. Follow these steps to set it up.

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named **"Violin Bookings"**
3. In the first row, add these column headers:
   ```
   Timestamp | Name | Phone | Email | Event Date | Event Time | Location | Budget | Message | Status
   ```

### Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste the following code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);

    // Append a new row with the booking data
    sheet.appendRow([
      data.timestamp,
      data.name,
      data.phone,
      data.email,
      data.eventDate,
      data.eventTime,
      data.location,
      data.budget,
      data.message,
      data.status
    ]);

    // Return success response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Booking saved successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Click **Save** (💾 icon)
5. Name the project: `Booking Form Handler`

### Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: `Booking form webhook`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone`
5. Click **Deploy**
6. Click **Authorize access** and grant permissions
7. Copy the **Web app URL** - it should look like:
   ```
   https://script.google.com/macros/s/ABC123.../exec
   ```

### Step 4: Add Webhook URL to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: `shobitg-violinist`
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - `GOOGLE_SHEETS_WEBHOOK_URL` = the Web app URL from step 3
5. Click **Save**
6. Redeploy your site

### Step 5: Test the Integration

1. Visit your website's booking form
2. Fill out and submit a test booking
3. Check your Google Sheet - the new booking should appear!

---

## Environment Variables Configuration

### For Local Development

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your credentials:
   ```env
   GITHUB_OAUTH_CLIENT_ID=your_github_oauth_client_id
   GITHUB_OAUTH_CLIENT_SECRET=your_github_oauth_client_secret
   GOOGLE_SHEETS_WEBHOOK_URL=your_google_apps_script_webhook_url
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### For Production (Vercel)

All environment variables should be added in Vercel Dashboard:
- **Settings** → **Environment Variables**
- Add each variable with its value
- Redeploy after adding variables

---

## Deployment to Vercel

### Initial Deployment

If you haven't deployed yet:

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow the prompts to link to your GitHub repository

### Updating Deployment

After making changes:

1. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update configuration"
   git push origin main
   ```

2. Vercel will automatically deploy your changes

### Manual Deployment

You can also deploy manually:

```bash
vercel --prod
```

---

## Troubleshooting

### Admin Panel Issues

**Problem**: "Error: Failed to load config.yml (404)"
- **Solution**: Make sure `public/admin/config.yml` exists and is committed to GitHub

**Problem**: "Authentication failed"
- **Solution**: Check that your GitHub OAuth credentials are correct in Vercel environment variables

**Problem**: "Cannot read properties"
- **Solution**: Make sure the callback URL in GitHub OAuth app matches your domain exactly

### Google Sheets Issues

**Problem**: Bookings not appearing in sheet
- **Solution**: Check the Apps Script execution logs (View → Executions)

**Problem**: "Authorization required"
- **Solution**: Make sure you deployed the Apps Script with "Who has access: Anyone"

**Problem**: Wrong data in columns
- **Solution**: Verify your sheet has exactly 10 columns in the correct order

### General Issues

**Problem**: Changes not reflecting on live site
- **Solution**: Make sure to redeploy after adding environment variables

**Problem**: "Environment variable not defined"
- **Solution**: Double-check variable names match exactly (case-sensitive)

---

## Security Notes

- Never commit `.env.local` to GitHub
- Keep your GitHub OAuth client secret secure
- Regularly review Google Sheets access permissions
- Consider adding authentication to your Google Apps Script if needed

---

## Support

If you encounter any issues:
1. Check the Vercel deployment logs
2. Check browser console for errors
3. Review the Google Apps Script execution logs
4. Ensure all environment variables are set correctly

---

## What's Next?

Once everything is set up:
1. Test the admin panel by editing content
2. Test the booking form with sample data
3. Set up email notifications (optional)
4. Customize the booking form fields as needed
5. Add automated email responses using Google Apps Script

Enjoy managing your violin portfolio website!
