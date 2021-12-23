module.exports = {
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/api/',
				destination: 'https://api.mangadex.org/',
				permanent: true,
			},
		];
	},
};
