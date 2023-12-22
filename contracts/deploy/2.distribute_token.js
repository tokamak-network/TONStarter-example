import { ethers, Contract, BigNumber } from "ethers";
import lib from "titan.github.io";
import { setup } from "../setup/index.js";
import { projectInfo } from "../config.js";
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
} from "../utils/test.js";

// Global variable because we need them almost everywhere

const L2Token = "0x1fac3ff465d5d6a25bd6aa56b5b12bca6d3a6d01";
const L2TOS = "0x6AF3cb766D6cd37449bfD321D961A61B0515c1BC";
const L2TON = "0xFa956eB0c4b3E692aD5a6B2f08170aDE55999ACa";

async function main() {
  const GOERLI_CONTRACTS = lib.contracts.tonstarter.goerli;
  const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  const { l1Signer, l2Signer, ourAddr } = await setup();
  const L1ProjectManager = new Contract(
    GOERLI_CONTRACTS.L1ProjectManagerProxy,
    L1ProjectManagerJson.abi,
    l1Signer
  );

  projectInfo.projectId = await L1ProjectManager.projectCount();
  let projects = await L1ProjectManager.projects(projectInfo.projectId);
  projectInfo.tokenOwner = projects.tokenOwner;
  projectInfo.projectOwner = projects.projectOwner;
  projectInfo.addressManager = projects.addressManager;
  projectInfo.l1Token = projects.l1Token;
  projectInfo.l2Token = L2Token;

  console.log("projectInfo", projectInfo);

  // test vaults :
  // initialLiquidityVault, tontosReward, prokectTokenTosReward, DAO,
  // Team, Marketing , airdropStos, airdropTon
  let vaultCount = BigNumber.from("8");

  let initialLiquidityAmount = projectInfo.initialTotalSupply.div(vaultCount);
  let rewardTonTosPoolAmount = initialLiquidityAmount;
  let rewardProjectTosPoolAmount = initialLiquidityAmount;
  let daoAmount = initialLiquidityAmount;
  let teamAmount = initialLiquidityAmount;
  let marketingAmount = initialLiquidityAmount;
  let airdropStosAmount = initialLiquidityAmount;
  let airdropTonAmount = initialLiquidityAmount;

  let sTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7 * 8;
  let firstClaimTime = sTime;
  let totalClaimCount = BigNumber.from("4");
  let firstClaimAmount = teamAmount.div(totalClaimCount);
  let roundIntervalTime = 60 * 60 * 24 * 7;
  let secondClaimTime = firstClaimTime + roundIntervalTime;

  let publicSaleParams = getPublicSaleParams(
    [0, 0, 0, 0], //tier
    [0, 0, 0, 0], // percentage
    [0, 0], //amount
    [0, 0], // price saleTokenPrice, payTokenPrice
    0, //hardcapAmount
    0, //changeTOSPercent
    [0, 0, 0, 0, 0, 0, 0],
    0,
    [],
    []
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

  // console.log('initialVaultParams' , initialVaultParams)
  // console.log('customScheduleVaults' , customScheduleVaults)
  // console.log('rewardTonTosPoolParams' , rewardTonTosPoolParams)
  // console.log('rewardProjectTosPoolParams' , rewardProjectTosPoolParams)
  const gos = await L1ProjectManager.estimateGas.launchProject(
    projectInfo.projectId,
    projectInfo.l2Token,
    projectInfo.initialTotalSupply,
    tokamakVaults,
    customScheduleVaults,
    customNonScheduleVaults
  );
  console.log("gos", gos);
  //===

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

  //--------------------------
  const topic = L1ProjectManager.interface.getEventTopic("LaunchedProject");
  const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
  const deployedEvent = L1ProjectManager.interface.parseLog(log);

  console.log(deployedEvent.args);

  const tokenContract = new ethers.Contract(
    projectInfo.l1Token,
    ERC20AJson.abi,
    l1Signer
  );
  let totalSupply = await tokenContract.totalSupply();
  let balanceOf = await tokenContract.balanceOf(L1ProjectManager.address);
  console.log("l1Token totalSupply", totalSupply);
  console.log("l1Token L1ProjectManager balanceOf", balanceOf);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
