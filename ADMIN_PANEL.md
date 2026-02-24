# Custom Admin Panel Documentation

## Overview

This is a custom-built admin panel that replaces Decap CMS for managing your violin portfolio website. It provides a simple, secure interface to update content directly in your browser.

## Features

- **Password-Protected Authentication** - Simple login with environment variable
- **About/Bio Management** - Edit your profile and bio content
- **Videos Management** - Add, edit, delete, and reorder performance videos
- **Calendar Availability** - Manage unavailable dates for bookings
- **Site Settings** - Update contact information and social links
- **Bookings View** - View booking requests from Google Sheets
- **Session Management** - Auto-logout after 1 hour for security

---

## Setup Instructions

### 1. Environment Variables

Add the following environment variables to your deployment:

#### Required Variables

```bash
# Admin Panel Password
ADMIN_PASSWORD=your_secure_password_here

# Session Secret (minimum 32 characters)
# Generate with: openssl rand -base64 32
SESSION_SECRET=your_random_32_character_secret_here
```

#### Optional Variables

```bash
# Google Sheets Integration (if using)
GOOGLE_SHEETS_WEBHOOK_URL=your_google_apps_script_webhook_url
```

### 2. Vercel Deployment Setup

1. Go to your Vercel project dashboard
2. Navigate to **Settings** > **Environment Variables**
3. Add the following variables:
   - `ADMIN_PASSWORD` - Choose a strong password
   - `SESSION_SECRET` - Generate a random string:
     ```bash
     openssl rand -base64 32
     ```
   - `GOOGLE_SHEETS_WEBHOOK_URL` - (if you have Google Sheets integration)

4. Redeploy your site for changes to take effect

### 3. Local Development Setup

Create a `.env.local` file in your project root:

```bash
# Admin Panel Authentication
ADMIN_PASSWORD=admin123
SESSION_SECRET=this_is_a_test_secret_key_at_least_32_characters_long_for_development

# Google Sheets Integration (optional)
GOOGLE_SHEETS_WEBHOOK_URL=your_google_apps_script_webhook_url
```

---

## Using the Admin Panel

### Accessing the Admin Panel

1. Navigate to `https://your-domain.com/admin`
2. Enter your admin password
3. Click **Login**

### Dashboard Sections

#### 1. About / Bio

Update your profile information:

- **Page Title** - The title for your about page
- **Profile Image Path** - Path to your profile image (e.g., `/images/profile.jpg`)
- **Bio Content** - Your biography in Markdown format

**Markdown Tips:**
- `# Heading` for main headings
- `## Subheading` for subheadings
- `**bold text**` for bold
- `*italic text*` for italic
- Line breaks create paragraphs

Click **Save Changes** to update.

#### 2. Videos

Manage your performance videos:

**Add New Video:**
1. Click **Add New Video**
2. Enter Video ID (from YouTube URL: `youtube.com/watch?v=VIDEO_ID`)
3. Enter video title
4. Select platform (YouTube/Vimeo)
5. (Optional) Add custom thumbnail URL
6. Click **Add Video**

**Edit Video:**
1. Click **Edit** on any video
2. Modify fields
3. Click **Update Video**

**Delete Video:**
1. Click **Delete** on any video
2. Confirm deletion

**Reorder Videos:**
- Use **↑** and **↓** arrows to move videos up or down
- Videos appear on your site in the order shown here

**Important:** After making changes, click **Save All Changes** to persist your updates.

#### 3. Calendar Availability

Mark dates when you're unavailable for bookings:

**Add Unavailable Date:**
1. Select a date from the date picker
2. Click **Add Date**

**Remove Date:**
1. Find the date in the list
2. Click **Remove**

**Add Note:**
- Optional note about unavailable dates
- Visible in the data file

Click **Save Changes** to update availability.

#### 4. Site Settings

Update contact information and social links:

**Site Information:**
- Site Title
- Site Description

**Contact Information:**
- Email Address (required)
- WhatsApp Number (international format without +)

**Social Media Links:**
- Instagram URL
- YouTube Channel URL

Click **Save Settings** to update.

#### 5. Bookings

