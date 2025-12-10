# Quick Deployment Steps - cPanel

## 🎯 URLs
- Frontend: http://yehafrontend.magersoftware.com/
- Backend: https://yehaniagara.magersoftware.com/

---

## ⚡ Quick Steps

### BACKEND (5 minutes)

1. **Upload backend folder** to cPanel (via File Manager or FTP)
   - Location: `~/yehaniagara/` or your preferred folder

2. **Setup Node.js App in cPanel:**
   - Go to "Node.js Selector"
   - Create Application
   - Root: `yehaniagara`
   - Startup: `server.js`
   - Port: Auto-assigned

3. **Create `.env` file** in backend folder:
   ```env
   DB_HOST=localhost
   DB_USER=your_cpanel_db_user
   DB_PASSWORD=your_cpanel_db_password
   DB_NAME=your_database_name
   PORT=5000
   NODE_ENV=production
   JWT_SECRET=your-random-secret-key
   CORS_ORIGIN=http://yehafrontend.magersoftware.com
   ```

4. **Create MySQL Database:**
   - cPanel → MySQL Databases
   - Create database and user
   - Import schema files via phpMyAdmin:
     - `backend/sql/schema.sql`
     - `backend/sql/seed.sql`
     - `backend/sql/cms_schema.sql`
     - `backend/sql/cms_seed.sql`

5. **Install & Start:**
   ```bash
   cd ~/yehaniagara
   npm install --production
   ```
   - Then click "Start" in Node.js Selector

6. **Test:** Visit `https://yehaniagara.magersoftware.com/api/health`

---

### FRONTEND (10 minutes)

#### Option 1: Static Export (Recommended)

1. **Edit `frontend/next.config.js`:**
   ```javascript
   const nextConfig = {
     reactStrictMode: true,
     output: 'export',  // ADD THIS LINE
     images: {
       domains: ['localhost', 'images.unsplash.com', 'yehaniagara.magersoftware.com'],
       unoptimized: true,  // CHANGE TO true
     },
   }
   ```

2. **Create environment file:**
   ```bash
   cd frontend
   # Create .env.local file with your API URL
   echo "NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api" > .env.local
   ```
   **Windows CMD:** `echo NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api > .env.local`
   
   Verify the file contains: `NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api`

3. **Build locally:**
   ```bash
   npm install
   npm run build
   ```
   This creates `frontend/out` folder with the API URL baked in

3. **Upload to cPanel:**
   - Upload ALL contents of `frontend/out` folder
   - Upload to `public_html/` (or your domain's root folder)

4. **Create `.htaccess`** in `public_html/`:
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

5. **Test:** Visit `http://yehafrontend.magersoftware.com/`

---

## ✅ Checklist

### Backend
- [ ] Backend folder uploaded
- [ ] Node.js app created in cPanel
- [ ] `.env` file created with correct values
- [ ] Database created and schema imported
- [ ] Dependencies installed (`npm install`)
- [ ] App started in Node.js Selector
- [ ] Health check works: `https://yehaniagara.magersoftware.com/api/health`

### Frontend
- [ ] `next.config.js` updated (output: 'export', unoptimized: true)
- [ ] `.env.local` created with API URL
- [ ] Built successfully (`npm run build`)
- [ ] `out` folder contents uploaded to `public_html/`
- [ ] `.htaccess` file created
- [ ] Frontend loads at `http://yehafrontend.magersoftware.com/`
- [ ] API calls work (check browser console)

---

## 🔧 Troubleshooting

**Backend not starting?**
- Check `.env` file exists and has correct values
- Check database credentials
- Check Node.js version (needs 18+)
- Check logs in Node.js Selector

**Frontend 404 errors?**
- Ensure `.htaccess` is in `public_html/`
- Check all files uploaded correctly
- Verify `index.html` exists in root

**API calls failing?**
- Verify `NEXT_PUBLIC_API_URL` in `.env.local` matches backend URL
- Check CORS_ORIGIN in backend `.env` matches frontend URL
- Check browser console for errors

---

**Need more details? See `CPANEL_DEPLOYMENT.md`**

