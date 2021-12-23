module.exports = {
	reactStrictMode: true,
	async rewrites() {
		return [
			{
				source: '/dex/:x',
				destination: 'https://api.mangadex.org/:x',
			},
		];
	},
};
