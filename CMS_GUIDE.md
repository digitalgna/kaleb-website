# Complete CMS Guide - Full Site Control

## 🎉 Overview

Your admin panel now has **complete control** over every aspect of your website:
- ✅ All text content (headings, descriptions, buttons)
- ✅ All images and media
- ✅ All colors and theme customization
- ✅ Site settings and features
- ✅ Section visibility control

## 📋 Admin CMS Pages

Access these pages from the admin sidebar:

### 1. **Content Manager** (`/admin/cms`)
- Edit all text content on your website
- Sections: Hero, About, Tours, Testimonials, Gallery, Contact, Footer
- Real-time preview of changes

### 2. **Theme Colors** (`/admin/cms/colors`)
- Customize your entire color scheme
- Categories: Primary, Accent, Secondary, Background, Text
- Color picker with live preview
- Changes apply instantly across the site

### 3. **Media Library** (`/admin/cms/media`)
- Upload images and videos
- Organize by category (hero, gallery, tours, etc.)
- Add alt text and descriptions
- Delete unused media

### 4. **Site Settings** (`/admin/cms/settings`)
- General settings (site name, tagline)
- Contact information
- Social media links
- Feature toggles (booking, testimonials, gallery)

### 5. **Features** (`/admin/cms/features`)
- Enable/disable website features
- Control animations, dark mode, parallax, etc.
- Toggle features on/off with one click

## 🚀 How to Use

### Editing Text Content

1. Go to **Admin → Content Manager**
2. Find the section you want to edit (e.g., "Hero Section")
3. Edit the text in the textarea fields
4. Click **"Save All Changes"**
5. Refresh your website to see changes

### Changing Colors

1. Go to **Admin → Theme Colors**
2. Select a color category (e.g., "Primary Colors")
3. Use the color picker or enter a hex code
4. See live preview below
5. Click **"Save Colors"**
6. Colors update across the entire site

### Uploading Images

1. Go to **Admin → Media Library**
2. Click **"Upload Media"**
3. Select a file (images or videos)
4. Add alt text and description
5. Choose a category
6. Click **"Upload"**
7. Use the file path in content fields

### Managing Settings

1. Go to **Admin → Site Settings**
2. Edit any setting value
3. Toggle boolean settings (on/off)
4. Click **"Save Settings"**

### Controlling Features

1. Go to **Admin → Features**
2. Toggle any feature on/off
3. Changes apply immediately

## 🎨 Dynamic Content Integration

The frontend automatically loads CMS content:

- **Hero Section**: Uses CMS for title, subtitle, buttons, and background
- **About Section**: Uses CMS for title, subtitle, and story
- **Tours Section**: Uses CMS for title and subtitle
- **Testimonials**: Uses CMS for title and subtitle
- **All Colors**: Applied via CSS variables from CMS

## 📝 Content Keys Reference

### Hero Section
- `hero_title` - Main hero heading
- `hero_subtitle` - Hero subheading
- `hero_primary_button` - Primary button text
- `hero_secondary_button` - Secondary button text

### About Section
- `about_title` - About section heading
- `about_subtitle` - About section subheading
- `about_story` - About story text

### Tours Section
- `tours_title` - Tours section heading
- `tours_subtitle` - Tours section subheading

### Testimonials Section
- `testimonials_title` - Testimonials heading
- `testimonials_subtitle` - Testimonials subheading

### Gallery Section
- `gallery_title` - Gallery heading
- `gallery_subtitle` - Gallery subheading

### Contact Section
- `contact_title` - Contact heading
- `contact_subtitle` - Contact subheading

### Footer
- `footer_description` - Footer description text

## 🎨 Color Variables

All colors are available as CSS variables:
- `--color-primary`
- `--color-accent`
- `--color-purple`
- `--color-ocean`
- `--color-emerald`
- `--color-gold`
- And more...

## 🔧 Technical Details

### Database Tables
- `site_settings` - General site settings
- `site_content` - All text content
- `theme_colors` - Color scheme
- `media_library` - Uploaded media files
- `site_features` - Feature toggles
- `hero_settings` - Hero section configuration
- `section_visibility` - Section show/hide control

### API Endpoints

**Public (Frontend):**
- `GET /api/cms/settings` - Get all settings
- `GET /api/cms/content` - Get all content
- `GET /api/cms/colors` - Get all colors
- `GET /api/cms/features` - Get all features
- `GET /api/cms/hero` - Get hero settings
- `GET /api/cms/all` - Get everything

**Admin (Requires Auth):**
- `PUT /api/cms/settings/:key` - Update a setting
- `PUT /api/cms/settings` - Update multiple settings
- `PUT /api/cms/content/:key` - Update content
- `PUT /api/cms/content` - Update multiple content
- `PUT /api/cms/colors/:name` - Update a color
- `PUT /api/cms/colors` - Update multiple colors
- `PUT /api/cms/features/:key` - Toggle feature
- `PUT /api/cms/hero` - Update hero settings
- `POST /api/cms/media/upload` - Upload media
- `DELETE /api/cms/media/:id` - Delete media

## 🎯 Best Practices

1. **Backup Before Major Changes**: Export your database before making significant changes
2. **Test Colors**: Preview colors before saving to ensure good contrast
3. **Optimize Images**: Compress images before uploading for better performance
4. **Use Descriptive Alt Text**: Always add alt text for accessibility
5. **Save Frequently**: Save changes regularly to avoid losing work

## 🐛 Troubleshooting

### Changes Not Showing?
1. Clear browser cache
2. Hard refresh (Ctrl+F5)
3. Check if backend server is running
4. Verify database connection

### Images Not Loading?
1. Check file path in media library
2. Ensure file exists in `/public/uploads/`
3. Check file permissions
4. Verify API URL in `.env`

### Colors Not Applying?
1. Check color format (should be hex: `#RRGGBB`)
2. Verify CSS variables are being set
3. Check browser console for errors

## 📚 Next Steps

1. **Customize Your Content**: Edit all text to match your brand
2. **Set Your Colors**: Choose colors that represent your brand
3. **Upload Images**: Add your own images to the media library
4. **Configure Settings**: Set up contact info and social links
5. **Enable Features**: Turn on/off features as needed

## 🎊 You're All Set!

Your website is now fully controllable from the admin panel. Every text, color, image, and setting can be changed without touching code!

