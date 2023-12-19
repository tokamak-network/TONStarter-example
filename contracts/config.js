import { ethers } from "ethers";
import { addressManager } from "./scripts/common_func.js";

/**
 * @description this is default project value for scripts
 */
const projectInfo = {
  projectId: ethers.constants.Zero,
  tokenOwner: ourAddr,
  projectOwner: ourAddr,
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

export { projectInfo };
