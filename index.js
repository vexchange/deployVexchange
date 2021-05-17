// ES5 style
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const _ = require('lodash');
const Framework = require('@vechain/connex-framework').Framework;
const ConnexDriver = require('@vechain/connex-driver');

const data = require("./data.json");
const factory = require("./factory.json");
const exchange = require("./exchange.json");

const web3 = thorify(new Web3(), "https://testnet.veblocks.net/");

web3.eth.accounts.wallet.add("0x6c17e54d9b425be4ce5ef3d47b0a2156a395bca41d74b33ab7b8abbd46f5c13a");

const { Driver, SimpleNet, SimpleWallet } = ConnexDriver;
const wallet = new SimpleWallet();

// exchange

// factory
const factoryAddress = '0x5a6BB37E97dB359840c6A89AFBE0B09674b74e92';
const exchangeAddress = '0x728737f4b5b5EEE74B629f966Dde6A01a8d0103C';

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

// deployExchange();
// deployFactory();
getExchange()
