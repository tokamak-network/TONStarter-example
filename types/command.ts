export type DeployContractStep = 1 | 2 | 3;
export type DeployStatus = "isLoading" | "error" | "";
export type VaultTypeOnCommand =
  | "Public"
  | "Liquidity"
  | "Ecosystem"
  | "Team"
  | "TONStarter";
export type VaultCommonParams = {
  tokenAllocation: number;
  //timestamp
  claimSchedule: number[] | undefined;
};
export type Vaults = { [key in VaultTypeOnCommand]: VaultCommonParams };
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
  totalRound: string;
  totalTokenAllocation: string;
  vaults: Vaults;
};

export type TokenAllocationPerEachVault = {
  tokenAllocationPerEachVault: {
    state: boolean;
    result: {
      tokenAllocation_Public: string;
      tokenAllocation_InitialLiquidity: string;
      tokenAllocation_Ecosystem: string;
      tokenAllocation_Team: string;
      tokenAllocation_TONStarter: string;
    }[];
  };
};
