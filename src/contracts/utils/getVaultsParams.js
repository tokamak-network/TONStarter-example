import ethers from "ethers";

function getPublicSaleParams(
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
  fee
) {
  let InitalParameterPublicSaleVault = {
    stosTier1: ethers.BigNumber.from("" + tier[0]),
    stosTier2: ethers.BigNumber.from("" + tier[1]),
    stosTier3: ethers.BigNumber.from("" + tier[2]),
    stosTier4: ethers.BigNumber.from("" + tier[3]),
    tier1Percents: ethers.BigNumber.from("" + percents[0]),
    tier2Percents: ethers.BigNumber.from("" + percents[1]),
    tier3Percents: ethers.BigNumber.from("" + percents[2]),
    tier4Percents: ethers.BigNumber.from("" + percents[3]),
    total1roundSaleAmount: saleAmount[0],
    total2roundSaleAmount: saleAmount[1],
    saleTokenPrice: ethers.BigNumber.from("" + price[0]),
    payTokenPrice: ethers.BigNumber.from("" + price[1]),
    hardcapAmount: ethers.BigNumber.from("" + hardcapAmount),
    changeTOSPercent: ethers.BigNumber.from("" + changeTOSPercent),
    startWhiteTime: ethers.BigNumber.from("" + times[0]),
    endWhiteTime: ethers.BigNumber.from("" + times[1]),
    start1roundTime: ethers.BigNumber.from("" + times[2]),
    end1roundTime: ethers.BigNumber.from("" + times[3]),
    snapshotTime: ethers.BigNumber.from("" + times[4]),
    start2roundTime: ethers.BigNumber.from("" + times[5]),
    end2roundTime: ethers.BigNumber.from("" + times[6]),
  };

  let InitalParameterPublicSaleClaim = {
    claimCounts: ethers.BigNumber.from("" + claimCounts),
    firstClaimPercent: ethers.BigNumber.from("" + firstClaimPercent),
    firstClaimTime: ethers.BigNumber.from("" + firstClaimTime),
    secondClaimTime: ethers.BigNumber.from("" + secondClaimTime),
    roundInterval: ethers.BigNumber.from("" + roundInterval),
  };
  let InitialParameterVestingClaim = {
    receiveAddress: receiveAddress,
    totalClaimCount: ethers.BigNumber.from("" + vestingClaimCounts),
    firstClaimPercent: ethers.BigNumber.from("" + vestingfirstClaimPercent),
    firstClaimTime: ethers.BigNumber.from("" + vestingClaimTime1),
    secondClaimTime: ethers.BigNumber.from("" + vestingClaimTime2),
    roundIntervalTime: ethers.BigNumber.from("" + vestingRoundInterval),
    fee: fee,
  };

  return {
    vaultParams: InitalParameterPublicSaleVault,
    claimParams: InitalParameterPublicSaleClaim,
    vestingParams: InitialParameterVestingClaim,
  };
}

const getInitialLiquidityParams = (
  totalAmount,
  tosPrice,
  tokenPrice,
  price,
  startTime,
  fee
) => {
  return {
    totalAllocatedAmount: totalAmount,
    tosPrice: ethers.BigNumber.from("" + tosPrice),
    tokenPrice: ethers.BigNumber.from("" + tokenPrice),
    initSqrtPrice: ethers.BigNumber.from(price),
    startTime: startTime,
    fee: fee,
  };
};

const getLpRewardParams = (
  claimer,
  token0,
  token1,
  fee,
  totalAmount,
  totalClaimCount,
  firstClaimAmount,
  firstClaimTime,
  secondClaimTime,
  roundIntervalTime
) => {
  return {
    poolParams: {
      token0: token0,
      token1: token1,
      fee: fee,
    },
    params: {
      claimer: claimer,
      totalAllocatedAmount: ethers.BigNumber.from("" + totalAmount),
      totalClaimCount: ethers.BigNumber.from("" + totalClaimCount),
      firstClaimAmount: ethers.BigNumber.from("" + firstClaimAmount),
      firstClaimTime: firstClaimTime,
      secondClaimTime: secondClaimTime,
      roundIntervalTime: roundIntervalTime,
    },
  };
};

const getTosAirdropParams = (
  claimer,
  totalAmount,
  totalClaimCount,
  firstClaimAmount,
  firstClaimTime,
  secondClaimTime,
  roundIntervalTime
) => {
  return {
    claimer: claimer,
    totalAllocatedAmount: ethers.BigNumber.from("" + totalAmount),
    totalClaimCount: ethers.BigNumber.from("" + totalClaimCount),
    firstClaimAmount: ethers.BigNumber.from("" + firstClaimAmount),
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundIntervalTime: roundIntervalTime,
  };
};

const getTonAirdropParams = (
  claimer,
  totalAmount,
  totalClaimCount,
  firstClaimAmount,
  firstClaimTime,
  secondClaimTime,
  roundIntervalTime
) => {
  return {
    claimer: claimer,
    totalAllocatedAmount: ethers.BigNumber.from("" + totalAmount),
    totalClaimCount: ethers.BigNumber.from("" + totalClaimCount),
    firstClaimAmount: ethers.BigNumber.from("" + firstClaimAmount),
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundIntervalTime: roundIntervalTime,
  };
};

const getScheduleParams = (
  name,
  claimer,
  totalAmount,
  totalClaimCount,
  firstClaimAmount,
  firstClaimTime,
  secondClaimTime,
  roundIntervalTime
) => {
  return {
    vaultName: name,
    params: {
      claimer: claimer,
      totalAllocatedAmount: totalAmount,
      totalClaimCount: ethers.BigNumber.from("" + totalClaimCount),
      firstClaimAmount: firstClaimAmount,
      firstClaimTime: firstClaimTime,
      secondClaimTime: secondClaimTime,
      roundIntervalTime: roundIntervalTime,
    },
  };
};

const getNonScheduleParams = (name, claimer, totalAmount) => {
  return {
    vaultName: name,
    claimer: claimer,
    totalAllocatedAmount: totalAmount,
  };
};

export {
  getPublicSaleParams,
  getInitialLiquidityParams,
  getLpRewardParams,
  getTosAirdropParams,
  getTonAirdropParams,
  getScheduleParams,
  getNonScheduleParams,
};
