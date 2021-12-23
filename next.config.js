module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/api/:x',
				destination: 'https://api.mangadex.org/:x',
			},
		];
	},
};
