import web3 from './web3';
import ticketFactory from './build/TicketFactory.json';

// creates an instance of the ticketFactory
// address of the factory is hardcoded

const instance = new web3.eth.Contract(
	JSON.parse(ticketFactory.interface),
	'0x079ad22fa89218cdd1cf8b5847a495eb030612f7');

export default instance;
