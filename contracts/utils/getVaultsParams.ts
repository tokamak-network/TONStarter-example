import { ethers, BigNumber } from "ethers";
import { CLI_Answer, Vaults } from "../../types";
import { integerDivision } from "./number";
import { convertToTimestamp, getRoundInterval } from "../../utils/date";

const formatAmount = (amount: number) => {
  return ethers.utils.parseUnits(String(amount), 18).toString();
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
    tier1Percents: percents[0],
    tier2Percents: percents[1],
    tier3Percents: percents[2],
    tier4Percents: percents[3],
    total1roundSaleAmount: formatAmount(saleAmount[0]),
    total2roundSaleAmount: formatAmount(saleAmount[1]),
    saleTokenPrice: formatAmount(price[0]),
    payTokenPrice: formatAmount(price[1]),
    hardcapAmount: formatAmount(hardcapAmount),
    changeTOSPercent,
    startWhiteTime: times[0],
    endWhiteTime: times[1],
    start1roundTime: times[2],
    end1roundTime: times[3],
    snapshotTime: times[4],
    start2roundTime: times[5],
    end2roundTime: times[6],
  };

  let InitalParameterPublicSaleClaim = {
    claimCounts: claimCounts,
    firstClaimPercent: firstClaimPercent,
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundInterval: roundInterval,
  };
  let InitialParameterVestingClaim = {
    receiveAddress,
    totalClaimCount: vestingClaimCounts,
    firstClaimPercent: vestingfirstClaimPercent,
    firstClaimTime: vestingClaimTime1,
    secondClaimTime: vestingClaimTime2,
    roundIntervalTime: vestingRoundInterval,
    fee: fee,
  };

  return {
    vaultParams: InitalParameterPublicSaleVault,
    claimParams: InitalParameterPublicSaleClaim,
    vestingParams: InitialParameterVestingClaim,
  };
};

export const getInitialLiquidityParams = (
  totalAmount: number,
  tosPrice: number,
  tokenPrice: number,
  price: string,
  startTime: number,
  fee: number
) => {
  return {
    totalAllocatedAmount: formatAmount(totalAmount),
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
      totalClaimCount,
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
    totalClaimCount,
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
    totalClaimCount,
    firstClaimAmount: formatAmount(firstClaimAmount),
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundIntervalTime: roundIntervalTime,
  };
};

export const getScheduleParams = (
  name: string,
  claimer: string,
  totalAmount: number,
  totalClaimCount: number,
  firstClaimAmount: number,
  firstClaimTime: number,
  secondClaimTime: number,
  roundIntervalTime: number
) => {
  return {
    vaultName: name,
    params: {
      claimer: claimer,
      totalAllocatedAmount: formatAmount(totalAmount),
      totalClaimCount,
      firstClaimAmount: formatAmount(firstClaimAmount),
      firstClaimTime,
      secondClaimTime,
      roundIntervalTime,
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

export const getVaultTokenAllocation = (answers: CLI_Answer) => {
  const saleAmount = answers.vaults.Public.tokenAllocation;
  const initialLiquidityAmount = answers.vaults.Liquidity.tokenAllocation;

  const ecosystemAmount = integerDivision(
    answers.vaults.Ecosystem.tokenAllocation,
    1
  );

  const rewardProjectTosPoolAmount =
    ecosystemAmount.allocation + ecosystemAmount.remainder;

  // const teamAmount = integerDivision(answers.vaults.Team.tokenAllocation, 1);

  //TON Staker, TOS Staker, TON-TOS LP
  const tonstarterAmount = integerDivision(
    answers.vaults.TONStarter.tokenAllocation,
    3
  );

  const rewardTonTosPoolAmount =
    tonstarterAmount.allocation + tonstarterAmount.remainder;
  const airdropStosAmount = tonstarterAmount.allocation;
  const airdropTonAmount = tonstarterAmount.allocation;

  return {
    saleAmount,
    initialLiquidityAmount,
    rewardProjectTosPoolAmount,
    // teamAmount: teamAmount.allocation,
    rewardTonTosPoolAmount,
    airdropStosAmount,
    airdropTonAmount,
  };
};

export const getSaleSchedule = (answers: CLI_Answer) => {
  const snapshotTime = convertToTimestamp(answers.snapshot);
  const whitelistStartTime = convertToTimestamp(answers.whitelistStart);
  const whitelistEndTime = convertToTimestamp(answers.whitelistEnd);
  const round1StartTime = convertToTimestamp(answers.round1Start);
  const round1EndTime = convertToTimestamp(answers.round1End);
  const round2StartTime = convertToTimestamp(answers.round2Start);
  const round2EndTime = convertToTimestamp(answers.round2End);
  const claimStartTime = convertToTimestamp(answers.claimStart);

  return {
    snapshotTime,
    whitelistStartTime,
    whitelistEndTime,
    round1StartTime,
    round1EndTime,
    round2StartTime,
    round2EndTime,
    claimStartTime,
  };
};

export const getParamsAfterSale = (params: {
  answers: CLI_Answer;
  claimStartTime: number;
}) => {
  const { answers, claimStartTime } = params;
  const roundNum = Number(
    answers.roundInterval.replace("Month", "").replace("Week", "")
  );
  const firstClaimTime = claimStartTime;
  const totalClaimCount = Number(answers.totalRoundChoice);
  const roundIntervalTime = getRoundInterval(
    roundNum,
    answers.roundIntervalUnit
  );
  const secondClaimTime = firstClaimTime + roundIntervalTime;
  const firstVesingClaimTime = secondClaimTime;
  const secondVesingClaimTime = firstVesingClaimTime + roundIntervalTime;
  const changeTOS = 10;
  //only for SaleVault
  const firstClaimPercent = 3333;
  const fee = 3000;

  return {
    firstClaimTime,
    secondClaimTime,
    totalClaimCount,
    roundIntervalTime,
    firstVesingClaimTime,
    secondVesingClaimTime,
    changeTOS,
    firstClaimPercent,
    fee,
  };
};

export const getFirstClaimAmount = (
  vaults: Vaults,
  vaultType: keyof Vaults
) => {
  const selectedVault = vaults[vaultType];
  if (selectedVault.claimSchedule)
    return selectedVault.claimSchedule[0].tokenAllocation;
  throw new Error(`${vaultType}'s claimSechdule is undefined`);
};

export const getFirstClaimAmountForAllVaults = (
  vaults: Vaults
): {
  [K in keyof Vaults]: number;
} => {
  const fcAmount_InitialLiquidity = getFirstClaimAmount(vaults, "Liquidity");
  const fcAmount_Ecosystem = getFirstClaimAmount(vaults, "Ecosystem");
  // const fcAmount_Team = getFirstClaimAmount(vaults, "Team");
  const fcAmount_Tonstarter = getFirstClaimAmount(vaults, "TONStarter");

  return {
    Public: 0,
    Liquidity: fcAmount_InitialLiquidity,
    Ecosystem: fcAmount_Ecosystem,
    // Team: fcAmount_Team,
    TONStarter: fcAmount_Tonstarter,
  };
};
