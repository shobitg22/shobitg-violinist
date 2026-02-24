# Deployment Steps for Custom Admin Panel

## Overview

Your custom admin panel has been successfully built and committed. Follow these steps to deploy it to Vercel.

---

## Pre-Deployment Checklist

- [x] Admin panel code implemented
- [x] All files committed to Git
- [x] Documentation created
- [ ] Environment variables set in Vercel
- [ ] Code pushed to GitHub
- [ ] Site deployed/redeployed on Vercel
- [ ] Admin panel tested on production

---

## Step 1: Push to GitHub (2 minutes)

```bash
git push origin main
```

This will push all your changes including the new admin panel to GitHub.

---

## Step 2: Set Environment Variables in Vercel (3 minutes)

1. Go to https://vercel.com/dashboard
2. Select your project: `shobitg-violinist`
3. Go to **Settings** > **Environment Variables**
4. Add the following variables:

### Required Variables

**ADMIN_PASSWORD**
```
Variable Name: ADMIN_PASSWORD
Value: your_secure_password_here
Environments: ✓ Production ✓ Preview ✓ Development
```

**SESSION_SECRET**
```
Variable Name: SESSION_SECRET
Value: (generate with: openssl rand -base64 32)
Environments: ✓ Production ✓ Preview ✓ Development
```

### Generate Session Secret

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and use it as your SESSION_SECRET value.

### Existing Variables (Keep These)

Make sure these are still set:
- `GOOGLE_SHEETS_WEBHOOK_URL` (if using Google Sheets)

---

## Step 3: Deploy to Vercel (2 minutes)

### Option A: Automatic Deployment (Recommended)

Vercel will automatically deploy when you push to GitHub. Just wait for:
1. GitHub push to complete
2. Vercel to detect changes
3. Build and deployment to finish (1-2 minutes)

### Option B: Manual Redeploy

If automatic deployment doesn't trigger:
1. Go to **Deployments** tab in Vercel
2. Click **...** (three dots) on latest deployment
3. Click **Redeploy**
4. Wait for completion

---

## Step 4: Test Admin Panel (2 minutes)

1. Visit: `https://your-site.vercel.app/admin`
2. Enter your admin password
3. Click **Login**
4. Verify you can see the dashboard
5. Test each section:
   - About / Bio
   - Videos
   - Calendar Availability
   - Site Settings
   - Bookings

---

## Step 5: Update About Content (Optional)

First thing to do in your admin panel:
1. Go to **About / Bio** section
2. Update with your actual bio
3. Set correct profile image path
4. Click **Save Changes**

---

## Troubleshooting

### Issue: Can't access admin panel

**Solution:**
1. Check that environment variables are set correctly in Vercel
2. Verify you redeployed after adding variables
3. Clear browser cache
4. Check Vercel deployment logs for errors

### Issue: "Invalid password" error

**Solution:**
1. Verify `ADMIN_PASSWORD` is set in Vercel
2. Check for typos in password
3. Make sure no extra spaces in password
4. Try setting password again in Vercel

### Issue: Session expires immediately

**Solution:**
1. Verify `SESSION_SECRET` is at least 32 characters
2. Check that it's set in all environments
3. Redeploy after setting

---

## Security Checklist

- [ ] Strong admin password set (12+ characters, mixed case, numbers, symbols)
- [ ] SESSION_SECRET is random and at least 32 characters
- [ ] .env.local is in .gitignore (already done)
- [ ] Environment variables are NOT committed to Git
- [ ] Admin password is stored securely (password manager)

---

## What's Next?

After successful deployment:

1. **Bookmark your admin URL**: `https://your-site.vercel.app/admin`
2. **Update content** using the admin panel
3. **Test bookings** to ensure Google Sheets integration works
4. **Share your portfolio** with the world!

---

## Quick Links

- **Admin Panel URL**: https://your-site.vercel.app/admin
- **Live Site**: https://your-site.vercel.app
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentation**: [ADMIN_PANEL.md](./ADMIN_PANEL.md)
- **Quick Setup**: [ADMIN_SETUP_QUICK.md](./ADMIN_SETUP_QUICK.md)

---

## Support

If you encounter any issues:
1. Check [ADMIN_PANEL.md](./ADMIN_PANEL.md) for troubleshooting
2. Review Vercel deployment logs
3. Verify all environment variables are set correctly

---

## Summary of Changes

This deployment includes:
- ✓ Custom admin panel (replaces Decap CMS)
- ✓ Password-based authentication
- ✓ Content management for About, Videos, Availability, Settings
- ✓ Bookings viewer
- ✓ Mobile-responsive design
- ✓ Session management with auto-logout
- ✓ Comprehensive documentation

**Total Development Time**: Professional admin panel built in one session
**Setup Time**: 5-10 minutes to configure on Vercel
**Maintenance**: No external dependencies to manage

---

**You're ready to deploy!**

Start with Step 1 and follow through Step 4. Your custom admin panel will be live in about 10 minutes.
