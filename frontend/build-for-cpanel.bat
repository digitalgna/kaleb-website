@echo off
REM Build script for cPanel deployment (Windows)

echo 🔨 Building frontend for cPanel deployment...

REM Set environment variable
set NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api

REM Enable static export in next.config.js
echo ⚙️  Configuring Next.js for static export...
powershell -Command "(Get-Content next.config.js) -replace '// output: ''export'',', 'output: ''export'',' | Set-Content next.config.js.tmp"
copy next.config.js next.config.js.bak >nul
copy next.config.js.tmp next.config.js >nul
del next.config.js.tmp >nul

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

REM Build Next.js (will create 'out' folder automatically)
echo 🏗️  Building Next.js application...
call npm run build

REM Restore original config
echo 🔄 Restoring original config...
copy next.config.js.bak next.config.js >nul
del next.config.js.bak >nul

echo ✅ Build complete! Upload the contents of the 'out' folder to your cPanel public_html directory.
pause

