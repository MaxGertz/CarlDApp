import web3 from './web3';
import carparkFactory from './build/carpark/CarparkFactory.json';

const instance = new web3.eth.Contract(
	JSON.parse(carparkFactory.interface),
	'0xb159fd35fb0798C460769C43386E6350D8f06f9f');

export default instance;
