import { BigNumber } from "ethers";

export type Hash = `0x${string}`;
export type DeployedProjectInfo = {
  tokenOwner: string;
  projectOwner: string;
  initialTotalSupply: BigNumber;
  addressManager: string;
  tokenType: number;
  tokenName: string;
  tokenSymbol: string;
  projectName: string;
  projectId: string | undefined;
  l1Token: Hash | undefined;
};
