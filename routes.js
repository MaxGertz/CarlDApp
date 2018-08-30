const routes = require('next-routes')();

// TODO: Add routes here

routes
	.add('signin')
	.add('signup')
	.add('/showticket/:id', 'showticket')
	.add({ name: 'Overview', pattern: '/', page: 'index' });

module.exports = routes;