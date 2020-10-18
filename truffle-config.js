const Web3 = require('web3');

module.exports = {
  networks: {
    bsNetwork: {
      host: "127.0.0.1",
      port: 7545,
      network_id: 5777,
      websockets: true,
      provider: new Web3.providers.HttpProvider("http://127.0.0.1:7545")
    }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    timeout: 100000,
    useColors: true
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.0",
      settings: {
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "istanbul"
      }
    },
  },
};
