# Admin Panel Quick Setup Guide

## Setup Time: 5 minutes

This guide helps you set up the custom admin panel on Vercel in 5 simple steps.

---

## Step 1: Generate Session Secret (1 minute)

Open your terminal and run:

```bash
openssl rand -base64 32
```

Copy the output - you'll need it in Step 3.

Example output:
```
xK8pL2mN5qR9sT3vW6yZ1aB4cD7eF0gH2jK5lM8nP1qR4sT7u
```

---

## Step 2: Choose Admin Password (30 seconds)

Choose a strong password for your admin panel. Requirements:
- At least 12 characters
- Mix of letters, numbers, and symbols
- Example: `MyV10l!n2026#Admin`

---

## Step 3: Add Environment Variables to Vercel (2 minutes)

1. Go to your Vercel project: https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** > **Environment Variables**
4. Add these two variables:

   **Variable 1:**
   - Name: `ADMIN_PASSWORD`
   - Value: Your chosen password from Step 2
   - Environment: Production, Preview, Development (all selected)
   - Click **Save**

   **Variable 2:**
   - Name: `SESSION_SECRET`
   - Value: The string from Step 1
   - Environment: Production, Preview, Development (all selected)
   - Click **Save**

---

## Step 4: Redeploy Your Site (1 minute)

1. Go to **Deployments** tab in Vercel
2. Click the three dots (...) on your latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete (usually 30-60 seconds)

---

## Step 5: Test Admin Login (30 seconds)

1. Visit your site: `https://your-site.vercel.app/admin`
2. Enter your admin password from Step 2
3. Click **Login**
4. You should see the admin dashboard

---

## You're Done!

Your admin panel is now set up and ready to use.

### What You Can Do:

- **Edit About/Bio** - Update your profile and biography
- **Manage Videos** - Add, edit, delete, and reorder videos
- **Calendar Availability** - Mark unavailable dates
- **Site Settings** - Update contact info and social links
- **View Bookings** - See booking requests

### Next Steps:

- Read full documentation: [ADMIN_PANEL.md](./ADMIN_PANEL.md)
- Bookmark your admin URL: `https://your-site.vercel.app/admin`
- Store your password securely (password manager recommended)

---

## Troubleshooting

### Can't Login?

1. Double-check password (no extra spaces)
2. Verify environment variables are set in Vercel
3. Make sure you redeployed after adding variables
4. Clear browser cache and try again

### Session Expired?

Sessions expire after 1 hour for security. Just login again.

### Need Help?

See full documentation: [ADMIN_PANEL.md](./ADMIN_PANEL.md)

---

## Security Tips

1. Use a strong, unique password
2. Don't share your admin password
3. Logout when done using admin panel
4. Change password periodically
5. Keep session secret safe and never commit to Git

---

**Ready to manage your content!** Visit `/admin` and start editing.
