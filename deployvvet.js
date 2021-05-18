const { config, thorify, web3, vvet, factoryAddress, exchangeAddress, 
         Framework, Driver, data } = require( "./utils.js");

const contract = new web3.eth.Contract(vvet);


const deployVvet = async() => {
	try {
	    const test = await contract.deploy({
	      data: data.factory, // We need a vvet data? 
	      // arguments: [exchangeAddress]
	    }).send({
	      from: '0x57e977Ff64FDD6b352FE0adA9D7a2f759F2cAb4a',
	    });
	    console.log(test)
	} 
	catch(error) {
		console.log(error)
	}
}


deployVvet();