const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/TicketFactory.json');

const provider = new HDWalletProvider(
    // MetaMask-Account Words
    'mind issue jungle trade pitch hurry sword garment north box clap price',
    // personal Infuralink -> Contract is deployed by Infura node/api
    'https://rinkeby.infura.io/v3/d3453f84389146268f063f4bdb3ccae0'
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', accounts[0]);

    const  result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({
            data: '0x' + compiledFactory.bytecode
        })
        .send({
            gas: '1000000', from: accounts[0]
        });

    console.log('Contract deployed to ', result.options.address);
};

deploy();
