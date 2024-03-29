const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
	app.use(
		'/api',
		createProxyMiddleware({
			target: 'http://localhost:3000',
			changeOrigin: true,
		}),
	);

	app.use(
		'/locales',
		createProxyMiddleware({
			target: 'http://localhost:3000',
			changeOrigin: true,
		}),
	);

	app.use(
		'/graphql',
		createProxyMiddleware({
			target: 'http://localhost:3000',
			changeOrigin: true,
		}),
	);
};
