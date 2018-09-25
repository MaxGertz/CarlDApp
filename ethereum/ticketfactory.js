import web3 from './web3';
import ticketFactory from './build/ticket/TicketFactory.json';

// creates an instance of the ticketFactory
// address of the factory is hardcoded

const instance = new web3.eth.Contract(
  JSON.parse(ticketFactory.interface),
  '0x69Ea233835598Bd087Dc6244576DE0515f4f7dDb'
);

export default instance;
