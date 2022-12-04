const defaultChainId = 31337;

const supportedNetworks = {
  // npx hardhat node
  // npx hardhat run scripts/deployForHardhat.js --network localhost
  // Copy console address
  31337: {
    name: "Hardhat",
    tokenSymbol: "ETH",
    rpcURL: "http://localhost:8545",
    address: "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
  },
  // npx hardhat run scripts/deploy.js --network mumbai
  // Returned address is wrong. https://github.com/nomiclabs/hardhat/issues/2162.
  // Copy address from polygonscan
  80001: {
    name: "Polygon Mumbai Testnet",
    tokenSymbol: "MATIC",
    rpcURL: "https://rpc-mumbai.maticvigil.com",
    address: "0xa1bd46D82e6231C58B7B3dC77DB42AA5B313D439",
  },

  1313161555: {
    name: "Aurora Testnet",
    tokenSymbol: "ETH",
    rpcURL: "https://testnet.aurora.dev",
    address: "0xe604B496F10CBdAA68412Ea7e015630C6D6C3c49",
  },
};

export { defaultChainId, supportedNetworks };
