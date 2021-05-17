require("dotenv").config({ path: "./.env" })

module.exports = {
	privateKey: process.env.PRIVATE_KEY,
	mainnetRpcUrl: "http://mainnet02.vechain.fi.blockorder.net",
	testnetRpcUrl: "http://testnet02.vechain.fi.blockorder.net",
	v1FactoryAddress: "", // taken from output of getExchange() from Kenneth"s script
	v2RouterAddress: "", // actual address on testnet deployed using this script
	wvetAddress: "0x5aC5D3164b7A0444Ea6296033ebcCCA2b65Db625", // actual address on testnet deployed using this script
	pathToFactoryJson: "./data/VexchangeV2Factory.json",
	pathToRouterJson: "./data/VexchangeV2Router02.json",
	pathToMigratorJson: "./data/VexchangeV2Migrator.json",
	pathToWvetJson: "./data/WVET.json",
};
