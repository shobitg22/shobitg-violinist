# Shobit G - Professional Violinist Portfolio

A modern, responsive portfolio website for professional violinist Shobit G, built with Next.js and deployed on Vercel.

## Features

- **Hero Section**: Eye-catching landing page with professional branding
- **Video Gallery**: YouTube video integration with 30-second preview functionality
- **About Section**: Editable bio and professional information
- **Booking System**: Calendar-based booking form with Google Sheets integration and WhatsApp notifications
- **Admin Panel**: Decap CMS with GitHub OAuth authentication (works on Vercel!)
- **Google Sheets Integration**: Automatic booking data storage in Google Sheets
- **Responsive Design**: Mobile-first approach, works on all devices
- **Fast Performance**: Optimized with Next.js 15 and static generation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Decap CMS with GitHub OAuth backend
- **Video**: YouTube IFrame API via react-youtube
- **Forms**: React Datepicker for calendar
- **Data Storage**: Google Sheets via Apps Script
- **Hosting**: Vercel
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shobitg_violinist
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```
   Edit `.env.local` with your credentials (see [QUICK_SETUP.md](./QUICK_SETUP.md) for details)

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Quick Setup (New Installations)

For a complete setup of admin panel and Google Sheets integration:

1. **Quick Guide**: See [QUICK_SETUP.md](./QUICK_SETUP.md) (15 minutes)
2. **Detailed Guide**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md) (full instructions)

### What You Need to Set Up:

1. **GitHub OAuth** (for admin panel) - 5 minutes
2. **Google Sheets** (for booking storage) - 10 minutes
3. **Environment Variables** (in Vercel) - 2 minutes

## Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin` on your deployed site
2. Click "Login with GitHub"
3. Authorize the application
4. Manage content directly from the CMS

### Setting Up Admin Access

The admin panel uses GitHub OAuth for authentication (works perfectly on Vercel!):

1. **Create GitHub OAuth App**: https://github.com/settings/developers
   - Set callback URL to: `https://your-site.vercel.app/api/auth`

2. **Add credentials to Vercel**:
   - `GITHUB_OAUTH_CLIENT_ID`
   - `GITHUB_OAUTH_CLIENT_SECRET`

