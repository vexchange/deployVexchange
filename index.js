const { config, thorify, web3, factoryAddress, exchangeAddress, 
         Framework, Driver, data } = require( "./utils.js");

const deployExchange = async () => {
  const contract = new web3.eth.Contract(exchange);

  try {
    const test = await contract.deploy({
      data: data.exchange, 
      arguments: []
    }).send({
      from: '0x57e977Ff64FDD6b352FE0adA9D7a2f759F2cAb4a',
    });

    console.log(test)
  } catch(error) {
    console.log(error)
  }
};

const deployFactory = async () => {
  const contract = new web3.eth.Contract(factory);

  try {
    const test = await contract.deploy({
      data: data.factory, 
      arguments: [exchangeAddress]
    }).send({
      from: '0x57e977Ff64FDD6b352FE0adA9D7a2f759F2cAb4a',
    });

    console.log(test)
  } catch(error) {
    console.log(error)
  }
};


const getExchange = async () => {
  const driver = await Driver.connect(new SimpleNet('https://testnet.veblocks.net'), wallet);
  const connex = new Framework(driver);

  const getExchangeABI = _.find(factory, { name: 'getExchange' });
  const method = connex.thor.account(factoryAddress).method(getExchangeABI);

  method.call('0x7995Be4767bEF3DAEc7dd9C840ba72FFB30E4b50').then(data => {
    console.log(data);
  });
};

module.exports = {
  deployExchange,
  deployFactory,
  getExchange
};

// deployExchange();
// deployFactory();
// getExchange()
