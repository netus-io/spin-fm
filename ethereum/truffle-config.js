var HDWalletProvider = require('truffle-hdwallet-provider')
module.exports = {
  networks: {
    poa: {
      provider: function() {
        return new HDWalletProvider('BCA93B325843D996FF4E3F68A66DB374BDCA103E0B7E9374AB00C0BEFD75A99E', "https://sokol.poa.network");
      },
      network_id: '*',
    }
  }
  };
