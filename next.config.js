/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
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
};

module.exports = nextConfig;
