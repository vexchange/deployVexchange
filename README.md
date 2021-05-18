# vex-deployer


## Install dependencies 

``` 
npm install 
```

or 

```
yarn install haha
```


Set config in: `config.js`, including all the necessary .json files to deploy


Place private key in `.env` file in the root directory under the variable 
PRIVATE_KEY=0x000...

The .env file is already added to .gitignore to prevent any committing and pushing in by mistake.

To deploy the vvet contract, run: 

`npm run deployvvet`



To deploy VexchangeV2Factory and router: 

`npm run deployFactory`



