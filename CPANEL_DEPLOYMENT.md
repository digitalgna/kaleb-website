# cPanel Deployment Guide

## 🎯 Deployment URLs
- **Frontend:** http://yehafrontend.magersoftware.com/
- **Backend:** https://yehaniagara.magersoftware.com/

---

## 📦 Backend Deployment (cPanel)

### Prerequisites
- cPanel with Node.js support (Node.js Selector)
- MySQL database created in cPanel
- SSH access (recommended) or File Manager

### Step 1: Prepare Backend Files

1. **Upload backend folder** to your cPanel:
   - Via File Manager: Upload `backend` folder to `~/yehaniagara/` (or your preferred location)
   - Via FTP: Upload entire `backend` folder
   - Via Git: Clone repository and navigate to backend folder

### Step 2: Setup Node.js Application in cPanel

1. **Login to cPanel**
2. **Go to "Node.js Selector"** (or "Setup Node.js App")
3. **Click "Create Application"**
4. **Configure:**
   - **Node.js Version:** 18.x or higher
   - **Application Mode:** Production
   - **Application Root:** `yehaniagara` (or your backend folder path)
   - **Application URL:** `yehaniagara.magersoftware.com` (or subdomain)
   - **Application Startup File:** `server.js`
   - **Application Port:** Leave default (cPanel will assign)

### Step 3: Install Dependencies

**Via SSH (Recommended):**
```bash
cd ~/yehaniagara
npm install --production
```

**Via cPanel Terminal:**
- Open Terminal in cPanel
- Navigate to backend folder
- Run: `npm install --production`

### Step 4: Create Environment File

Create `.env` file in the backend folder with:

```env
# Database Configuration
DB_HOST=localhost
DB_USER=your_cpanel_db_user
DB_PASSWORD=your_cpanel_db_password
DB_NAME=your_database_name

# Server Configuration
PORT=5000
NODE_ENV=production

# JWT Secret (generate a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# CORS - Frontend URL
CORS_ORIGIN=http://yehafrontend.magersoftware.com
```

**How to create .env file:**
- Via File Manager: Create new file named `.env` in backend folder
- Via SSH: `nano .env` or `vi .env`
- Paste the content above and update with your actual values

### Step 5: Setup Database

1. **Create MySQL Database in cPanel:**
   - Go to "MySQL Databases"
   - Create new database (e.g., `username_yeha_tours`)
   - Create database user and assign to database
   - Note down: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME

2. **Import Database Schema:**
   - Via phpMyAdmin:
     - Select your database
     - Go to "Import" tab
     - Upload `backend/sql/schema.sql`
     - Upload `backend/sql/seed.sql`
     - Upload `backend/sql/cms_schema.sql`
     - Upload `backend/sql/cms_seed.sql`
   
   - Via SSH:
     ```bash
     mysql -u your_db_user -p your_database_name < backend/sql/schema.sql
     mysql -u your_db_user -p your_database_name < backend/sql/seed.sql
     mysql -u your_db_user -p your_database_name < backend/sql/cms_schema.sql
     mysql -u your_db_user -p your_database_name < backend/sql/cms_seed.sql
     ```

### Step 6: Configure Uploads Directory

Ensure uploads directory exists and is writable:

```bash
cd ~/yehaniagara
mkdir -p public/uploads
chmod 755 public/uploads
```

### Step 7: Start the Application

1. **In Node.js Selector:**
   - Find your application
   - Click "Start" or "Restart"

2. **Via SSH (Alternative):**
   ```bash
   cd ~/yehaniagara
   node server.js
   ```
   Or use PM2:
   ```bash
   npm install -g pm2
   pm2 start server.js --name yeha-backend
   pm2 save
   ```

### Step 8: Verify Backend is Running

Test the API:
```bash
curl https://yehaniagara.magersoftware.com/api/health
```

Should return: `{"status":"ok","message":"YEHA Tours API is running"}`

---

## 🎨 Frontend Deployment (cPanel)

### Option A: Static Export (Recommended for cPanel)

### Step 1: Configure Next.js for Static Export

Edit `frontend/next.config.js` and uncomment the `output: 'export'` line:

