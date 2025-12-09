# Quick Deployment Guide

## 🚀 Fastest Way to Deploy (Railway - All-in-One)

### Step 1: Database
1. Go to [railway.app](https://railway.app) and sign up
2. Click "New Project" → "New" → "Database" → "MySQL"
3. Copy the connection details (you'll need them)

### Step 2: Backend
1. In Railway, click "New" → "GitHub Repo"
2. Select your repository
3. Settings:
   - **Root Directory:** `backend`
   - **Start Command:** `node server.js`
4. Add Environment Variables:
   ```
   DB_HOST=<from database>
   DB_USER=<from database>
   DB_PASSWORD=<from database>
   DB_NAME=<from database>
   PORT=5000
   JWT_SECRET=<generate a random string>
   CORS_ORIGIN=https://your-frontend-url.com
   ```
5. Deploy!

### Step 3: Frontend (Vercel - Best for Next.js)
1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Add New Project"
3. Import your GitHub repository
4. Settings:
   - Framework: Next.js (auto-detected)
   - Build Command: `npm run build`
5. Add Environment Variable:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
   ```
6. Deploy!

### Step 4: Setup Database
1. Get your database connection string from Railway
2. Run setup scripts (from your local machine):
```bash
# Update backend/.env with production DB credentials
# Then run:
cd backend
node sql/setup.js
node sql/setupCMS.js
```

### Step 5: Test
- Visit your Vercel URL
- Login to admin panel
- Test CMS functionality

---

## 📝 Environment Variables Checklist

### Backend (Railway)
- [ ] DB_HOST
- [ ] DB_USER
- [ ] DB_PASSWORD
- [ ] DB_NAME
- [ ] PORT (default: 5000)
- [ ] JWT_SECRET (generate random string)
- [ ] CORS_ORIGIN (your frontend URL)

### Frontend (Vercel)
- [ ] NEXT_PUBLIC_API_URL (your backend URL + /api)

---

## 🔗 Get Your URLs

After deployment:
- **Backend URL:** Railway will show this (e.g., `https://your-app.railway.app`)
- **Frontend URL:** Vercel will show this (e.g., `https://your-app.vercel.app`)

Update:
- Backend `CORS_ORIGIN` = Frontend URL
- Frontend `NEXT_PUBLIC_API_URL` = Backend URL + `/api`

---

## ✅ Post-Deployment Checklist

- [ ] Database schema created
- [ ] Admin account created (change default password!)
- [ ] Frontend connects to backend
- [ ] Admin login works
- [ ] CMS features work
- [ ] Custom domain configured (optional)
- [ ] HTTPS enabled (automatic on Vercel/Railway)

---

## 🆘 Common Issues

**Backend can't connect to database:**
- Check database is running
- Verify credentials
- Check IP whitelist (if applicable)

**Frontend shows "Failed to fetch":**
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check backend is running
- Verify CORS settings

**Admin login doesn't work:**
- Run `node backend/sql/createAdmin.js` with production DB
- Check JWT_SECRET is set

---

## 💰 Cost

**Free Tier:**
- Railway: $5 credit/month (usually enough for small apps)
- Vercel: Free (with limits)

**Total:** ~$0-5/month for small projects

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

