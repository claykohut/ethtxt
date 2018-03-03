var HDWalletProvider = require("truffle-hdwallet-provider");

const config = require('./infura-config');
const { infura_apikey, mnemonic_testnet, mnemonic_live } = config;

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
    ropsten:  {
      provider: new HDWalletProvider(mnemonic_testnet, "https://ropsten.infura.io/"+infura_apikey),
      network_id: 3,
      gas: 2900000,
      gasPrice: 10000000000 // 10 GWEI
    },
    live:  {
       provider: new HDWalletProvider(mnemonic_live, "https://mainnet.infura.io/"+infura_apikey),
       network_id: 1,
       gas:   2500000,
       gasPrice: 3000000000 // 3 GWEI
    }
  }
};
