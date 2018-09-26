const routes = require('next-routes')();

routes
  .add('signin')
  .add('signup')
  .add({ name: 'showTicket', pattern: '/showticket/:id', page: 'showticket' })
  .add({ name: 'Overview', pattern: '/', page: 'index' })
  .add({ name: 'ContractInfo', pattern: '/info/ticket', page: 'info/ticket' })
  .add({ name: 'Settings', pattern: '/user/settings', page: 'user/settings' })
  .add({ name: 'addCarpark', pattern: '/carpark/addNew', page: 'carpark/addNew' })
  .add({ name: 'CarparkOverview', pattern: '/carpark/overview', page: 'carpark/overview' });

module.exports = routes;
