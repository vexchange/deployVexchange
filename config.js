require("dotenv").config({ path: "./.env" })

module.exports = {
	privateKey: process.env.PRIVATE_KEY,
	mainnetRpcUrl: "https://mainnet.veblocks.net/",
	testnetRpcUrl: "https://testnet.veblocks.net/",
	v1FactoryAddress: "0x5137a57bab88e1e9fa3162188401c76958bda0ce", // taken from output of getExchange() from Kenneth"s script
	v2RouterAddress: "0x7828381a802883d5b5866fca6162811e92e0f131", // actual address on testnet deployed using this script
	vvetAddress: "0xa142724bc5ebc3238a3d1ca213edfa5f047f80d6", // actual address on testnet deployed using this script
	pathToFactoryJson: "./data/UniswapV2Factory.json",
	pathToRouterJson: "./data/UniswapV2Router02.json",
	pathToMigratorJson: "./data/UniswapV2Migrator.json",
	pathToVvetJson: "./data/VVET9.json",
};
