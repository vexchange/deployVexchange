// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const ConnexDriver = require("@vechain/connex-driver");

const factory = require(config.pathToFactoryJson);
const router = require(config.pathToRouterJson);

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

deployFactory = async () => {

    const walletAddress = web3.eth.accounts.wallet[0].address
    try
    {
        console.log("\n==============================================================================\n");
        console.log("Attempting to deploy contract:", config.pathToFactoryJson);
        console.log("Using wallet address:", walletAddress);
        console.log("Using RPC:", web3.eth.currentProvider.RESTHost);

        const factoryContract = new web3.eth.Contract(factory.abi);
        const defaultSwapFee = 0;
        const defaultPlatformFee = 0;
        const defaultRecoverer = "0x0000000000000000000000000000000000000000";

        let transactionReceipt = null;
        await factoryContract.deploy({
            data: factory.bytecode,
            arguments: [defaultSwapFee, defaultPlatformFee, defaultRecoverer],
        })
        .send({ from: walletAddress })
        .on("receipt", (receipt) => {
            transactionReceipt = receipt;
        });        

        const factoryAddress = transactionReceipt.contractAddress
        
        console.log("Transaction Hash:", transactionReceipt.transactionHash);
        console.log("Contract Successfully deployed at address:", factoryAddress, "\n");

        console.log("\n==============================================================================\n");
        console.log("Attempting to deploy contract:", config.pathToRouterJson);

        const routerContract = new web3.eth.Contract(router.abi);
        const vvetAddress = config.vvetAddress;

        await routerContract.deploy({
            data: router.bytecode,
            arguments: [factoryAddress, vvetAddress],
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

deployFactory();
