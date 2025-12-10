# Vercel Deployment Guide

## 🎯 Deployment URLs
- **Frontend (Vercel):** Your Vercel domain (e.g., `your-app.vercel.app`)
- **Backend (cPanel):** https://yehaniagara.magersoftware.com/

---

## 🚀 Frontend Deployment on Vercel

### Step 1: Connect Repository to Vercel

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "Add New Project"**
3. **Import your Git repository** (`digitalgna/kaleb-website`)
4. **Configure Project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `frontend` (IMPORTANT!)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)
   - **Install Command:** `npm install` (default)

### Step 2: Set Environment Variables

**In Vercel Dashboard → Your Project → Settings → Environment Variables:**

Add this variable:

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_API_URL` | `https://yehaniagara.magersoftware.com/api` | Production, Preview, Development |

**Steps:**
1. Go to **Settings** → **Environment Variables**
2. Click **Add New**
3. **Key:** `NEXT_PUBLIC_API_URL`
4. **Value:** `https://yehaniagara.magersoftware.com/api`
5. **Environment:** Select all (Production, Preview, Development)
6. Click **Save**

### Step 3: Deploy

1. **Click "Deploy"** in Vercel
2. Vercel will automatically:
   - Install dependencies
   - Build your Next.js app
   - Deploy to production

### Step 4: Configure Custom Domain (Optional)

1. Go to **Settings** → **Domains**
2. Add your domain: `yehafrontend.magersoftware.com`
3. Follow Vercel's DNS instructions

---

## ✅ Verification

After deployment, test these:

1. **Frontend:** Visit your Vercel URL
   - Should load the homepage
   - Check browser console for API calls

2. **API Connection:** Open browser DevTools → Network tab
   - Look for requests to `https://yehaniagara.magersoftware.com/api`
   - Should return data (not CORS errors)

3. **Health Check:** Visit `https://yehaniagara.magersoftware.com/api/health`
   - Should return: `{"status": "ok", "message": "YEHA Tours API is running"}`

---

## 🔧 Troubleshooting

### CORS Errors

If you see CORS errors, make sure your backend `.env` has:
```
CORS_ORIGIN=https://your-vercel-app.vercel.app
```
Or if using custom domain:
```
CORS_ORIGIN=https://yehafrontend.magersoftware.com
```

### Environment Variables Not Working

1. **Redeploy after adding env vars** - Vercel needs a new deployment
2. **Check variable name** - Must start with `NEXT_PUBLIC_` for client-side
3. **Verify in Vercel dashboard** - Settings → Environment Variables

### Build Failures

1. **Check Root Directory** - Must be set to `frontend`
2. **Check Node.js version** - Vercel auto-detects, but you can set in `package.json`:
   ```json
   "engines": {
     "node": ">=18.0.0"
   }
   ```

---

## 📝 Quick Checklist

- [ ] Repository connected to Vercel
- [ ] Root Directory set to `frontend`
- [ ] Environment variable `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Backend CORS configured for Vercel domain
- [ ] First deployment successful
- [ ] Custom domain configured (if needed)
- [ ] API calls working (check browser console)

---

## 🎉 Benefits of Vercel

- ✅ **Automatic deployments** from Git pushes
- ✅ **Preview deployments** for pull requests
- ✅ **Serverless functions** support
- ✅ **Edge network** for fast global performance
- ✅ **No build step needed** - Vercel handles it
- ✅ **Environment variables** managed in dashboard
- ✅ **Free SSL certificates** for custom domains

---

## 🔄 Updating Environment Variables

1. Go to **Settings** → **Environment Variables**
2. Edit the variable
3. **Redeploy** (Vercel will auto-redeploy on next push, or click "Redeploy")

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js on Vercel](https://vercel.com/docs/frameworks/nextjs)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

