// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const WVET = require(config.pathToWvetJson);

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

deployWvet = async() =>
{
    // This is the address associated with the private key
    const walletAddress = web3.eth.accounts.wallet[0].address
    const contract = new web3.eth.Contract(WVET.abi);

    console.log("Attempting to deploy contract:", config.pathToFactoryJson);
    console.log("Using wallet address:", walletAddress);
    console.log("Using RPC:", web3.eth.currentProvider.RESTHost);

    try
    {
        let transactionReceipt = null;
        await contract.deploy({ data: WVET.bytecode })
        .send({ from: walletAddress })
        .on("receipt", (receipt) => {
            transactionReceipt = receipt;
        });
        
        console.log("Transaction Hash:", transactionReceipt.transactionHash);
        console.log("Contract Successfully deployed at address:", transactionReceipt.contractAddress);

        console.log("\n+++++++++++++++++++++++++++++++++++++++++++++++++\n");
        console.log("Renouncing Mastership of the WVET contract");

        const SET_MASTER_SELECTOR = web3.eth.abi.encodeFunctionSignature("setMaster(address,address)");
        const wvetAddress = transactionReceipt.contractAddress;

        // This address is the same for both mainnet and testnet
        const PROTOTYPE_CONTRACT_ADDRESS = "0x000000000000000000000050726f746f74797065";

        const data = web3.eth.abi.encodeParameters(
           ["address", "address"],
           [wvetAddress, "0x0000000000000000000000000000000000000000"],
        ).slice(2); // slicing to get rid of the '0x' in the beginning

        await web3.eth.sendTransaction({
            to: PROTOTYPE_CONTRACT_ADDRESS,
            data: SET_MASTER_SELECTOR + data,
            from: walletAddress
        }).on("receipt", (receipt) => {
            console.log("Mastership successfully renounced, txid: ", receipt.transactionHash);
        });

    } 
    catch(error)
    {
        console.log("Deployment failed with:", error)
    }
}

deployWvet();
