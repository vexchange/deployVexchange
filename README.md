
# Vexchange Deployer

This repo contains all the scripts necessary to deploy the Vexchange smart contracts. 

Adapted from Kenneth's deployment scripts

## Install dependencies 

``` 
npm install 
```


## Configuration and private key

Set config in `config.js`, including all the necessary .json files to deploy, contract address of deployed contracts, RPC urls etc.

Place private key in `.env` file in the root directory under the variable 
`PRIVATE_KEY=0x000...abc`

The `.env` file has been added to `.gitignore` to prevent committing and checking in by mistake.



## Deploying contracts

Specify `mainnet` or `testnet` for each deployment. 

Currently the following scripts are provided: 

- Deploy vvet: 

```
npm run deployvvet -- testnet
```

- Deploy VexchangeV2Factory and router on the testnet: 

```
npm run deployFactory -- testnet
```

- Deploy V2 Migrator on the mainnet:

```
npm run deployMigrator -- mainnet
```


