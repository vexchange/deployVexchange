require("dotenv").config({ path: "./.env" })

module.exports = {
	mainnetRpcUrl: '',
	testnetRpcUrl: 'https://testnet.veblocks.net/',
	privateKey: process.env.PRIVATE_KEY,
	// factoryAddress: '0x5a6BB37E97dB359840c6A89AFBE0B09674b74e92',
	// exchangeAddress: '0x728737f4b5b5EEE74B629f966Dde6A01a8d0103C',
	vvetAddress: '0xa142724bc5ebc3238a3d1ca213edfa5f047f80d6',
	pathToFactoryJson: './data/UniswapV2Factory.json',
	pathToRouterJson: './data/UniswapV2Router02.json',
	pathToExchangeJson: './exchange.json',
	pathToVvetJson: './data/VVET9.json'
};