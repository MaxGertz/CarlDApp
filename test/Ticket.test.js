const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const options = {
	gasLimit: 8000000
};
const provider = ganache.provider(options);

const web3 = new Web3(provider); //instantiation of web3(For test using ganache)
const compiledTicketFactory = require('../ethereum/build/TicketFactory.json');
const compiledTicket = require('../ethereum/build/Ticket.json');

let accounts;
let ticket;
let ticketAddress;
let ticketFactory;


beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	ticketFactory = await new web3.eth.Contract(JSON.parse(compiledTicketFactory.interface)).deploy({
		data: compiledTicketFactory.bytecode
	}).send({
		from: accounts[0],
		gas: '1000000'
	});

	await ticketFactory.methods.createTicket("E-UN-1", accounts[1], 5000).send({
		from: accounts[0],
		gas: '1000000'
	});

	[ticketAddress] = await ticketFactory.methods.getDeployedTickets().call();

	ticket = await new web3.eth.Contract(JSON.parse(compiledTicket.interface), ticketAddress);

});


describe('Tickets', () => {
	it('should deploy a TicketFactory and a Ticket', () => {
		assert.ok(ticketFactory.options.address);
		assert.ok(ticket.options.address);
	});

	it('should mark caller as owner', async () => {
		const owner = await ticket.methods.owner().call();

		assert.equal(accounts[0], owner);
	});

	it('should close tickets', async () => {
		await ticket.methods.closeTicket().send({
			from: accounts[0],
			gas: '1000000'
		});

		const finished = await ticket.methods.finished().call();

		assert(finished);
	});

	it('should send the parking fees to the carpark wallet', async () => {

		await ticket.methods.closeTicket().send({
			from: accounts[0],
			gas: '1000000'
		});

		await ticket.methods.payTicket().send({
			from: accounts[0],
			value: web3.utils.toWei('5', 'ether')
		});

		let balance = await web3.eth.getBalance(accounts[1]);
		balance = web3.utils.fromWei(balance, 'ether');
		balance = parseFloat(balance);

		console.log(balance);

		assert(balance > 102);
	});

	it('should take the time correctly', async () => {
		let time = await ticket.methods.startTime().call();
		let date = new Date().getTime();

		assert(time <= date);
	});
});