import web3 from './web3';
import ticket from './build/ticket/Ticket.json';

// method to connect to ticket-contract at a specific address
// using the interface(ABI) of the compiled contract and the address

export default address => {
  return new web3.eth.Contract(JSON.parse(ticket.interface), address);
};
