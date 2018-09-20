import Web3 from 'web3';

// creating a web3 instance
// either uses the web3-instance of metamask or creates a instance by using infura

let web3;

// checks browser for web3 instance

if(typeof  window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // Metamask is running & we are in the browser
    web3 = new Web3(window.web3.currentProvider);

} else {
    // we are on the server OR metamask is not running
    const provider = new Web3.providers.HttpProvider(
			// using infura to access ethereum
        'https://rinkeby.infura.io/v3/d3453f84389146268f063f4bdb3ccae0'
    );

    web3 = new Web3(provider);
}

export default web3;
