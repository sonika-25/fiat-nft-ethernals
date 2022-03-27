const path = require ('path');
const { TruffleProvider } = require('@harmony-js/core');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
require("dotenv").config();
const { privateKey, infuraKey, alchemyKey } = process.env;
let hdWalletProvider;
const setupWallet = (url) => {
    if (!hdWalletProvider) {
        hdWalletProvider = new HDWalletProvider(
            privateKey,
            url,
            0,
            1,
	      )
        hdWalletProvider.engine.addProvider(new NonceTrackerSubprovider())
    }
    return hdWalletProvider
}

// const infuraKey = "fj4zzjll3k.....";
//
// const fs = require('fs');
// const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {

  contracts_build_directory: path.join(__dirname, "client/src/abis"),
  networks: {

     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },
     mumbai: {
        provider: () =>
        new HDWalletProvider(
          privateKey,
          `https://polygon-mumbai.g.alchemy.com/v2/${alchemyKey}`
        ),
        network_id: 80001

    },
     rinkeby : {
       provider : ()=>
         new HDWalletProvider (
           privateKey,
           `https://rinkeby.infura.io/v3/${infuraKey}`,
         ),
         network_id: 4,
         skipDryRun: true,

     },



  },

  mocha: {
  },

  compilers: {
    solc: {
       version: "^0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
         optimizer: {
          enabled: true,
          runs: 100
        },
      //  evmVersion: "byzantium"
       }
    }
  },

  db: {
    enabled: false
  }
};
