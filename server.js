/*
const { createServer } = require('http');
const next = require('next');
const cookieParser = require('cookie-parser');

const app = next({
	dev: process.env.NODE_ENV !== 'production',
	conf: {
		webpack: config => {
			config.devtool = false;

			for (const r of config.module.rules) {
				if (r.loader === 'babel-loader') {
					r.options.sourceMaps = false;
				}
			}

			return config;
		}
	}
});



const routes = require('./routes');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
	createServer(handler).listen(3000, err => {
		if (err) throw err;
		console.log('Ready on localhost:3000');
	});
});
*/
const express = require('express');
const next = require('next');
const cookieParser = require('cookie-parser');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
	.then(() => {
		const server = express();

		server.use(cookieParser());

		server.get('/signin', (req, res) => {
			if (req.cookies.token) {
				res.redirect('/');
			} else {
				return app.render(req, res, '/signin', req.query);
			}
		});

		server.get('/signup', (req, res) => {
			if (req.cookies.token) {
				res.redirect('/');
			} else {
				return app.render(req, res, '/signup', req.query);
			}
		});

		server.get('*', (req, res) => {
			return handle(req, res);
		});

		server.listen(port, (err) => {
			if (err) throw err;
			console.log(`> Ready on http://localhost:${port}`);
		});
	})
	.catch((ex) => {
		console.error(ex.stack);
		process.exit(1);
	});