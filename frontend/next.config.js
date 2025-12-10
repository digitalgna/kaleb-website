/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Uncomment the line below for static export (cPanel deployment)
  // output: 'export',
  images: {
    domains: ['localhost', 'images.unsplash.com', 'yehaniagara.magersoftware.com'],
    unoptimized: false,
  },
  // App Router is stable in Next.js 14, no need for experimental flag
}

module.exports = nextConfig

