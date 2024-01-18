export type DeployContractStep = 1 | 2 | 3;
export type DeployStatus = "isLoading" | "error" | "";
export type CLI_Answer = {
  projectName: string;
  tokenName: string;
  tokenSymbol: string;
  initialTotalSupply: string;
  adminAddress: string;
  round1Start: Date;
  round1End: Date;
  round2Start: Date;
  round2End: Date;
  tokenAllocation: string;
};
