# Deployment Guide - Shobit G Violinist Portfolio

## Quick Start Deployment

Follow these steps to deploy your website to Vercel in under 10 minutes.

## Step 1: Get Web3Forms Access Key (2 minutes)

1. Visit https://web3forms.com/
2. Enter your email: **shobitji2@gmail.com**
3. Click "Create Access Key"
4. Copy the access key (you'll need this for Step 4)

## Step 2: Create GitHub Repository (3 minutes)

### Option A: Using GitHub Website (Recommended)
1. Go to https://github.com/new
2. Repository name: `shobitg-violinist`
3. Make it **Private** (recommended) or Public
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"
6. Copy the repository URL (should be like: `https://github.com/YOUR_USERNAME/shobitg-violinist.git`)

### Option B: Using GitHub CLI
```bash
gh repo create shobitg-violinist --private --source=. --remote=origin --push
```

## Step 3: Push Code to GitHub (1 minute)

```bash
# In your project directory
cd /Users/shobitg/Documents/shobitg/shobitg_violinist

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/shobitg-violinist.git

# Push code
git push -u origin main
```

## Step 4: Deploy to Vercel (4 minutes)

### 4.1 Connect GitHub to Vercel

1. Go to https://vercel.com/
2. Click "Sign Up" or "Log In"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub account

### 4.2 Import Project

1. On Vercel dashboard, click "Add New..." → "Project"
2. Find and select your `shobitg-violinist` repository
3. Click "Import"

### 4.3 Configure Project

1. **Framework Preset**: Next.js (should auto-detect)
2. **Root Directory**: `./` (leave as default)
3. **Build Command**: `npm run build` (leave as default)
4. **Output Directory**: `.next` (leave as default)

### 4.4 Add Environment Variable

1. Click "Environment Variables"
2. Add the following:
   - **Name**: `WEB3FORMS_ACCESS_KEY`
   - **Value**: (paste your Web3Forms access key from Step 1)
   - **Environments**: Select all (Production, Preview, Development)
3. Click "Add"

### 4.5 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes for deployment to complete
3. Once done, you'll see "Congratulations!" with your live URL

## Step 5: Set Up Admin Panel (5-10 minutes)

The admin panel requires authentication. Choose one of these options:

### Option A: Netlify Identity (Recommended for ease)

1. Go to https://app.netlify.com/ and sign up/login
2. Go to "Sites" → "Add new site" → "Import an existing project"
3. Connect to GitHub and select your repository
4. Skip the build settings (we won't actually deploy here)
5. Once created, go to "Site settings" → "Identity"
6. Click "Enable Identity"
7. Under "Registration", select "Invite only"
8. Go to "Services" → "Git Gateway" and enable it
9. Go to "Identity" → "Invite users" and invite yourself
10. Add this to your Vercel environment variables:
    - Name: `NEXT_PUBLIC_NETLIFY_URL`
    - Value: Your Netlify site URL

### Option B: GitHub OAuth (More technical)

1. Go to GitHub Settings → Developer Settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: Shobit G Violinist CMS
   - **Homepage URL**: Your Vercel URL
   - **Authorization callback URL**: `https://api.netlify.com/auth/done`
4. Copy Client ID and Client Secret
5. Add to Netlify Identity settings (see Option A)

### Option C: Edit Directly (No authentication - not recommended for production)

For development/testing only:
1. Edit `public/admin/config.yml`
2. Change backend to:
```yaml
backend:
  name: test-repo
```
3. This allows editing without authentication (use only for testing!)

## Step 6: Test Your Website

### Test Video Gallery
1. Visit your Vercel URL
2. Scroll to "Performances" section
3. Click on a video
4. Verify 30-second preview works
5. Verify "Watch Full Video" button appears after 30 seconds

### Test Booking Form
1. Scroll to "Book a Performance" section
2. Select a date (future dates should work, dates in `data/availability.json` should be disabled)
3. Fill out the form
4. Submit
5. Check your email (shobitji2@gmail.com) for booking notification
6. Check if WhatsApp link was generated (check console logs in Vercel)

### Test Admin Panel
1. Go to `your-vercel-url.com/admin`
2. Log in (if you set up authentication)
3. Try editing the About section
4. Save and publish
5. Verify changes appear on main site

## Step 7: Get Your YouTube Videos (5 minutes)

The site currently has placeholder videos. Add your real videos:

1. Go to your YouTube channel: https://www.youtube.com/channel/UCph7dAy_GKgFHsbGdbs_vuw/videos
2. For each video you want to add:
   - Right-click on video → Copy video URL
   - Extract the video ID (the part after `watch?v=`)
   - Example: `https://youtube.com/watch?v=abc123` → ID is `abc123`
3. Go to Admin Panel → Videos
4. Add each video with:
   - **Video ID**: The ID you extracted
   - **Title**: Your video title
   - **Platform**: youtube
   - **Thumbnail**: `https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg` (replace VIDEO_ID)

## Step 8: Customize Content

### Update About Section
1. Go to Admin Panel → About
2. Replace placeholder text with your real bio
3. Upload your professional photo
4. Save and publish

### Set Availability
1. Go to Admin Panel → Availability
2. Add dates when you're NOT available
3. Format: YYYY-MM-DD (e.g., 2026-03-15)
4. Save and publish

### Update Contact Info
1. Go to Admin Panel → Site Settings
2. Verify all contact information is correct
3. Update social media links if needed
4. Save and publish

## Troubleshooting

### Deployment Failed
- Check Vercel logs for error messages
- Verify environment variable is set correctly
- Try redeploying: Vercel dashboard → Deployments → ... → Redeploy

### Admin Panel Not Loading
- Verify you've set up authentication (Step 5)
- Clear browser cache
- Try incognito/private browsing mode
- Check browser console for errors

### Emails Not Being Sent
- Verify `WEB3FORMS_ACCESS_KEY` is set in Vercel
- Go to Web3Forms dashboard and verify email address
- Check spam folder
- Try submitting another test booking

### Videos Not Playing
- Replace placeholder video IDs with real YouTube video IDs
- Verify videos are public (not private)
- Check browser console for errors

### Build Errors
If you need to make changes and redeploy:
```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin main
# Vercel will auto-deploy
```

## Custom Domain (Optional)

To use your own domain:

1. Go to Vercel dashboard → Your project → Settings → Domains
2. Click "Add Domain"
3. Enter your domain name
4. Follow instructions to update DNS records at your domain registrar
5. Wait for DNS propagation (can take 24-48 hours)

## Maintenance

### Adding New Videos
- Use Admin Panel → Videos → Add Video
- Or edit `data/videos.json` directly and push to GitHub

### Updating Availability
- Use Admin Panel → Availability
- Or edit `data/availability.json` directly and push to GitHub

### Viewing Bookings
- Check your email: shobitji2@gmail.com
- Check WhatsApp: +91 9419237802

## Security Notes

1. **Keep `.env.local` secret** - Never commit it to GitHub
2. **Use Invite-only Identity** - Don't allow public registrations to admin panel
3. **Monitor bookings** - Check for spam submissions
4. **Regular updates** - Keep dependencies updated:
   ```bash
   npm update
   git add package*.json
   git commit -m "Update dependencies"
   git push
   ```

## Next Steps

- [ ] Replace placeholder videos with real performances
- [ ] Update About section with your bio
- [ ] Upload professional photo
- [ ] Set your availability calendar
- [ ] Test booking form end-to-end
- [ ] Share your website link on social media
- [ ] Add custom domain (optional)
- [ ] Set up Google Analytics (optional)

## Support

Need help? Contact:
- **Create a GitHub issue** in your repository
- **Email**: shobitji2@gmail.com
- **WhatsApp**: +91 9419237802

## Your Website URLs

After deployment, save these URLs:

- **Main Website**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin`
- **GitHub Repo**: `https://github.com/YOUR_USERNAME/shobitg-violinist`
- **Vercel Dashboard**: `https://vercel.com/YOUR_USERNAME/shobitg-violinist`

---

**Congratulations!** Your professional violin portfolio is now live! 🎻
