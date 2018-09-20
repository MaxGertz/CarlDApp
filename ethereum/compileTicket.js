const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

// compiles the ticket.sol contract and creates the ABI(application binary interface) of the contracts
// ABI enables to call functions and get data back
// also creates the bytecode of the contract to run on the EVM

const buildPath =  path.resolve(__dirname, 'build/ticket');

//removeSync deletes old builds from build -> only the newest build available
fs.removeSync(buildPath);

console.log('Start compiling contracts! This might take a second.');

const contractPath = path.resolve(__dirname, 'contracts', 'Ticket.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const output = solc.compile(source, 1).contracts;

//checks if directory exists, if not creates new directory
fs.ensureDirSync(buildPath);

console.log(output);

//write contract json's to build
for (let contract in output) {
    fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(':', '') + '.json'),
      output[contract]
    );
}
