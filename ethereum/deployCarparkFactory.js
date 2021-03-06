const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/carpark/CarparkFactory.json');

// deploys the carpark contract to the ethereum network

const provider = new HDWalletProvider(
  // MetaMask-Account Words -> wallet that is used to deploy the contract
  '',
  // personal Infuralink -> Contract is deployed by Infura node/api
  // https://infura.io/
  
  // add infura access key here
  ''
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: '0x' + compiledFactory.bytecode // Ox needs to be added because of the truffle-hdwallet-provider
    })
    .send({
      gas: '3000000',
      from: accounts[0]
    });

  // returning the address of the newly deployed factory -> needs to be saved and copied to carparkFactory.js
  console.log('Contract deployed to ', result.options.address);
};

deploy();
