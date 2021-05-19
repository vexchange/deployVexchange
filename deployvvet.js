// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
// const _ = require('lodash');
// const Framework = require('@vechain/connex-framework').Framework;
const ConnexDriver = require('@vechain/connex-driver');

const web3 = thorify(new Web3(), config.testnetRpcUrl);

const vvet = require(config.pathToVvetJson);

// const data = require(config.pathToDataJson);
// const factory = require(config.pathToFactoryJson);
// const exchange = require(config.pathToExchangeJson);


// const { Driver, SimpleNet, SimpleWallet } = ConnexDriver;
// const wallet = new SimpleWallet();

// factory
// const factoryAddress = config.factoryAddress;
// const exchangeAddress = config.exchangeAddress;
const contract = new web3.eth.Contract(vvet.abi);

web3.eth.accounts.wallet.add(config.privateKey);

deployVvet = async() => {
	// This is the address associated with the private key
	const walletAddress = web3.eth.accounts.wallet[0].address
	let transactionReceipt = null;

	console.log("Attempting to deploy contract:", vvet.contractName);
	console.log("Using wallet address:", walletAddress);

	try {
		const result = await contract.deploy({ data: vvet.bytecode })
								.send({ from: walletAddress })
								.on('receipt', (receipt) => {
									transactionReceipt = receipt;
								});
	    
	    console.log("Transaction Hash:", transactionReceipt.transactionHash);
	    console.log("Contract Successfully deployed at address:", transactionReceipt.contractAddress);
	} 
	catch(error) {
		console.log("Deployment failed with:", error)
	}
}


deployVvet();