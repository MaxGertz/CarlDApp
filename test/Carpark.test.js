const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
require('events').EventEmitter.defaultMaxListeners = 0;
const options = {
	gasLimit: 8000000
};
const provider = ganache.provider(options);

const web3 = new Web3(provider); //instantiation of web3(For test using ganache)
const compiledCarparkFactory = require('../ethereum/build/carpark/CarparkFactory.json');
const compiledCarpark = require('../ethereum/build/carpark/Carpark.json');

let accounts;
let carpark;
let carparkAddress;
let carparkFactory;

beforeEach(async () => {
	accounts = await web3.eth.getAccounts();

	carparkFactory = await new web3.eth.Contract(JSON.parse(compiledCarparkFactory.interface))
		.deploy({
			data: compiledCarparkFactory.bytecode
		}).send({
			from: accounts[0],
			gas: '3000000'
		});

	await carparkFactory.methods.deployCarpark("TestCarpark", "50000", 123).send({
		from: accounts[0],
		gas: '3000000'
	});

	[carparkAddress] = await carparkFactory.methods.getDeployedCarparks().call();

	carpark = await new web3.eth.Contract(JSON.parse(compiledCarpark.interface), carparkAddress);

});

describe('Carparks', () => {
	it('should deploy a CarparkFactory and a Carpark', () => {
		assert.ok(carparkFactory.options.address);
		assert.ok(carpark.options.address);
	});

	it('should mark caller as carpark owner', async () => {
		const owner = await carpark.methods.owner().call();

		assert.equal(accounts[0], owner);
	});

	it('should be able to change cost per hour', async () => {
		const newCost = '123';
		await carpark.methods.changeCost(newCost).send({
			from: accounts[0],
			gas: '1000000'
		});
		const changedCost = await carpark.methods.costPerHour().call();

		assert.equal(newCost, changedCost);
	});

	it('should be able to return contract balance', async () => {
		const balance = await carpark.methods.getValue().call();

		assert.ok(balance);
	});
})