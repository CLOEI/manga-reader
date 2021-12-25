module.exports = {
	reactStrictMode: true,
	images: {
		domains: ['uploads.mangadex.org'],
	},
	async rewrites() {
		return [
			{
				source: '/api/:x',
				destination: 'https://api.mangadex.org/:x',
			},
		];
	},
};
