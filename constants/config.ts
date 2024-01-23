import { ethers } from "ethers";
import { addressManager } from "../contracts/scripts/common_func";

const blockExplorer = {
  ethereum: "https://etherscan.io",
  sepolia: "https://goerli.etherscan.io",
  titan: "https://explorer.titan.tokamak.network",
  titanSepolia: "https://explorer.titan-goerli.tokamak.network",
};

export { blockExplorer };
