const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const routes = require('./routes');
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handler = routes.getRequestHandler(app, ({ req, res, route, query }) => {
	app.render(req, res, route.page, query)
});

app.prepare()
	.then(() => {
		const server = express();
		server.use(cookieParser());

		server.use(handler).listen(port, (err) => {
			if (err) throw err;
			console.log(`Ready on http://localhost:${port}`);
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});
