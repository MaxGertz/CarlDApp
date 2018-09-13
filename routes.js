const routes = require('next-routes')();

// TODO: Add routes here

routes
	.add('signin')
	.add('signup')
	.add({ name : 'showTicket', pattern:'/showticket/:id', page: 'showticket' })
	.add({ name: 'Overview', pattern: '/', page: 'index' });	
module.exports = routes;
