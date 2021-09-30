const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
	app.use(
		"/api",
		createProxyMiddleware({
			target: "https://api.mangadex.org",
			changeOrigin: true,
			pathRewrite: {
				"^/api": "/",
			},
		})
	);
};
