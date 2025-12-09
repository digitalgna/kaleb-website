/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'images.unsplash.com'],
    unoptimized: false,
  },
  // App Router is stable in Next.js 14, no need for experimental flag
}

module.exports = nextConfig

