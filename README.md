# Vexchange Deployer


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

The `.env` file has been added to `.gitignore` to prevent any committing and checking in by mistake.


## Deploying contracts

To deploy the vvet contract, run: 

`npm run deployvvet`



To deploy VexchangeV2Factory and router: 

`npm run deployFactory`



