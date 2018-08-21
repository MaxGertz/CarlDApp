const routes = require('next-routes')();

// TODO: Add routes here

routes
	.add('/overview/user/:id', 'overview/user');

module.exports = routes;
