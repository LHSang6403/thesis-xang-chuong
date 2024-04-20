import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.12",
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
  typechain: {
    outDir: "./app/typechain",
  },
};

export default config;
