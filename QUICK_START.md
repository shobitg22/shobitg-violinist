# Quick Start Guide

Get your website live in 3 simple steps!

## Step 1: Get Email Access Key
Visit https://web3forms.com/ and enter: **shobitji2@gmail.com**
Copy the access key you receive.

## Step 2: Create GitHub Repository

```bash
# If you have GitHub CLI installed:
gh repo create shobitg-violinist --private --source=. --remote=origin --push

# Or manually:
# 1. Go to https://github.com/new
# 2. Create a new private repository named "shobitg-violinist"
# 3. Run these commands:
git remote add origin https://github.com/YOUR_USERNAME/shobitg-violinist.git
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to https://vercel.com/
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Import your `shobitg-violinist` repository
5. Add environment variable:
   - Name: `WEB3FORMS_ACCESS_KEY`
   - Value: (your key from Step 1)
6. Click "Deploy"
7. Wait 2-3 minutes

**Done!** Your website is live!

## Next Steps

1. Visit `/admin` on your deployed site
2. Add your real YouTube videos
3. Update your bio and photo
4. Set your availability dates
5. Test the booking form

## Need Help?

See the full `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

## Local Development

To run locally:

```bash
npm install --legacy-peer-deps
npm run dev
```

Visit http://localhost:3000

## Important Files

- `data/videos.json` - Your video gallery
- `data/about.md` - Your bio
- `data/availability.json` - Unavailable dates
- `public/admin/config.yml` - CMS configuration

## Contact

- Email: shobitji2@gmail.com
- WhatsApp: +91 9419237802
- Instagram: https://www.instagram.com/shobitg_violinist/
- YouTube: https://www.youtube.com/channel/UCph7dAy_GKgFHsbGdbs_vuw/videos
