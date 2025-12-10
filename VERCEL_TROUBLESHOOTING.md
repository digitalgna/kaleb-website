# Vercel Deployment - Connection Error Fix

## 🔴 Problem: "Failed to fetch" / "Cannot connect to backend"

This happens when your Vercel frontend can't reach your backend API.

---

## ✅ Solution: Set Environment Variable in Vercel

### Step 1: Go to Vercel Dashboard

1. Open [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**

### Step 2: Add Environment Variable

Click **"Add New"** and enter:

- **Key:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://yehaniagara.magersoftware.com/api`
- **Environment:** Select all (Production, Preview, Development)
- Click **Save**

### Step 3: Redeploy

**Important:** After adding/changing environment variables, you MUST redeploy:

1. Go to **Deployments** tab
2. Click the **"..."** menu on the latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger auto-deploy

---

## 🔍 Verify Environment Variable is Set

### Method 1: Check in Vercel Dashboard
- Settings → Environment Variables
- Should see `NEXT_PUBLIC_API_URL` listed

### Method 2: Check in Browser Console
1. Open your deployed site
2. Open Browser DevTools (F12)
3. Go to Console tab
4. Type: `console.log(process.env.NEXT_PUBLIC_API_URL)`
5. Should show: `https://yehaniagara.magersoftware.com/api`

**Note:** If it shows `undefined` or `http://localhost:5000/api`, the env var is not set correctly.

---

## 🔧 Additional Checks

### 1. Verify Backend is Running

Test in browser:
```
https://yehaniagara.magersoftware.com/api/health
```

Should return:
```json
{"status": "ok", "message": "YEHA Tours API is running"}
```

### 2. Check CORS Configuration

Your backend `.env` on cPanel should have:
```
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

Or if using custom domain:
```
CORS_ORIGIN=https://yehafrontend.magersoftware.com
```

**To find your Vercel domain:**
- Go to Vercel Dashboard → Your Project → Settings → Domains
- Copy the production domain (e.g., `your-app.vercel.app`)

### 3. Check Browser Console for CORS Errors

Open Browser DevTools → Network tab:
- Look for failed requests
- Check if error says "CORS policy" or "Access-Control-Allow-Origin"
- If yes, update backend CORS_ORIGIN

---

## 🚨 Common Issues

### Issue 1: Environment Variable Not Applied

**Symptom:** Still seeing `localhost` in errors

**Fix:**
1. Verify variable is saved in Vercel
2. **Redeploy** (this is critical!)
3. Clear browser cache
4. Hard refresh (Ctrl+Shift+R)

### Issue 2: CORS Error

**Symptom:** Browser console shows "CORS policy" error

**Fix:**
1. Update backend `.env` with your Vercel domain
2. Restart backend on cPanel
3. Test again

### Issue 3: Backend Not Accessible

**Symptom:** Can't reach `https://yehaniagara.magersoftware.com/api/health`

**Fix:**
1. Check backend is running on cPanel
2. Verify Node.js app is active
3. Check backend logs in cPanel

---

## 📝 Quick Checklist

- [ ] Environment variable `NEXT_PUBLIC_API_URL` set in Vercel
- [ ] Value is: `https://yehaniagara.magersoftware.com/api`
- [ ] Variable applies to Production, Preview, Development
- [ ] Redeployed after setting variable
- [ ] Backend health check works: `https://yehaniagara.magersoftware.com/api/health`
- [ ] Backend CORS_ORIGIN includes your Vercel domain
- [ ] Browser cache cleared
- [ ] Tested in incognito/private window

---

## 🎯 Expected Result

After fixing:
- ✅ No "Failed to fetch" errors
- ✅ Tours load correctly
- ✅ CMS data loads
- ✅ Testimonials display
- ✅ Admin login works

---

## 💡 Pro Tip

To verify the API URL is correct in production:
1. Open browser console on your Vercel site
2. Run: `fetch('https://yehaniagara.magersoftware.com/api/health').then(r => r.json()).then(console.log)`
3. Should return: `{status: "ok", message: "YEHA Tours API is running"}`

If this works but your app doesn't, it's likely the environment variable isn't set or the app wasn't redeployed.

