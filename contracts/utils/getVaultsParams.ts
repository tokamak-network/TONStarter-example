import { ethers, BigNumber } from "ethers";

const formatAmount = (amount: number) => {
  return ethers.utils.parseUnits(String(amount), 18);
};

export const getPublicSaleParams = (params: {
  tier: Array<number>;
  percents: Array<number>;
  saleAmount: Array<number>;
  price: Array<number>;
  hardcapAmount: number;
  changeTOSPercent: number;
  times: Array<number>;
  claimCounts: number;
  firstClaimPercent: number;
  firstClaimTime: number;
  secondClaimTime: number;
  roundInterval: number;
  receiveAddress: string;
  vestingClaimCounts: number;
  vestingfirstClaimPercent: number;
  vestingClaimTime1: number;
  vestingClaimTime2: number;
  vestingRoundInterval: number;
  fee: number;
}) => {
  const {
    tier,
    percents,
    saleAmount,
    price,
    hardcapAmount,
    changeTOSPercent,
    times,
    claimCounts,
    firstClaimPercent,
    firstClaimTime,
    secondClaimTime,
    roundInterval,
    receiveAddress,
    vestingClaimCounts,
    vestingfirstClaimPercent,
    vestingClaimTime1,
    vestingClaimTime2,
    vestingRoundInterval,
    fee,
  } = params;
  let InitalParameterPublicSaleVault = {
    stosTier1: formatAmount(tier[0]),
    stosTier2: formatAmount(tier[1]),
    stosTier3: formatAmount(tier[2]),
    stosTier4: formatAmount(tier[3]),
    tier1Percents: formatAmount(percents[0]),
    tier2Percents: formatAmount(percents[1]),
    tier3Percents: formatAmount(percents[2]),
    tier4Percents: formatAmount(percents[3]),
    total1roundSaleAmount: formatAmount(saleAmount[0]),
    total2roundSaleAmount: formatAmount(saleAmount[1]),
    saleTokenPrice: formatAmount(price[0]),
    payTokenPrice: formatAmount(price[1]),
    hardcapAmount: formatAmount(hardcapAmount),
    changeTOSPercent: formatAmount(changeTOSPercent),
    startWhiteTime: formatAmount(times[0]),
    endWhiteTime: formatAmount(times[1]),
    start1roundTime: formatAmount(times[2]),
    end1roundTime: formatAmount(times[3]),
    snapshotTime: formatAmount(times[4]),
    start2roundTime: formatAmount(times[5]),
    end2roundTime: formatAmount(times[6]),
  };

  let InitalParameterPublicSaleClaim = {
    claimCounts: formatAmount(claimCounts),
    firstClaimPercent: formatAmount(firstClaimPercent),
    firstClaimTime: formatAmount(firstClaimTime),
    secondClaimTime: formatAmount(secondClaimTime),
    roundInterval: formatAmount(roundInterval),
  };
  let InitialParameterVestingClaim = {
    receiveAddress: receiveAddress,
    totalClaimCount: formatAmount(vestingClaimCounts),
    firstClaimPercent: formatAmount(vestingfirstClaimPercent),
    firstClaimTime: formatAmount(vestingClaimTime1),
    secondClaimTime: formatAmount(vestingClaimTime2),
    roundIntervalTime: formatAmount(vestingRoundInterval),
    fee: fee,
  };

  return {
    vaultParams: InitalParameterPublicSaleVault,
    claimParams: InitalParameterPublicSaleClaim,
    vestingParams: InitialParameterVestingClaim,
  };
};

export const getInitialLiquidityParams = (
  totalAmount: BigNumber,
  tosPrice: number,
  tokenPrice: number,
  price: string,
  startTime: number,
  fee: number
) => {
  return {
    totalAllocatedAmount: totalAmount,
    tosPrice: formatAmount(tosPrice),
    tokenPrice: formatAmount(tokenPrice),
    initSqrtPrice: ethers.BigNumber.from(price),
    startTime: startTime,
    fee: fee,
  };
};

export const getLpRewardParams = (
  claimer: string,
  token0: string,
  token1: string,
  fee: number,
  totalAmount: number,
  totalClaimCount: number,
  firstClaimAmount: number,
  firstClaimTime: number,
  secondClaimTime: number,
  roundIntervalTime: number
) => {
  return {
    poolParams: {
      token0: token0,
      token1: token1,
      fee: fee,
    },
    params: {
      claimer: claimer,
      totalAllocatedAmount: formatAmount(totalAmount),
      totalClaimCount: formatAmount(totalClaimCount),
      firstClaimAmount: formatAmount(firstClaimAmount),
      firstClaimTime: firstClaimTime,
      secondClaimTime: secondClaimTime,
      roundIntervalTime: roundIntervalTime,
    },
  };
};

export const getTosAirdropParams = (
  claimer: string,
  totalAmount: number,
  totalClaimCount: number,
  firstClaimAmount: number,
  firstClaimTime: number,
  secondClaimTime: number,
  roundIntervalTime: number
) => {
  return {
    claimer: claimer,
    totalAllocatedAmount: formatAmount(totalAmount),
    totalClaimCount: formatAmount(totalClaimCount),
    firstClaimAmount: formatAmount(firstClaimAmount),
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundIntervalTime: roundIntervalTime,
  };
};

export const getTonAirdropParams = (
  claimer: string,
  totalAmount: number,
  totalClaimCount: number,
  firstClaimAmount: number,
  firstClaimTime: number,
  secondClaimTime: number,
  roundIntervalTime: number
) => {
  return {
    claimer: claimer,
    totalAllocatedAmount: formatAmount(totalAmount),
    totalClaimCount: formatAmount(totalClaimCount),
    firstClaimAmount: formatAmount(firstClaimAmount),
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundIntervalTime: roundIntervalTime,
  };
};

export const getScheduleParams = (
  name: string,
  claimer: string,
  totalAmount: BigNumber,
  totalClaimCount: number,
  firstClaimAmount: BigNumber,
  firstClaimTime: number,
  secondClaimTime: number,
  roundIntervalTime: number
) => {
  return {
    vaultName: name,
    params: {
      claimer: claimer,
      totalAllocatedAmount: totalAmount,
      totalClaimCount: formatAmount(totalClaimCount),
      firstClaimAmount: firstClaimAmount,
      firstClaimTime: firstClaimTime,
      secondClaimTime: secondClaimTime,
      roundIntervalTime: roundIntervalTime,
    },
  };
};

export const getNonScheduleParams = (
  name: string,
  claimer: string,
  totalAmount: BigNumber
) => {
  return {
    vaultName: name,
    claimer: claimer,
    totalAllocatedAmount: totalAmount,
  };
};
