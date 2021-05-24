// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const web3 = thorify(new Web3(), config.testnetRpcUrl);
const vvet = require(config.pathToVvetJson);

web3.eth.accounts.wallet.add(config.privateKey);

deployVvet = async() => {
    // This is the address associated with the private key
    const walletAddress = web3.eth.accounts.wallet[0].address
    const contract = new web3.eth.Contract(vvet.abi);

    console.log("Attempting to deploy contract:", vvet.contractName);
    console.log("Using wallet address:", walletAddress);

    try
    {
        let transactionReceipt = null;
        await contract.deploy({ data: vvet.bytecode })
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


deployVvet();
