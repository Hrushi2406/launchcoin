/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [
        "8d52d31582293e73ef81bc57f0c1ef9a6de5871594377cd3f2615684302a0c09",
        "P_KEY",
        "139d2fd74cef42a4fabe03e474a6555cb72f0e0c180159b2658c91b01fe1b806",
      ],
    },
  },

  solidity: {
    version: "0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "./src/artifacts",
  },
};
