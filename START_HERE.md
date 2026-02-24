# Custom Admin Panel - Start Here

## Your admin panel is ready!

A complete custom admin panel has been built to replace Decap CMS. Everything is committed and ready to deploy.

---

## Quick Start (5 Steps)

### 1. Push to GitHub
```bash
git push origin main
```

### 2. Generate Session Secret
```bash
openssl rand -base64 32
```
Copy the output for Step 3.

### 3. Add Environment Variables to Vercel
Go to: https://vercel.com/dashboard

Add these variables:
- `ADMIN_PASSWORD` = your_chosen_password
- `SESSION_SECRET` = output_from_step_2

### 4. Redeploy on Vercel
Vercel will auto-deploy, or manually redeploy from dashboard.

### 5. Test Your Admin Panel
Visit: `https://your-site.vercel.app/admin`

---

## Documentation

- **Quick Setup Guide**: [ADMIN_SETUP_QUICK.md](./ADMIN_SETUP_QUICK.md) - 5 minutes
- **Full Documentation**: [ADMIN_PANEL.md](./ADMIN_PANEL.md) - Complete guide
- **Deployment Steps**: [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) - Detailed
- **Implementation Summary**: [ADMIN_PANEL_SUMMARY.md](./ADMIN_PANEL_SUMMARY.md) - Technical details

---

## What You Can Do in Admin Panel

✓ Edit About/Bio content
✓ Manage videos (add, edit, delete, reorder)
✓ Set unavailable dates for bookings
✓ Update site settings and contact info
✓ View booking requests

---

## Admin Panel URL
After deployment: `https://your-site.vercel.app/admin`

---

## Need Help?
See [DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md) for troubleshooting.

---

**Ready to deploy? Start with Step 1 above!**
