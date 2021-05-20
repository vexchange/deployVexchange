// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const web3 = thorify(new Web3(), config.testnetRpcUrl);

const migrator = require(config.pathToMigratorJson);

web3.eth.accounts.wallet.add(config.privateKey);

deployMigrator = async() => {
	// This is the address associated with the private key
	const walletAddress = web3.eth.accounts.wallet[0].address

	const migratorContract = new web3.eth.Contract(migrator.abi);

	const v1FactoryAddress = config.v1FactoryAddress;
	const v2RouterAddress = config.v2RouterAddress;

	console.log("Attempting to deploy contract:", config.pathToMigratorJson);
	console.log("Using wallet address:", walletAddress);

	try {
		let transactionReceipt = null;
		const result = await migratorContract.deploy({ 
								data: migrator.bytecode,
								arguments: [v1FactoryAddress, v2RouterAddress]
							 })
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


deployMigrator();