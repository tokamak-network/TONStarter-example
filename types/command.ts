export type DeployContractStep =
  | "CreateProjectOnL1"
  | "SetTokenOnL2"
  | "SetUpVaults"
  | "Done"
  | "Error";
export type DeployStatus = "isLoading" | "error" | "";
export type VaultTypeOnCommand =
  | "Public"
  | "Liquidity"
  | "Ecosystem"
  | "Team"
  | "TONStarter";
export type VaultSchedule = {
  date: number;
  tokenAllocation: number;
}[];
export type VaultCommonParams = {
  tokenAllocation: number;
  //timestamp
  claimSchedule: VaultSchedule | undefined;
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
  claimStart: Date;
  totalRoundChoice: string;
  totalRoundInput: string;
  totalRound: number;
  roundIntervalUnit: "Monthly" | "Weekly";
  roundInterval: string;
  totalTokenAllocation: string;
  vaults: Vaults;
};

export type TableRow = {
  tokenAllocation_Public: string;
  tokenAllocation_InitialLiquidity: string;
  tokenAllocation_Ecosystem: string;
  tokenAllocation_Team: string;
  tokenAllocation_TONStarter: string;
};

export type TableResult = TableRow[];

export type TokenAllocationPerEachVault = {
  tokenAllocationPerEachVault: {
    state: boolean;
    result: TableResult;
  };
};