View booking requests from your website:

- Shows bookings stored in Google Sheets
- Read-only view
- Click **Refresh** to reload bookings
- For detailed management, use your Google Sheet directly

---

## Security Features

### Password Protection

- Admin panel requires password from `ADMIN_PASSWORD` environment variable
- Password is never stored in the codebase
- Simple and secure authentication

### Session Management

- Sessions expire after **1 hour** of inactivity
- Automatic logout on session expiry
- Secure session cookies (HttpOnly, Secure in production)

### Best Practices

1. **Use a Strong Password:**
   - At least 12 characters
   - Mix of letters, numbers, and symbols
   - Don't share with others

2. **Keep Session Secret Safe:**
   - Generate a random 32+ character string
   - Never commit to version control
   - Rotate periodically

3. **Logout When Done:**
   - Click **Logout** button when finished
   - Don't leave admin panel open on shared computers

---

## Data Files

The admin panel modifies these files in your project:

- `/data/about.md` - About page content
- `/data/videos.json` - Video list
- `/data/availability.json` - Calendar availability
- `/data/settings.json` - Site settings

**Note:** Changes are saved immediately to these files. If using Git, you may want to commit changes periodically.

---

## Troubleshooting

### Cannot Login

**Problem:** "Invalid password" error

**Solution:**
1. Verify `ADMIN_PASSWORD` is set in environment variables
2. Check for typos in password
3. Redeploy after adding environment variable
4. Clear browser cache and try again

### Session Expired

**Problem:** Redirected to login page unexpectedly

**Solution:**
- Sessions expire after 1 hour for security
- Simply login again to continue

### Changes Not Saving

**Problem:** Updates not reflecting on site

**Solution:**
1. Check for error messages in the admin panel
2. Verify file permissions (local development)
3. Check browser console for errors
4. Try refreshing the page and saving again

### Bookings Not Loading

**Problem:** No bookings appear in Bookings section

**Solution:**
1. Verify `GOOGLE_SHEETS_WEBHOOK_URL` is set correctly
2. Check that Google Sheets integration is working
3. View bookings directly in your Google Sheet
4. Click **Refresh** button to reload

---

## Technical Details

### Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Authentication:** iron-session for secure cookies
- **Styling:** Tailwind CSS
- **Storage:** File-based (JSON/Markdown)

### API Routes

- `/api/admin/auth/login` - Login endpoint
- `/api/admin/auth/logout` - Logout endpoint
- `/api/admin/auth/verify` - Session verification
- `/api/admin/about` - About page management
- `/api/admin/videos` - Videos management
- `/api/admin/availability` - Calendar management
- `/api/admin/settings` - Settings management
- `/api/admin/bookings` - View bookings

### File Structure

```
app/
├── admin/
│   ├── page.tsx              # Login page
│   └── dashboard/
│       └── page.tsx          # Dashboard
├── api/
│   └── admin/
│       ├── auth/             # Authentication APIs
│       ├── about/            # About API
│       ├── videos/           # Videos API
│       ├── availability/     # Availability API
│       ├── settings/         # Settings API
│       └── bookings/         # Bookings API
components/
└── admin/
    ├── AboutSection.tsx      # About management UI
    ├── VideosSection.tsx     # Videos management UI
    ├── AvailabilitySection.tsx  # Calendar UI
    ├── SettingsSection.tsx   # Settings UI
    └── BookingsSection.tsx   # Bookings viewer
lib/
└── session.ts                # Session management
data/
├── about.md                  # About content
├── videos.json               # Videos data
├── availability.json         # Availability data
└── settings.json             # Settings data
```

---

## Support

For issues or questions:

1. Check this documentation first
2. Review error messages in browser console
3. Verify environment variables are set correctly
4. Check that all dependencies are installed

---

## Changelog

### Version 1.0.0 (2026-02-24)

- Initial release
- Password-based authentication
- About/Bio management
- Videos CRUD operations
- Calendar availability management
- Site settings management
- Bookings viewer (read-only)
- Session management with auto-logout

---

## License

This admin panel is part of the Shobit G Violinist Portfolio project.
