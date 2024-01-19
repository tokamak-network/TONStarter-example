export type VaultTypesOnI =
  | "Public"
  | "Liquidity"
  | "Ecosystem"
  | "Team"
  | "TONStarter";

export type EssentialVault =
  | "PublicSale"
  | "InitialLiquidity"
  | "ProjectTosLP"
  | "TonTosLP"
  | "TonStaker"
  | "TosStaker"
  | "Vesting";

type ClaimSchedule = {
  claimRound: number;
  claimTime: number;
  claimTokenAllocation: number;
};

type VaultCommonProps = {
  adminAddress: string;
  vaultName: string;
  vaultAddress: string;
  vaultType: string;
  vaultTokenAllocation: number;
};
type StosTier = {
  allocatedToken: number;
  requiredStos: number;
};
type PublicVaultProps = {
  addressForReceiving: string;
  hardCap: number;
  publicRound1: number;
  publicRound1Allocation: number;
  publicRound1End: number;
  publicRound2: number;
  publicRound2Allocation: number;
  publicRound2End: number;
  snapshot: number;
  tokenAllocationForLiquidity: number;
  whitelist: number;
  whitelistEnd: number;
  claim: ClaimSchedule;
  stosTier: {
    oneTier: StosTier;
    twoTier: StosTier;
    threeTier: StosTier;
    fourTier: StosTier;
  };
};

type InitialLiquidityProps = {
  whitelist: number;
  whitelistEnd: number;
  tosPrice: number;
};

type TONStaker = {};

type PublicVault = VaultCommonProps & PublicVaultProps;
type InitialLiquidity = VaultCommonProps & InitialLiquidityProps;

export type ProjectInfo = {
  name: string;
  description: string;
  owner: string;
  projectTokenPrice: string;
  tokenAddress: string;
  tosPrice: string;
  totalTokenAllocation: string;
  vaults: PublicVault | InitialLiquidity;
};
