# Vexchange Deployer

This repo contains all the scripts necessary to deploy the Vexchange smart contract codes.

Adapted from Kenneth's deployment scripts

## Install dependencies 

``` 
npm install 
```

or 

```
yarn install
```


## Configuration and private key

Set config in: `config.js`, including all the necessary .json files to deploy


Place private key in `.env` file in the root directory under the variable 
`PRIVATE_KEY=0x000...abc`

The `.env` file has been added to `.gitignore` to prevent committing and checking in by mistake.


## Deploying contracts

Currently the following scripts are provided: 

- to deploy vvet: 

`npm run deployvvet`


- to deploy VexchangeV2Factory and router: 

`npm run deployFactory`




