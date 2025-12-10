#!/bin/bash
# Build script for cPanel deployment

echo "🔨 Building frontend for cPanel deployment..."

# Set environment variable
export NEXT_PUBLIC_API_URL=https://yehaniagara.magersoftware.com/api

# Enable static export in next.config.js
echo "⚙️  Configuring Next.js for static export..."
sed -i.bak "s|// output: 'export',|output: 'export',|" next.config.js

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build Next.js (will create 'out' folder automatically)
echo "🏗️  Building Next.js application..."
npm run build

# Restore original config
echo "🔄 Restoring original config..."
mv next.config.js.bak next.config.js

echo "✅ Build complete! Upload the contents of the 'out' folder to your cPanel public_html directory."

