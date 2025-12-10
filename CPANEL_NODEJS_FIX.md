# Fix: cPanel Node.js Application Setup

## Problem
Error: "No such application or it's broken. Unable to find app venv folder"

This happens when cPanel doesn't recognize your app as a Node.js application.

## Solution

### Step 1: Delete and Recreate the Node.js App

1. **Go to cPanel → Node.js Selector**
2. **Delete the existing application** (if it exists)
3. **Click "Create Application"**

### Step 2: Configure Application Correctly

**Important Settings:**
- **Node.js Version:** Select 18.x or higher
- **Application Mode:** Production
- **Application Root:** `yehaniagara` (or your exact folder name)
- **Application URL:** `yehaniagara.magersoftware.com` (or your subdomain)
- **Application Startup File:** `server.js` (must match exactly)
- **Application Port:** Leave as default (cPanel will assign)

### Step 3: Verify File Structure

Ensure your backend folder structure looks like this:
```
yehaniagara/
├── server.js          ← Must exist
├── package.json       ← Must exist
├── package-lock.json  ← Should exist
├── .env               ← Create this
├── .node-version      ← Added to help cPanel
├── .nvmrc             ← Added to help cPanel
├── config/
├── controllers/
├── models/
├── routes/
└── ...
```

### Step 4: Install Dependencies

**Via SSH (Recommended):**
```bash
cd ~/yehaniagara
npm install --production
```

**Via cPanel Terminal:**
- Open Terminal in cPanel
- Navigate to your backend folder
- Run: `npm install --production`

### Step 5: Create .env File

Create `.env` file in the backend folder with:
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

### Step 6: Start Application

1. In Node.js Selector, find your application
2. Click "Start" or "Restart"
3. Check the logs for any errors

## Alternative: Manual Setup via SSH

If Node.js Selector continues to have issues:

1. **SSH into your server**
2. **Navigate to your app folder:**
   ```bash
   cd ~/yehaniagara
   ```

3. **Install PM2 globally:**
   ```bash
   npm install -g pm2
   ```

4. **Start with PM2:**
   ```bash
   pm2 start server.js --name yeha-backend
   pm2 save
   pm2 startup
   ```

5. **Configure reverse proxy** (if needed):
   - Create `.htaccess` in public_html or configure Apache virtual host
   - Point to your Node.js app port

## Common Issues

### Issue: "Cannot find module"
**Solution:** Run `npm install` in the backend folder

### Issue: "Port already in use"
**Solution:** 
- Check what's using the port: `lsof -i :PORT`
- Or change PORT in `.env` file

### Issue: "Database connection failed"
**Solution:**
- Verify database credentials in `.env`
- Check database exists and user has permissions

### Issue: Application keeps stopping
**Solution:**
- Check logs in Node.js Selector
- Verify all dependencies installed
- Check `.env` file exists and has correct values
- Use PM2 for better process management

## Verification

Test your backend:
```bash
curl https://yehaniagara.magersoftware.com/api/health
```

Should return:
```json
{"status":"ok","message":"YEHA Tours API is running"}
```

## If Still Not Working

1. **Check cPanel Node.js version:**
   - Ensure Node.js 18+ is available
   - Some hosts require enabling Node.js in cPanel first

2. **Check file permissions:**
   ```bash
   chmod 755 ~/yehaniagara
   chmod 644 ~/yehaniagara/server.js
   ```

3. **Check package.json:**
   - Ensure `"main": "server.js"` is correct
   - Ensure `"start"` script exists

4. **Contact your hosting provider:**
   - Ask them to verify Node.js is properly configured
   - Some shared hosting doesn't support Node.js apps

