const {
    factoryAddress,
    Framework,
    Driver
} = require( "./utils.js");

const getExchange = async () => {
    const driver = await Driver.connect(new SimpleNet("https://testnet.veblocks.net"), wallet);
    const connex = new Framework(driver);

    const getExchangeABI = _.find(factory, { name: "getExchange" });
    const method = connex.thor.account(factoryAddress).method(getExchangeABI);

    method.call("0x7995Be4767bEF3DAEc7dd9C840ba72FFB30E4b50").then(data =>
    {
        console.log(data);
    });
};

