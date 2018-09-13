import web3 from './web3';
import carparkFactory from './build/carpark/CarparkFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(carparkFactory.interface),
	'0xb31c8e7d92bA66BC2eFb623E1015688FB467e5FC');

export default instance;
