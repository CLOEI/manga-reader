/** @type {import('next').NextConfig} */
module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['uploads.mangadex.org', 'lh3.googleusercontent.com'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:x*',
				destination: 'https://api.mangadex.org/:x*',
			},
		];
	},
};
