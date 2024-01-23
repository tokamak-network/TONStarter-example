import { ethers } from "ethers";
import { addressManager } from "../constants/common_func.js";

/**
 * @description this is default project value for scripts
 */
let projectInfo = {
  projectId: null,
  tokenOwner: null,
  projectOwner: null,
  initialTotalSupply: ethers.utils.parseEther("100000"),
  tokenType: 0, // non-mintable
  projectName: "TokamakBakery",
  tokenName: "TokamakBakery",
  tokenSymbol: "TKB",
  l1Token: ethers.constants.AddressZero,
  l2Token: ethers.constants.AddressZero,
  l2Type: 0,
  addressManager,
};

const blockExplorer = {
  ethereum: "https://etherscan.io",
  sepolia: "https://goerli.etherscan.io",
  titan: "https://explorer.titan.tokamak.network",
  titanSepolia: "https://explorer.titan-goerli.tokamak.network",
};

export { projectInfo, blockExplorer };
