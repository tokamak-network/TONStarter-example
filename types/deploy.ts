import { BigNumber } from "ethers";
import { CLI_Answer, DeployContractStep } from "./command";

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
  l2Token: Hash | undefined;
};

export type Params = any;
export type DeployProject =
  | {
      state: boolean;
      result?: DeployedProjectInfo;
    }
  | DeploymentError;
export type Deployed = {
  state: boolean;
  result?: DeployedProjectInfo;
};

export interface I_StepListener {
  getParmas(CLI_Answer: CLI_Answer): Params;
  updateStep(step: DeployContractStep): void;
  deployProject(step: DeployContractStep): Promise<DeployProject>;
}

export class DeploymentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DeploymentError";
  }
}
