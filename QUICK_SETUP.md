# Quick Setup Guide - TL;DR

This is a condensed version of the setup guide. For detailed instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md).

## 1. GitHub OAuth for Admin Panel (5 minutes)

1. **Create OAuth App**: https://github.com/settings/developers → New OAuth App
   - Homepage URL: `https://shobitg-violinist-ojdsqtous-shobitg22s-projects.vercel.app`
   - Callback URL: `https://shobitg-violinist-ojdsqtous-shobitg22s-projects.vercel.app/api/auth`

2. **Add to Vercel**: Go to Vercel → Settings → Environment Variables
   ```
   GITHUB_OAUTH_CLIENT_ID=your_client_id
   GITHUB_OAUTH_CLIENT_SECRET=your_client_secret
   ```

3. **Test**: Visit `/admin` and login with GitHub

## 2. Google Sheets for Bookings (10 minutes)

1. **Create Sheet**: https://sheets.google.com
   - Columns: `Timestamp | Name | Phone | Email | Event Date | Event Time | Location | Budget | Message | Status`

2. **Add Script**: Extensions → Apps Script → Copy code from `google-apps-script.js`

3. **Deploy**: Deploy → New deployment → Web app → Anyone access → Deploy

4. **Add to Vercel**: Settings → Environment Variables
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=your_web_app_url
   ```

5. **Test**: Submit a booking form and check the sheet

## 3. Local Development (Optional)

```bash
cp .env.local.example .env.local
# Edit .env.local with your credentials
npm run dev
```

## Done!

- Admin Panel: `https://your-site.vercel.app/admin`
- Bookings: Check your Google Sheet
- Issues? See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for troubleshooting

## Environment Variables Summary

```env
# Required for Admin Panel
GITHUB_OAUTH_CLIENT_ID=...
GITHUB_OAUTH_CLIENT_SECRET=...

# Required for Google Sheets
GOOGLE_SHEETS_WEBHOOK_URL=...

# Optional (email notifications)
WEB3FORMS_ACCESS_KEY=...
```
