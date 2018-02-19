module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    ropsten:  {
       network_id: 3,
       host: "localhost",
       port:  8545,
       gas:   2900000
    }
  }
};
