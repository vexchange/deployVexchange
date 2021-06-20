require("dotenv").config({ path: "./.env" })

module.exports = {
	privateKey: process.env.PRIVATE_KEY,
	mainnetRpcUrl: "https://mainnet.veblocks.net/",
	testnetRpcUrl: "https://testnet.veblocks.net/",
	v1FactoryAddress: "0x5137a57bab88e1e9fa3162188401c76958bda0ce", // taken from output of getExchange() from Kenneth"s script
	v2RouterAddress: "0xc665549b98408cdfd8d61c08d1571fc54471d4b7", // actual address on testnet deployed using this script
	vvetAddress: "0xa142724bc5ebc3238a3d1ca213edfa5f047f80d6", // actual address on testnet deployed using this script
	pathToFactoryJson: "./data/VexchangeV2Factory.json",
	pathToRouterJson: "./data/VexchangeV2Router02.json",
	pathToMigratorJson: "./data/VexchangeV2Migrator.json",
	pathToVvetJson: "./data/VVET9.json",
};
