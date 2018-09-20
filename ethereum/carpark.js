import web3 from './web3';
import carpark from './build/carpark/Carpark.json';

// method to connect to carpark-contract at a specific address
// using the interface(ABI) of the compiled contract and the address

export default (address) => {
	return new web3.eth.Contract(
		JSON.parse(carpark.interface),
		address
	)
};
