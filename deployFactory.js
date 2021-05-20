// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const ConnexDriver = require('@vechain/connex-driver');

const web3 = thorify(new Web3(), config.testnetRpcUrl);
const factory = require(config.pathToFactoryJson);
const router = require(config.pathToRouterJson);

web3.eth.accounts.wallet.add(config.privateKey);

deployFactory = async () => {

	const walletAddress = web3.eth.accounts.wallet[0].address

	try{
		console.log("Attempting to deploy contract:", config.pathToFactoryJson);
		console.log("Using wallet address:", walletAddress);
		
		const factoryContract = new web3.eth.Contract(factory.abi);
		const defaultSwapFee = 0;
		const defaultPlatformFee = 0;
		const defaultRecoverer = '0x0000000000000000000000000000000000000000';

		let transactionReceipt = null;

		await factoryContract.deploy({
			data:factory.bytecode,
			arguments: [defaultSwapFee, defaultPlatformFee, defaultRecoverer]
		})
		.send({ from: walletAddress })
		.on('receipt', (receipt) => {
			transactionReceipt = receipt;
		});		

		const factoryAddress = transactionReceipt.contractAddress
	    
	    console.log("Transaction Hash:", transactionReceipt.transactionHash);
	    console.log("Contract Successfully deployed at address:", factoryAddress);

	    console.log("\n==============================================================================\n");

		console.log("Attempting to deploy contract:", config.pathToRouterJson);

	    const routerContract = new web3.eth.Contract(router.abi);
	    const vvetAddress = config.vvetAddress;

	    await routerContract.deploy({
			data: router.bytecode,
			arguments: [factoryAddress, vvetAddress]
		})
		.send({ from: walletAddress })
		.on('receipt', (receipt) => {
			transactionReceipt = receipt;
		});	

	    console.log("Transaction Hash:", transactionReceipt.transactionHash);
	    console.log("Contract Successfully deployed at address:", transactionReceipt.contractAddress);
	}

	catch(error) {
    	console.log(error)
  	} 
}

deployFactory();