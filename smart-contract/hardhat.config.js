require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};