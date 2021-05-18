// ES5 style
const config = require("./config");
const thorify = require("thorify").thorify;
const Web3 = require("web3");
const _ = require('lodash');
const Framework = require('@vechain/connex-framework').Framework;
const ConnexDriver = require('@vechain/connex-driver');

const data = require(config.pathToDataJson);
const vvet = require(config.pathToVvetJson);
const factory = require(config.pathToFactoryJson);
const exchange = require(config.pathToExchangeJson);

console.log(config);

const web3 = thorify(new Web3(), config.testnetRpcUrl);

web3.eth.accounts.wallet.add(config.privateKey);

const { Driver, SimpleNet, SimpleWallet } = ConnexDriver;
const wallet = new SimpleWallet();

// factory
const factoryAddress = config.factoryAddress;
const exchangeAddress = config.exchangeAddress;

