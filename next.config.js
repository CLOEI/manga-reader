/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = withPWA({
	reactStrictMode: true,
	pwa: {
		dest: 'public',
	},
	images: {
		domains: ['uploads.mangadex.org'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'https://api.mangadex.org/:path*',
			},
		];
	},
});

module.exports = nextConfig;