```javascript
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Uncomment this line for static export
  images: {
    domains: ['localhost', 'images.unsplash.com', 'yehaniagara.magersoftware.com'],
    unoptimized: true,  // Required for static export
  },
}
```

### Step 2: Build Frontend Locally

On your local machine:

**Windows:**
```bash
cd frontend

# Create .env.local file
echo NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api > .env.local

# Install dependencies
npm install

# Build for production (creates 'out' folder automatically)
npm run build
```

**Linux/Mac:**
```bash
cd frontend

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api" > .env.local

# Install dependencies
npm install

# Build for production (creates 'out' folder automatically)
npm run build
```

This creates a `frontend/out` folder with static files.

### Step 2: Upload Static Files

1. **Via File Manager:**
   - Navigate to `public_html` (or your domain's root folder)
   - Upload all contents from `frontend/out` folder
   - Ensure `index.html` is in the root

2. **Via FTP:**
   - Connect to your cPanel FTP
   - Upload all files from `frontend/out` to `public_html/`

### Step 3: Configure .htaccess (for Next.js routing)

Create `.htaccess` file in `public_html/`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### Option B: Node.js Application (If cPanel supports it)

### Step 1: Upload Frontend Files

Upload entire `frontend` folder to cPanel (e.g., `~/yehafrontend/`)

### Step 2: Setup Node.js Application

1. **In Node.js Selector:**
   - Create new application
   - **Application Root:** `yehafrontend`
   - **Application URL:** `yehafrontend.magersoftware.com`
   - **Startup File:** `server.js` (create this - see below)

### Step 3: Create server.js for Frontend

Create `frontend/server.js`:

```javascript
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      res.statusCode = 500
      res.end('internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
```

### Step 4: Create .env File

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api
NODE_ENV=production
```

### Step 5: Install and Build

```bash
cd ~/yehafrontend
npm install
npm run build
```

### Step 6: Start Application

In Node.js Selector, start the application.

---

## ✅ Post-Deployment Checklist

### Backend
- [ ] Backend API accessible at `https://yehaniagara.magersoftware.com/api/health`
- [ ] Database connection successful (check logs)
- [ ] CORS allows frontend domain
- [ ] Uploads directory is writable
- [ ] Environment variables set correctly

### Frontend
- [ ] Frontend accessible at `http://yehafrontend.magersoftware.com/`
- [ ] API calls work (check browser console)
- [ ] Admin login works
- [ ] Images load correctly
- [ ] All pages accessible

### Security
- [ ] HTTPS enabled for backend (if possible)
- [ ] Default admin password changed
- [ ] JWT_SECRET is strong and unique
- [ ] Database credentials are secure

---

## 🔧 Troubleshooting

### Backend Issues

**"Cannot connect to database"**
- Verify database credentials in `.env`
- Check database user has proper permissions
- Ensure database exists

**"Port already in use"**
- Check if another Node.js app is using the port
- Update PORT in `.env` if needed

**"CORS errors"**
- Verify `CORS_ORIGIN` in `.env` matches frontend URL exactly
- Check backend logs for CORS errors

### Frontend Issues

**"Failed to fetch" or API errors**
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check backend is running and accessible
- Verify CORS configuration

**"404 errors on routes"**
- Ensure `.htaccess` is configured for static export
- Check all files uploaded correctly

**"Images not loading"**
- Verify image domains in `next.config.js`
- Check uploads directory permissions

---

## 📝 Environment Variables Summary

### Backend (.env)
```env
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_database_name
PORT=5000
NODE_ENV=production
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://yehafrontend.magersoftware.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api
```

---

## 🚀 Quick Deploy Commands

### Backend (SSH)
```bash
cd ~/yehaniagara
npm install --production
# Update .env file
node server.js
```

### Frontend (Local Build)
```bash
cd frontend
# 1. Edit next.config.js - uncomment output: 'export' and set unoptimized: true
# 2. Create .env.local with NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api
echo "NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api" > .env.local
npm install
npm run build
# Upload 'out' folder contents to public_html
```

---

**Good luck with your deployment! 🎉**

