var HDWalletProvider = require("truffle-hdwallet-provider");

import { infura_apikey, mnemonic_testnet, mnemonic_live } from './infura-config';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      gasPrice: 10000000000, // 10 GWEI
      network_id: "*" // Match any network id
    },
    // ropsten:  {
    //    network_id: 3,
    //    host: "localhost",
    //    port:  8545,
    //    gas:   2900000,
    //    gasPrice: 10000000000 // 10 GWEI
    // },

    ropsten:  {
        provider: new HDWalletProvider(mnemonic_testnet, "https://ropsten.infura.io/"+infura_apikey),
        network_id: 3,
       // network_id: 3,
       // host: "localhost",
       // port:  8545,
       gas:   2900000,
       gasPrice: 5000000000 // 10 GWEI
    },
    live:  {
       network_id: 1,
       host: "localhost",
       port:  8545,
       gas:   2900000,
       gasPrice: 2000000000 // 2 GWEI
    }
  }
};
