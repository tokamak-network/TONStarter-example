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
  claimTimes,
  claimPercents
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
    total1roundSaleAmount: ethers.BigNumber.from("" + saleAmount[0]),
    total2roundSaleAmount: ethers.BigNumber.from("" + saleAmount[1]),
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
    claimCounts: ethers.BigNumber.from("" + claimCounts),
  };

  let InitalParameterPublicSaleClaim = {
    claimTimes: [],
    claimPercents: [],
  };

  for (let i = 0; i < claimCounts; i++) {
    InitalParameterPublicSaleClaim.claimTimes.push(
      ethers.BigNumber.from("" + claimTimes[i])
    );
    InitalParameterPublicSaleClaim.claimPercents.push(
      ethers.BigNumber.from("" + claimPercents[i])
    );
  }

  return {
    vaultParams: InitalParameterPublicSaleVault,
    claimParams: InitalParameterPublicSaleClaim,
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
