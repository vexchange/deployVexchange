// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");

const migrator = require(config.pathToMigratorJson);

let rpcUrl = null;
if (process.argv.length < 3) 
{
    console.error("Please specify network, either mainnet or testnet");
    process.exit(1);
} 
else
{
    if (process.argv[2] == "mainnet") rpcUrl = config.mainnetRpcUrl;
    else if (process.argv[2] == "testnet") rpcUrl = config.testnetRpcUrl;
    else {
        console.error("Invalid network specified");
        process.exit(1);
    }
}

const web3 = thorify(new Web3(), rpcUrl);

web3.eth.accounts.wallet.add(config.privateKey);

deployMigrator = async() =>
{
    // This is the address associated with the private key
    const walletAddress = web3.eth.accounts.wallet[0].address

    const migratorContract = new web3.eth.Contract(migrator.abi);

    const v1FactoryAddress = config.v1FactoryAddress;
    const v2RouterAddress = config.v2RouterAddress;

    console.log("Attempting to deploy contract:", config.pathToMigratorJson);
    console.log("Using wallet address:", walletAddress);
    console.log("Using RPC:", web3.eth.currentProvider.RESTHost);

    try
    {
        let transactionReceipt = null;
        await migratorContract.deploy({ 
            data: migrator.bytecode,
            arguments: [v1FactoryAddress, v2RouterAddress]
        })
        .send({ from: walletAddress })
        .on("receipt", (receipt) => {
            transactionReceipt = receipt;
        });

        console.log("Transaction Hash:", transactionReceipt.transactionHash);
        console.log("Contract Successfully deployed at address:", transactionReceipt.contractAddress);
    } 
    catch(error)
    {
        console.log("Deployment failed with:", error)
    }
}


deployMigrator();
