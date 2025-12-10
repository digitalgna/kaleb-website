# Frontend Environment Variables Setup for cPanel

## 📋 Required Environment Variable

Your frontend only needs **ONE** environment variable:

```
NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api
```

## 🔧 How to Set It Up

### For Static Export (cPanel Deployment)

**Important:** For Next.js static export, environment variables must be set **BEFORE building**. They get baked into the static files at build time.

#### Step 1: Create `.env.local` file

In your `frontend` folder, create a file named `.env.local`:

**Windows (PowerShell):**
```powershell
cd frontend
echo "NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api" > .env.local
```

**Windows (Command Prompt):**
```cmd
cd frontend
echo NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api > .env.local
```

**Mac/Linux:**
```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api" > .env.local
```

#### Step 2: Verify the file

Open `frontend/.env.local` and make sure it contains:
```
NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api
```

#### Step 3: Build with the environment variable

```bash
cd frontend
npm install
npm run build
```

The build process will automatically read `.env.local` and bake the API URL into your static files.

## ✅ Verification

After building, you can verify the API URL is set correctly:

1. Open `frontend/out/_next/static/chunks/app/page-*.js` (or similar)
2. Search for `yehaniagara.magersoftware.com`
3. You should see the API URL embedded in the code

## 🚨 Important Notes

1. **`.env.local` is for local development/build** - Don't upload this file to cPanel
2. **Only upload the `out` folder** - The environment variable is already baked into the built files
3. **If you change the API URL later**, you must rebuild and re-upload
4. **`.env.local` should be in `.gitignore`** - Don't commit it to Git

## 🔄 Alternative: Manual Build Script

If you prefer, you can set the variable inline during build:

**Windows:**
```cmd
set NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api && npm run build
```

**Mac/Linux:**
```bash
NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api npm run build
```

## 📝 Summary

1. ✅ Create `.env.local` in `frontend/` folder
2. ✅ Add `NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api`
3. ✅ Run `npm run build` (reads `.env.local` automatically)
4. ✅ Upload `out/` folder contents to cPanel
5. ✅ **Don't upload `.env.local`** - it's not needed on cPanel

