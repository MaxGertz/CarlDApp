import web3 from './web3';
import ticket from './build/Ticket.json';

export default (address) => {
	return new web3.eth.Contract(
		JSON.parse(ticket.interface),
		address
	)
};