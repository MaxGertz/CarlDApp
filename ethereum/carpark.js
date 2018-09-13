import web3 from './web3';
import carpark from './build/carpark/Carpark.json';

export default (address) => {
	return new web3.eth.Contract(
		JSON.parse(carpark.interface),
		address
	)
};
