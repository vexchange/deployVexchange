require("dotenv").config({ path: "./.env" })

module.exports = {
	factoryJson: null,
	mainnetRpcUrl: '',
	testnetRpcUrl: 'https://testnet.veblocks.net/',
	privateKey: process.env.PRIVATE_KEY,
	factoryAddress: '0x5a6BB37E97dB359840c6A89AFBE0B09674b74e92',
	exchangeAddress: '0x728737f4b5b5EEE74B629f966Dde6A01a8d0103C',
	pathToFactoryJson: './factory.json',
	pathToRouterJson: '',
	pathToExchangeJson: './exchange.json',
	pathToDataJson: './data.json',
	pathToVvetJson: ''
};