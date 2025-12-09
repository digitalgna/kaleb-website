# Deployment Guide - YEHA Niagara Falls Tours

This guide covers deploying your Next.js frontend, Express backend, and MySQL database to production.

## 📋 Table of Contents

1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Database Setup](#database-setup)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Environment Variables](#environment-variables)
6. [Platform-Specific Guides](#platform-specific-guides)
7. [Post-Deployment](#post-deployment)

---

## Pre-Deployment Checklist

- [ ] All code is committed to Git
- [ ] Environment variables are documented
- [ ] Database schema is ready
- [ ] Build process tested locally
- [ ] API endpoints tested
- [ ] Admin credentials changed from default

---

## Database Setup

### Option 1: Managed MySQL (Recommended)

**Popular Providers:**
- **PlanetScale** (Free tier available, serverless)
- **AWS RDS** (Scalable, production-ready)
- **DigitalOcean Managed Databases** (Simple, affordable)
- **Railway** (Easy setup, includes MySQL)
- **Render** (Free tier available)

### Option 2: Self-Hosted MySQL

If you have a VPS/server:
```bash
# Install MySQL
sudo apt update
sudo apt install mysql-server

# Secure installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p
```

```sql
CREATE DATABASE yeha_tours;
CREATE USER 'yeha_user'@'%' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON yeha_tours.* TO 'yeha_user'@'%';
FLUSH PRIVILEGES;
EXIT;
```

### Setup Database Schema

1. Connect to your production database
2. Run the schema files:
```bash
# From your local machine
mysql -h YOUR_DB_HOST -u YOUR_DB_USER -p yeha_tours < backend/sql/schema.sql
mysql -h YOUR_DB_HOST -u YOUR_DB_USER -p yeha_tours < backend/sql/seed.sql
mysql -h YOUR_DB_HOST -u YOUR_DB_USER -p yeha_tours < backend/sql/cms_schema.sql
mysql -h YOUR_DB_HOST -u YOUR_DB_USER -p yeha_tours < backend/sql/cms_seed.sql
```

Or use the setup scripts:
```bash
node backend/sql/setup.js
node backend/sql/setupCMS.js
```

---

## Backend Deployment

### Option 1: Railway (Recommended - Easiest)

1. **Sign up** at [railway.app](https://railway.app)
2. **Create New Project**
3. **Add MySQL Database:**
   - Click "New" → "Database" → "MySQL"
   - Railway will provide connection details
4. **Deploy Backend:**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Railway auto-detects Node.js
   - Set **Root Directory** to: `backend`
   - Set **Start Command** to: `node server.js`
5. **Add Environment Variables** (see Environment Variables section)
6. **Deploy!**

### Option 2: Render

1. **Sign up** at [render.com](https://render.com)
2. **Create Web Service:**
   - Connect GitHub repository
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && node server.js`
   - **Environment:** Node
3. **Add MySQL Database:**
   - Create "PostgreSQL" (or use external MySQL)
   - Or use "MySQL" addon if available
4. **Add Environment Variables**
5. **Deploy!**

### Option 3: DigitalOcean App Platform

1. **Sign up** at [digitalocean.com](https://digitalocean.com)
2. **Create App:**
   - Connect GitHub
   - Select "Backend" component
   - **Source Directory:** `backend`
   - **Build Command:** `npm install`
   - **Run Command:** `node server.js`
3. **Add Managed Database:**
   - Create MySQL database
   - Link to app
4. **Add Environment Variables**
5. **Deploy!**

### Option 4: VPS (DigitalOcean, Linode, AWS EC2)

1. **Create VPS** (Ubuntu 20.04+ recommended)
2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PM2** (Process Manager):
```bash
sudo npm install -g pm2
```

4. **Clone Repository:**
```bash
git clone YOUR_REPO_URL
cd canada-tour/backend
npm install --production
```

5. **Create PM2 Ecosystem File** (`ecosystem.config.js`):
```javascript
module.exports = {
  apps: [{
    name: 'yeha-backend',
    script: 'server.js',
    cwd: '/path/to/your/backend',
    instances: 1,
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 5000
    }
  }]
}
```

6. **Start with PM2:**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

7. **Setup Nginx** (Reverse Proxy):
```bash
sudo apt install nginx
```

Create `/etc/nginx/sites-available/yeha-backend`:
```nginx
server {
    listen 80;
    server_name api.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/yeha-backend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

8. **Setup SSL** (Let's Encrypt):
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.yourdomain.com
```

---

## Frontend Deployment

### Option 1: Vercel (Recommended for Next.js)

1. **Sign up** at [vercel.com](https://vercel.com)
2. **Import Project:**
   - Connect GitHub repository
   - Vercel auto-detects Next.js
3. **Configure:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend` ⚠️ **IMPORTANT** - Set to `frontend` directory
   - **Build Command:** `npm run build` - leave as default (auto-detected)
   - **Output Directory:** ⚠️ **LEAVE EMPTY/AUTO** - Do NOT set to `.next` (Vercel handles this automatically for Next.js)
   - **Install Command:** `npm install` - leave as default
4. **Add Environment Variables:**
   - `NEXT_PUBLIC_API_URL` = Your backend URL (e.g., `https://api.yourdomain.com/api`)
5. **Deploy!**

### Option 2: Netlify

1. **Sign up** at [netlify.com](https://netlify.com)
2. **Import Project:**
   - Connect GitHub
3. **Build Settings:**
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
4. **Add Environment Variables**
5. **Deploy!**

### Option 3: Railway (Full Stack)

1. **Add Frontend Service:**
   - In same Railway project
   - Click "New" → "GitHub Repo"
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
2. **Add Environment Variables**
3. **Deploy!**

### Option 4: VPS (Same as Backend)

1. **Build Locally or on Server:**
```bash
npm run build
```

2. **Start Production Server:**
```bash
npm start
# Or with PM2:
pm2 start npm --name "yeha-frontend" -- start
```

3. **Setup Nginx:**
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables

### Backend (.env)

```env
# Database
DB_HOST=your-db-host.com
DB_USER=your-db-user
DB_PASSWORD=your-secure-password
DB_NAME=yeha_tours

# Server
PORT=5000
NODE_ENV=production

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# CORS (Frontend URL)
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
```

**Important:** 
- Never commit `.env` files to Git
- Add `.env*` to `.gitignore`
- Set environment variables in your hosting platform's dashboard

---

## Platform-Specific Guides

### Railway (Full Stack - Easiest)

**Pros:** Easy setup, includes database, automatic deployments
**Cons:** Can be expensive at scale

1. **Create Project**
2. **Add MySQL Database** (free tier available)
3. **Add Backend Service:**
   - Root: `backend`
   - Start: `node server.js`
4. **Add Frontend Service:**
   - Root: `frontend`
   - Build: `npm run build`
   - Start: `npm start`
5. **Link Services** (database auto-links)
6. **Add Environment Variables**
7. **Deploy!**

### Vercel (Frontend) + Railway (Backend)

**Pros:** Best Next.js hosting, good performance
**Cons:** Two platforms to manage

1. Deploy backend on Railway (see above)
2. Deploy frontend on Vercel:
   - Set **Root Directory** to: `frontend`
   - Set `NEXT_PUBLIC_API_URL` to Railway backend URL
3. Done!

### DigitalOcean App Platform

**Pros:** Simple, good pricing, managed database
**Cons:** Slightly more complex setup

1. Create App from GitHub
2. Add Backend Component
3. Add Frontend Component
4. Add Managed Database
5. Link components
6. Deploy!

---

## Post-Deployment

### 1. Verify Database Connection

Check backend logs to ensure database connection is successful.

### 2. Test API Endpoints

```bash
# Health check
curl https://api.yourdomain.com/api/health

# Test CMS endpoint
curl https://api.yourdomain.com/api/cms/all
```

### 3. Test Frontend

- Visit your frontend URL
- Test admin login
- Verify CMS functionality
- Check all pages load correctly

### 4. Setup Custom Domains

**Backend:**
- Add custom domain in hosting platform
- Update DNS records
- Update `CORS_ORIGIN` in backend env

**Frontend:**
- Add custom domain in hosting platform
- Update DNS records
- Update `NEXT_PUBLIC_API_URL` if needed

### 5. Enable HTTPS

Most platforms (Vercel, Railway, Render) provide HTTPS automatically.
For VPS, use Let's Encrypt (see VPS section above).

### 6. Setup Monitoring

**Recommended Tools:**
- **Sentry** - Error tracking
- **Uptime Robot** - Uptime monitoring
- **LogRocket** - Session replay
- **PM2 Plus** - Server monitoring (if using PM2)

### 7. Backup Strategy

**Database:**
- Enable automated backups (most managed DBs do this)
- Or setup cron job for manual backups:
```bash
# Daily backup script
0 2 * * * mysqldump -h DB_HOST -u DB_USER -pDB_PASS yeha_tours > backup_$(date +\%Y\%m\%d).sql
```

**Files:**
- Uploaded media files should be backed up
- Consider using cloud storage (S3, Cloudinary) for uploads

### 8. Performance Optimization

**Backend:**
- Enable gzip compression
- Add caching headers
- Use CDN for static assets

**Frontend:**
- Next.js automatically optimizes
- Enable image optimization
- Use Vercel's edge network (if on Vercel)

---

## Quick Deploy Commands

### Railway CLI

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

### Vercel CLI

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

---

## Troubleshooting

### Backend won't start
- Check environment variables
- Verify database connection
- Check port availability
- Review logs

### Frontend can't connect to backend
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings
- Ensure backend is running
- Check network/firewall rules

### Database connection errors
- Verify credentials
- Check database is accessible
- Ensure IP whitelist includes backend server
- Test connection manually

### Build failures
- Check Node.js version (should be 18+)
- Verify all dependencies installed
- Check for TypeScript errors
- Review build logs

---

## Cost Estimates

### Free Tier Options:
- **Vercel:** Free (with limits)
- **Railway:** $5/month (includes $5 credit)
- **Render:** Free tier available
- **PlanetScale:** Free tier available

### Paid Options:
- **Vercel Pro:** $20/month
- **Railway:** Pay-as-you-go (~$5-20/month)
- **DigitalOcean:** ~$12/month (App + DB)
- **AWS:** Varies by usage

---

## Security Checklist

- [ ] Changed default admin password
- [ ] Using strong JWT secret
- [ ] HTTPS enabled
- [ ] CORS properly configured
- [ ] Database credentials secure
- [ ] Environment variables not in code
- [ ] Regular security updates
- [ ] Backup strategy in place

---

## Need Help?

- Check platform documentation
- Review error logs
- Test locally first
- Use platform support channels

---

**Good luck with your deployment! 🚀**

