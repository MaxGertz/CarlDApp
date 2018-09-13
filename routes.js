const routes = require('next-routes')();

routes
	.add('signin')
	.add('signup')
	.add({ name : 'showTicket', pattern:'/showticket/:id', page: 'showticket' })
	.add({ name: 'Overview', pattern: '/', page: 'index' })
	.add({ name: 'Settings', pattern: '/user/settings', page: 'user/settings'});
module.exports = routes;
