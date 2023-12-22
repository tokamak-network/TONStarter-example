"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ethers_1 = require("ethers");
var getPublicSaleParams = function (
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
  var InitalParameterPublicSaleVault = {
    stosTier1: ethers_1.ethers.BigNumber.from("" + tier[0]),
    stosTier2: ethers_1.ethers.BigNumber.from("" + tier[1]),
    stosTier3: ethers_1.ethers.BigNumber.from("" + tier[2]),
    stosTier4: ethers_1.ethers.BigNumber.from("" + tier[3]),
    tier1Percents: ethers_1.ethers.BigNumber.from("" + percents[0]),
    tier2Percents: ethers_1.ethers.BigNumber.from("" + percents[1]),
    tier3Percents: ethers_1.ethers.BigNumber.from("" + percents[2]),
    tier4Percents: ethers_1.ethers.BigNumber.from("" + percents[3]),
    total1roundSaleAmount: ethers_1.ethers.BigNumber.from("" + saleAmount[0]),
    total2roundSaleAmount: ethers_1.ethers.BigNumber.from("" + saleAmount[1]),
    saleTokenPrice: ethers_1.ethers.BigNumber.from("" + price[0]),
    payTokenPrice: ethers_1.ethers.BigNumber.from("" + price[1]),
    hardcapAmount: ethers_1.ethers.BigNumber.from("" + hardcapAmount),
    changeTOSPercent: ethers_1.ethers.BigNumber.from("" + changeTOSPercent),
    startWhiteTime: ethers_1.ethers.BigNumber.from("" + times[0]),
    endWhiteTime: ethers_1.ethers.BigNumber.from("" + times[1]),
    start1roundTime: ethers_1.ethers.BigNumber.from("" + times[2]),
    end1roundTime: ethers_1.ethers.BigNumber.from("" + times[3]),
    snapshotTime: ethers_1.ethers.BigNumber.from("" + times[4]),
    start2roundTime: ethers_1.ethers.BigNumber.from("" + times[5]),
    end2roundTime: ethers_1.ethers.BigNumber.from("" + times[6]),
    claimCounts: ethers_1.ethers.BigNumber.from("" + claimCounts),
  };
  var InitalParameterPublicSaleClaim = {
    claimTimes: [],
    claimPercents: [],
  };
  for (var i = 0; i < claimCounts; i++) {
    InitalParameterPublicSaleClaim.claimTimes.push(
      ethers_1.ethers.BigNumber.from("" + claimTimes[i])
    );
    InitalParameterPublicSaleClaim.claimPercents.push(
      ethers_1.ethers.BigNumber.from("" + claimPercents[i])
    );
  }
  return {
    vaultParams: InitalParameterPublicSaleVault,
    claimParams: InitalParameterPublicSaleClaim,
  };
};
var getInitialLiquidityParams = function (
  totalAmount,
  tosPrice,
  tokenPrice,
  price,
  startTime,
  fee
) {
  return {
    totalAllocatedAmount: totalAmount,
    tosPrice: ethers_1.ethers.BigNumber.from("" + tosPrice),
    tokenPrice: ethers_1.ethers.BigNumber.from("" + tokenPrice),
    initSqrtPrice: ethers_1.ethers.BigNumber.from(price),
    startTime: startTime,
    fee: fee,
  };
};
var getLpRewardParams = function (
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
) {
  return {
    poolParams: {
      token0: token0,
      token1: token1,
      fee: fee,
    },
    params: {
      claimer: claimer,
      totalAllocatedAmount: ethers_1.ethers.BigNumber.from("" + totalAmount),
      totalClaimCount: ethers_1.ethers.BigNumber.from("" + totalClaimCount),
      firstClaimAmount: ethers_1.ethers.BigNumber.from("" + firstClaimAmount),
      firstClaimTime: firstClaimTime,
      secondClaimTime: secondClaimTime,
      roundIntervalTime: roundIntervalTime,
    },
  };
};
var getTosAirdropParams = function (
  claimer,
  totalAmount,
  totalClaimCount,
  firstClaimAmount,
  firstClaimTime,
  secondClaimTime,
  roundIntervalTime
) {
  return {
    claimer: claimer,
    totalAllocatedAmount: ethers_1.ethers.BigNumber.from("" + totalAmount),
    totalClaimCount: ethers_1.ethers.BigNumber.from("" + totalClaimCount),
    firstClaimAmount: ethers_1.ethers.BigNumber.from("" + firstClaimAmount),
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundIntervalTime: roundIntervalTime,
  };
};
var getTonAirdropParams = function (
  claimer,
  totalAmount,
  totalClaimCount,
  firstClaimAmount,
  firstClaimTime,
  secondClaimTime,
  roundIntervalTime
) {
  return {
    claimer: claimer,
    totalAllocatedAmount: ethers_1.ethers.BigNumber.from("" + totalAmount),
    totalClaimCount: ethers_1.ethers.BigNumber.from("" + totalClaimCount),
    firstClaimAmount: ethers_1.ethers.BigNumber.from("" + firstClaimAmount),
    firstClaimTime: firstClaimTime,
    secondClaimTime: secondClaimTime,
    roundIntervalTime: roundIntervalTime,
  };
};
var getScheduleParams = function (
  name,
  claimer,
  totalAmount,
  totalClaimCount,
  firstClaimAmount,
  firstClaimTime,
  secondClaimTime,
  roundIntervalTime
) {
  return {
    vaultName: name,
    params: {
      claimer: claimer,
      totalAllocatedAmount: totalAmount,
      totalClaimCount: ethers_1.ethers.BigNumber.from("" + totalClaimCount),
      firstClaimAmount: firstClaimAmount,
      firstClaimTime: firstClaimTime,
      secondClaimTime: secondClaimTime,
      roundIntervalTime: roundIntervalTime,
    },
  };
};
var getNonScheduleParams = function (name, claimer, totalAmount) {
  return {
    vaultName: name,
    claimer: claimer,
    totalAllocatedAmount: totalAmount,
  };
};
exports.default = {
  getPublicSaleParams: getPublicSaleParams,
  getInitialLiquidityParams: getInitialLiquidityParams,
  getLpRewardParams: getLpRewardParams,
  getTosAirdropParams: getTosAirdropParams,
  getTonAirdropParams: getTonAirdropParams,
  getScheduleParams: getScheduleParams,
  getNonScheduleParams: getNonScheduleParams,
};
