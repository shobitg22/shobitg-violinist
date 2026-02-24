# Shobit G - Professional Violinist Portfolio

A modern, responsive portfolio website for professional violinist Shobit G, built with Next.js and deployed on Vercel.

## Features

- **Hero Section**: Eye-catching landing page with professional branding
- **Video Gallery**: YouTube video integration with 30-second preview functionality
- **About Section**: Editable bio and professional information
- **Booking System**: Calendar-based booking form with email and WhatsApp notifications
- **Admin Panel**: Decap CMS for easy content management
- **Responsive Design**: Mobile-first approach, works on all devices
- **Fast Performance**: Optimized with Next.js 15 and static generation

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Decap CMS (Git-based)
- **Video**: YouTube IFrame API via react-youtube
- **Forms**: React Datepicker for calendar
- **Email**: Web3Forms (free tier)
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

4. Get your Web3Forms access key:
   - Visit https://web3forms.com/
   - Enter your email: shobitji2@gmail.com
   - Copy the access key
   - Add it to `.env.local`:
     ```
     WEB3FORMS_ACCESS_KEY=your_access_key_here
     ```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Admin Panel

### Accessing the Admin Panel

1. Navigate to `/admin` on your deployed site
2. Authenticate with GitHub (requires setup - see below)
3. Manage content directly from the CMS

### Setting Up Admin Access

1. **Enable Netlify Identity** (or use GitHub OAuth):
   - Deploy to Vercel first
   - Add Netlify Identity widget (already included in admin panel)
   - Or set up GitHub OAuth for authentication

2. **Configure Git Gateway**:
   - The site uses Git Gateway backend
   - Content changes are committed directly to your repository
   - Changes trigger automatic redeployment on Vercel

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
   - Email sent to `shobitji2@gmail.com` via Web3Forms
   - WhatsApp notification URL generated (you'll receive notification)
   - Confirmation message shown to user

### Email Integration

The site uses **Web3Forms** (free tier - 250 emails/month):
- No server required
- Spam protection included
- Instant delivery
- No credit card needed

### WhatsApp Integration

- Generates WhatsApp URL with booking details
- Link format: `https://wa.me/919419237802?text=...`
- User's booking details pre-filled in message

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
   - Add environment variable:
     - `WEB3FORMS_ACCESS_KEY`: Your Web3Forms key
   - Click "Deploy"

3. **Configure Custom Domain** (optional):
   - Go to Vercel project settings
   - Add your custom domain
   - Update DNS records as instructed

### Post-Deployment Setup

1. **Enable Netlify Identity** (for CMS):
   - Add site URL to Netlify Identity settings
   - Configure Git Gateway
   - Invite yourself as admin user

2. **Test Everything**:
   - Visit your site
   - Test video playback and 30-second preview
   - Submit a test booking
   - Access admin panel and make a change

## Project Structure

```
shobitg_violinist/
├── app/
│   ├── api/
│   │   └── booking/
│   │       └── route.ts          # Booking API endpoint
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
│   │   ├── config.yml            # Decap CMS configuration
│   │   └── index.html            # Admin panel entry point
│   └── images/                   # Uploaded images
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
2. Verify Netlify Identity is configured
3. Check browser console for errors

### Booking Form Not Sending Emails

1. Verify `WEB3FORMS_ACCESS_KEY` is set in Vercel environment variables
2. Check spam folder
3. Verify email address in Web3Forms dashboard

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
