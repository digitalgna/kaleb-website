# CORS Configuration Fix

## ✅ Backend Status: RUNNING
Your backend is accessible at: https://yehaniagara.magersoftware.com/api/health

## 🔧 Fix CORS Configuration

### Step 1: Find Your Vercel Domain

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Domains**
4. Copy your production domain (e.g., `your-app.vercel.app` or `yehafrontend.magersoftware.com`)

### Step 2: Update Backend CORS

**On cPanel, edit your backend `.env` file:**

Add or update this line:
```
CORS_ORIGIN=https://your-vercel-domain.vercel.app
```

**If you have multiple domains, you can use a comma-separated list:**
```
CORS_ORIGIN=https://your-app.vercel.app,https://yehafrontend.magersoftware.com
```

**Or allow all origins (less secure, but for testing):**
```
CORS_ORIGIN=*
```

### Step 3: Restart Backend

**In cPanel Node.js Selector:**
1. Find your application
2. Click **"Restart"** or **"Stop"** then **"Start"**

**Or via SSH:**
```bash
# If using PM2
pm2 restart yeha-backend

# Or restart via cPanel Node.js Selector
```

### Step 4: Verify CORS is Working

**Test in browser console on your Vercel site:**
```javascript
fetch('https://yehaniagara.magersoftware.com/api/health', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(r => r.json())
.then(data => console.log('✅ CORS works!', data))
.catch(err => console.error('❌ CORS error:', err))
```

**If you see CORS error:**
- Check the error message - it will show which origin is being blocked
- Make sure that exact origin is in your `CORS_ORIGIN` variable
- Restart backend after updating `.env`

---

## 🔍 Alternative: Check Current CORS Setting

**Test what CORS is currently set to:**

In browser console on your Vercel site:
```javascript
fetch('https://yehaniagara.magersoftware.com/api/health', {
  method: 'OPTIONS'
})
.then(r => {
  console.log('CORS Headers:', r.headers.get('access-control-allow-origin'))
})
```

---

## 📝 Quick Checklist

- [ ] Found your Vercel domain
- [ ] Updated `CORS_ORIGIN` in backend `.env`
- [ ] Restarted backend on cPanel
- [ ] Tested CORS in browser console
- [ ] No CORS errors in console
- [ ] Frontend can now connect to backend

---

## 🚨 Common Issues

### Issue: Still getting CORS errors after update

**Solution:**
1. Double-check the exact domain (including `https://`)
2. Make sure you restarted the backend
3. Clear browser cache
4. Try incognito/private window

### Issue: Multiple domains

**Solution:**
Update backend code to handle multiple origins, or use wildcard `*` for testing.

### Issue: Environment variable not loading

**Solution:**
- Check `.env` file is in the correct location (backend folder)
- Verify file has correct format (no spaces around `=`)
- Restart backend after changes

