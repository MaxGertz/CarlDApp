const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/TicketFactory.json');

// deploys the ticket contract to the ethereum network

const provider = new HDWalletProvider(
  // MetaMask-Account Words
  '',
  // personal Infuralink -> Contract is deployed by Infura node/api
  ''
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: '0x' + compiledFactory.bytecode
    })
    .send({
      gas: '1000000',
      from: accounts[0]
    });

  // returning the address of the newly deployed factory -> needs to be saved and copied to ticketFactory.js
  console.log('Contract deployed to ', result.options.address);
};

deploy();
