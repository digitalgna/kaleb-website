# Troubleshooting Guide

## "Failed to fetch" Error

This error typically means the frontend cannot connect to the backend API server.

### Quick Fixes

1. **Check if Backend Server is Running**
   ```bash
   # In a separate terminal, start the backend:
   npm run server
   
   # Or check if it's already running:
   curl https://yehaniagara.magersoftware.com//api/health
   ```

2. **Verify Backend is on Port 5000**
   - Check terminal output for: `🚀 Server running on https://yehaniagara.magersoftware.com/`
   - If you see errors, check the database connection

3. **Check Environment Variables**
   - Make sure you have a `.env` file in the root directory
   - Verify `NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com//api`
   - Restart Next.js dev server after changing `.env` files

4. **Database Connection Issues**
   ```bash
   # Test database connection:
   cd backend
   node -e "require('./config/db').testConnection()"
   ```

### Common Issues

#### Issue: Backend Server Won't Start

**Symptoms:**
- Error: "Cannot connect to database"
- Error: "Port 5000 already in use"

**Solutions:**
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Kill process using port 5000 (Windows)
taskkill /PID <PID> /F

# Or change port in .env:
PORT=5001
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

#### Issue: Database Connection Failed

**Symptoms:**
- "Unable to connect to the database"
- "Access denied for user"

**Solutions:**
1. Verify MySQL is running:
   ```bash
   # Windows
   services.msc  # Look for MySQL service
   
   # Mac/Linux
   sudo service mysql status
   ```

2. Check `.env` credentials:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_actual_password
   DB_NAME=yeha_tours
   ```

3. Test MySQL connection:
   ```bash
   mysql -u root -p
   # Enter password, then:
   SHOW DATABASES;
   ```

#### Issue: CORS Errors

**Symptoms:**
- "CORS policy" errors in browser console
- "Access-Control-Allow-Origin" errors

**Solution:**
The backend already has CORS enabled. If you still see errors:
- Make sure backend is running
- Check that frontend URL matches CORS settings
- Clear browser cache

#### Issue: API Returns 401 Unauthorized

**Symptoms:**
- "Invalid token" errors
- Admin pages redirect to login

**Solutions:**
1. Clear localStorage:
   ```javascript
   // In browser console:
   localStorage.clear()
   ```
2. Login again at `/admin/login`
3. Check that JWT_SECRET is set in `.env`

### Step-by-Step Debugging

1. **Start Backend First:**
   ```bash
   cd backend
   node server.js
   ```
   Should see: `✅ Database connection established successfully.`
   Should see: `🚀 Server running on https://yehaniagara.magersoftware.com/`

2. **Test API Endpoint:**
   ```bash
   curl https://yehaniagara.magersoftware.com//api/health
   ```
   Should return: `{"status":"ok","message":"YEHA Tours API is running"}`

3. **Start Frontend:**
   ```bash
   npm run dev
   ```

4. **Check Browser Console:**
   - Open DevTools (F12)
   - Go to Network tab
   - Look for failed requests
   - Check the error message

### Environment File Setup

Create `.env` in the root directory:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=yeha_tours

# JWT
JWT_SECRET=your_super_secret_jwt_key_change_this

# API
NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com//api
PORT=5000

# Environment
NODE_ENV=development
```

**Important:** 
- `.env` file must be in the root directory (same level as `package.json`)
- Restart both servers after changing `.env`
- For Next.js, use `NEXT_PUBLIC_` prefix for client-side variables

### Still Not Working?

1. **Check Terminal Output:**
   - Look for error messages in both frontend and backend terminals
   - Copy the exact error message

2. **Verify File Structure:**
   ```
   canada-tour/
   ├── .env              ← Must exist here
   ├── package.json
   ├── backend/
   │   └── server.js
   └── src/
   ```

3. **Test Database Setup:**
   ```bash
   cd backend
   node sql/setup.js
   ```

4. **Check Node Version:**
   ```bash
   node --version  # Should be 18+
   ```

### Getting Help

If you're still stuck, provide:
1. Exact error message from browser console
2. Backend terminal output
3. Frontend terminal output
4. Contents of `.env` (without passwords)