3. **See full instructions**: [SETUP_GUIDE.md](./SETUP_GUIDE.md#github-oauth-setup-for-admin-panel)

### Managing Content

#### Update About Section
1. Go to Admin Panel > About
2. Edit the markdown content
3. Upload a new profile image if needed
4. Save and publish

#### Add/Remove Videos
1. Go to Admin Panel > Videos
2. Click "Add Video"
3. Enter:
   - Video ID (from YouTube URL: `watch?v=VIDEO_ID`)
   - Title
   - Platform (YouTube/Instagram)
   - Thumbnail URL (usually: `https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg`)
4. Save and publish

#### Manage Availability
1. Go to Admin Panel > Availability
2. Add unavailable dates to the list
3. These dates will be disabled in the booking calendar
4. Save and publish

#### Update Site Settings
1. Go to Admin Panel > Site Settings
2. Update contact information, social links
3. Save and publish

## Booking System

### How It Works

1. Users select an available date from the calendar
2. Fill out the booking form with event details
3. On submission:
   - **Data automatically saved to Google Sheets** (your booking database!)
   - WhatsApp notification URL generated with booking details
   - Confirmation message shown to user

### Google Sheets Integration

All bookings are automatically saved to a Google Sheet:
- **100% Free** - no paid services required
- Real-time data storage
- Easy to review and manage bookings
- Export to Excel/CSV anytime
- Add custom columns and formulas

**Setup**: See [SETUP_GUIDE.md](./SETUP_GUIDE.md#google-sheets-integration-setup) (10 minutes)

### WhatsApp Integration

- Generates WhatsApp URL with booking details
- Link format: `https://wa.me/919419237802?text=...`
- User's booking details pre-filled in message
- Instant notifications on your phone

## Video Gallery

### 30-Second Preview Feature

The video gallery includes a unique 30-second preview feature:
- Videos play in-site for 30 seconds
- After 30 seconds, player pauses automatically
- Overlay appears with "Watch Full Video on YouTube" button
- Users can restart preview or go to full video
- Implemented using YouTube IFrame API

### Adding New Videos

1. Get the YouTube video ID from the URL
2. Add via Admin Panel or edit `data/videos.json`:
```json
{
  "id": "VIDEO_ID",
  "title": "Performance Title",
  "platform": "youtube",
  "thumbnail": "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg"
}
```

## Deployment

### Deploy to Vercel

1. **Create GitHub Repository**:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variables (see [QUICK_SETUP.md](./QUICK_SETUP.md)):
     - `GITHUB_OAUTH_CLIENT_ID`
     - `GITHUB_OAUTH_CLIENT_SECRET`
     - `GOOGLE_SHEETS_WEBHOOK_URL`
   - Click "Deploy"

3. **Configure Custom Domain** (optional):
   - Go to Vercel project settings
   - Add your custom domain
   - Update DNS records as instructed

### Post-Deployment Setup

1. **Set up GitHub OAuth** (for admin panel):
   - Follow [QUICK_SETUP.md](./QUICK_SETUP.md) section 1
   - Takes 5 minutes

2. **Set up Google Sheets** (for bookings):
   - Follow [QUICK_SETUP.md](./QUICK_SETUP.md) section 2
   - Takes 10 minutes

3. **Test Everything**:
   - Visit your site
   - Test video playback and 30-second preview
   - Submit a test booking (check Google Sheet!)
   - Access admin panel at `/admin` and make a change

## Project Structure

```
shobitg_violinist/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── route.ts          # GitHub OAuth handler
│   │   └── booking/
│   │       └── route.ts          # Booking API endpoint (Google Sheets integration)
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── About.tsx                 # About section
│   ├── BookingForm.tsx           # Booking form with calendar
│   ├── Hero.tsx                  # Hero/landing section
│   ├── VideoGallery.tsx          # Video grid
│   └── VideoPlayer.tsx           # 30-second preview player
├── data/
│   ├── about.md                  # About content (CMS-managed)
│   ├── availability.json         # Calendar availability (CMS-managed)
│   ├── settings.json             # Site settings (CMS-managed)
│   └── videos.json               # Video list (CMS-managed)
├── public/
│   ├── admin/
│   │   ├── config.yml            # Decap CMS configuration (GitHub backend)
│   │   └── index.html            # Admin panel entry point
│   └── images/                   # Uploaded images
├── google-apps-script.js         # Google Apps Script code (copy to Google Sheets)
├── SETUP_GUIDE.md                # Detailed setup instructions
├── QUICK_SETUP.md                # Quick setup guide (TL;DR)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## Customization

### Changing Colors

Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: { /* your color palette */ },
  accent: { /* your color palette */ },
}
```

### Updating Contact Info

1. Via Admin Panel: Site Settings
2. Or directly edit `data/settings.json`

### Modifying Layout

- Hero: Edit `components/Hero.tsx`
- About: Edit `components/About.tsx`
- Videos: Edit `components/VideoGallery.tsx`
- Booking: Edit `components/BookingForm.tsx`

## Troubleshooting

### Build Errors

If you encounter build errors:
```bash
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
```

### Admin Panel Not Loading

1. Check that `/admin` route is accessible
2. Verify GitHub OAuth credentials are set in Vercel
3. Check browser console for errors
4. Ensure callback URL matches exactly in GitHub OAuth app settings

### Booking Form Not Saving to Google Sheets

1. Verify `GOOGLE_SHEETS_WEBHOOK_URL` is set in Vercel environment variables
2. Check Google Apps Script execution logs (View → Executions)
3. Ensure Apps Script is deployed with "Anyone" access
4. Test the webhook URL directly using curl or Postman

### Videos Not Playing

1. Verify YouTube video IDs are correct
2. Check that videos are public (not private/unlisted)
3. Try different video IDs

## Support

For issues or questions:
- Email: shobitji2@gmail.com
- WhatsApp: +91 9419237802

## License

Copyright © 2026 Shobit G. All rights reserved.

---

Built with ♥ using Next.js and Vercel
