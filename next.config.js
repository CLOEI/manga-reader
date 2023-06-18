/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa')({
  dest: 'public',
  fallbacks: {
    document: '/offline',
  }
})

const nextConfig = withPWA({
  images: {
    domains: ['uploads.mangadex.org'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.mangadex.org/:path*'
      }
    ]
  }
})

module.exports = nextConfig
