import { ethers, Contract, BigNumber } from "ethers";
import lib from "titan.github.io";
import { setup } from "../setup/index.js";
import univ3prices from "@thanpolas/univ3prices";

//abis
import ERC20AJson from "../abis/ERC20A.json" assert { type: "json" };
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json" assert { type: "json" };
import {
  getPublicSaleParams,
  getInitialLiquidityParams,
  getLpRewardParams,
  getTosAirdropParams,
  getTonAirdropParams,
  getScheduleParams,
  getNonScheduleParams,
} from "../utils/getVaultsParams.js";
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg.js";

// Global variable because we need them almost everywhere

const GOERLI_CONTRACTS = lib.contracts.tonstarter.goerli;

const L2TOS = "0x6AF3cb766D6cd37449bfD321D961A61B0515c1BC";
const L2TON = "0xFa956eB0c4b3E692aD5a6B2f08170aDE55999ACa";

async function main(project) {
  const { l1Signer, l2Signer, ourAddr } = await setup();
  const L1ProjectManager = new Contract(
    GOERLI_CONTRACTS.L1ProjectManagerProxy,
    L1ProjectManagerJson.abi,
    l1Signer
  );
  const projectInfo = project;
  // test vaults :
  // initialLiquidityVault, tontosReward, prokectTokenTosReward, DAO,
  // Team, Marketing , airdropStos, airdropTon
  let vaultCount = BigNumber.from("10");

  let initialLiquidityAmount = projectInfo.initialTotalSupply.div(vaultCount);

  let rewardTonTosPoolAmount = initialLiquidityAmount;
  let rewardProjectTosPoolAmount = initialLiquidityAmount;
  let daoAmount = initialLiquidityAmount;
  let teamAmount = initialLiquidityAmount;
  let marketingAmount = initialLiquidityAmount;
  let airdropStosAmount = initialLiquidityAmount;
  let airdropTonAmount = initialLiquidityAmount;

  let sTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 * 8;

  const setSnapshot = Math.floor(Date.now() / 1000) + 60 * 60 * 1;
  const whitelistStartTime = setSnapshot + 400;
  const whitelistEndTime = whitelistStartTime + 86400 * 7;
  const round1StartTime = whitelistEndTime + 1;
  const round1EndTime = round1StartTime + 86400 * 7;
  const round2StartTime = round1EndTime + 1;
  const round2EndTime = round2StartTime + 86400 * 7;

  const firstClaimTime = round2EndTime + 86400 * 20;
  let totalClaimCount = BigNumber.from("4");
  let firstClaimAmount = teamAmount.div(BigNumber.from("4"));
  let roundIntervalTime = 60 * 60 * 24 * 7;
  let secondClaimTime = firstClaimTime + roundIntervalTime;
  const fundClaimTime1 = secondClaimTime + 3000;
  const fundClaimTime2 = fundClaimTime1 + 100;
  let changeTOS = 10;
  let firstClaimPercent = 4000;
  let roundInterval = 600; //1분
  let fee = 3000;

  let publicSaleParams = getPublicSaleParams(
    [100, 200, 1000, 4000], //tier
    [600, 1200, 2200, 6000], // percentage
    [initialLiquidityAmount, initialLiquidityAmount], //amount
    [200, 2000], // price saleTokenPrice, payTokenPrice
    100 * 1e18, //hardcapAmount
    changeTOS, //changeTOSPercent
    [
      whitelistStartTime,
      whitelistEndTime,
      round1StartTime,
      round1EndTime,
      setSnapshot,
      round2StartTime,
      round2EndTime,
    ], //times
    totalClaimCount.toNumber(), //claimCounts
    firstClaimPercent, //firstClaimPercent
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime: number,
    roundIntervalTime, //roundInterval: number,
    ourAddr, // receiveAddress,
    4, // vestingClaimCounts: number,
    firstClaimPercent, // vestingfirstClaimPercent: number,
    fundClaimTime1, // vestingClaimTime1: number,
    fundClaimTime2, // vestingClaimTime2: number,
    roundInterval, // vestingRoundInterval: number,
    fee // fee: number
  );

  let tosPrice = 1e18;
  let tokenPrice = 10e18;

  let token0Price = tosPrice;
  let token1Price = tokenPrice;

  if (L2TOS > projectInfo.l2Token) {
    token0Price = tokenPrice;
    token1Price = tosPrice;
  }
  const sqrtPrice = univ3prices.utils.encodeSqrtRatioX96(
    token0Price,
    token1Price
  );
  let initialVaultParams = getInitialLiquidityParams(
    initialLiquidityAmount,
    tosPrice / 1e18,
    token1Price / 1e18,
    sqrtPrice.toString(),
    sTime,
    3000
  );

  let rewardTonTosPoolParams = getLpRewardParams(
    ethers.constants.AddressZero,
    L2TON,
    L2TOS,
    3000,
    rewardTonTosPoolAmount,
    totalClaimCount,
    firstClaimAmount, //firstClaimAmount
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );
  let rewardProjectTosPoolParams = getLpRewardParams(
    ethers.constants.AddressZero,
    projectInfo.l2Token,
    L2TOS,
    3000,
    rewardProjectTosPoolAmount,
    totalClaimCount,
    firstClaimAmount, //firstClaimAmount
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );

  let tosAirdropParams = getTosAirdropParams(
    ethers.constants.AddressZero,
    airdropStosAmount,
    totalClaimCount.toNumber(),
    firstClaimAmount,
    firstClaimTime,
    secondClaimTime,
    roundIntervalTime
  );

  let tonAirdropParams = getTonAirdropParams(
    ethers.constants.AddressZero,
    airdropTonAmount,
    totalClaimCount.toNumber(),
    firstClaimAmount,
    firstClaimTime,
    secondClaimTime,
    roundIntervalTime
  );

  let daoParams = getNonScheduleParams("DAO", ourAddr, daoAmount);
  let teamParams = getScheduleParams(
    "TEAM",
    ourAddr,
    teamAmount, //totalAllocatedAmount
    totalClaimCount.toNumber(), // totalClaimCount
    firstClaimAmount, //firstClaimAmount
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );

  let marketingParams = getScheduleParams(
    "MARKETING",
    ourAddr,
    marketingAmount, //totalAllocatedAmount
    totalClaimCount.toNumber(), // totalClaimCount 4
    firstClaimAmount, //firstClaimAmount
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );

  let tokamakVaults = {
    publicSaleParams: publicSaleParams,
    initialVaultParams: initialVaultParams,
    rewardTonTosPoolParams: rewardTonTosPoolParams,
    rewardProjectTosPoolParams: rewardProjectTosPoolParams,
    tosAirdropParams: tosAirdropParams,
    tonAirdropParams: tonAirdropParams,
  };
  // console.log('tokamakVaults' ,tokamakVaults )
  let customScheduleVaults = [teamParams, marketingParams];
  let customNonScheduleVaults = [daoParams];

  const receipt = await (
    await L1ProjectManager.launchProject(
      projectInfo.projectId,
      projectInfo.l2Token,
      projectInfo.initialTotalSupply,
      tokamakVaults,
      customScheduleVaults,
      customNonScheduleVaults
    )
  ).wait();

  console.log("\r");
  console.log("Your token successfully distributed on L1!!");
  console.log(
    "See your tx 👉",
    getBlockExplorerWithHash("sepolia", receipt.transactionHash)
  );

  //--------------------------
  const topic = L1ProjectManager.interface.getEventTopic("LaunchedProject");
  const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
  // const deployedEvent = L1ProjectManager.interface.parseLog(log);

  // const tokenContract = new ethers.Contract(
  //   projectInfo.l1Token,
  //   ERC20AJson.abi,
  //   l1Signer
  // );
  // let totalSupply = await tokenContract.totalSupply();
  // let balanceOf = await tokenContract.balanceOf(L1ProjectManager.address);
  // console.log("l1Token totalSupply", totalSupply);
  // console.log("l1Token L1ProjectManager balanceOf", balanceOf);
}

async function distributeToken(projectInfo) {
  const result = main(projectInfo).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  return result;
}
// const testData = {
//   projectId: "06",
//   tokenOwner: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
//   projectOwner: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
//   initialTotalSupply: "100",
//   tokenType: 0,
//   projectName: "test",
//   tokenName: "test",
//   tokenSymbol: "test",
//   l1Token: "0x4cB14C88233346c32e922d6F791c96eDBfbE74FA",
//   l2Token: "0x0000000000000000000000000000000000000000",
//   l2Type: 0,
//   addressManager: "0xEFa07e4263D511fC3a7476772e2392efFb1BDb92",
// };
// distributeToken(testData);
export default distributeToken;
