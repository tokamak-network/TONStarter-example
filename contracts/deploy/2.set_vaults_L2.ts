import { BigNumber, Contract, ethers } from "ethers";
// import { setup } from "../setup/index.js";
//@ts-ignore
import univ3prices from "@thanpolas/univ3prices";

//abis
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json";
import {
  getPublicSaleParams,
  getInitialLiquidityParams,
  getLpRewardParams,
  getTosAirdropParams,
  getTonAirdropParams,
  getScheduleParams,
  getNonScheduleParams,
  getVaultTokenAllocation,
  getSaleSchedule,
  getParamsAfterSale,
  getFirstClaimAmount,
  getFirstClaimAmountForAllVaults,
} from "../utils/getVaultsParams";
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg";
import { DeployedProjectInfo } from "../../types/deploy";
import { CLI_Answer } from "../../types/command";
import { MultiChainSDK } from "tokamak-multichain";
import { convertToTimestamp, getRoundInterval } from "../../utils/date";
import { walletSetup } from "../../constants";
import { integerDivision } from "../utils/number";

// Global variable because we need them almost everywhere

// const GOERLI_CONTRACTS

/**
   * @description Total 10 Vaults we need to setup here
   * Sale : PublicSale, Vesting
     Liquidity : Initial Liquidity, 
     Ecocysystem : ProjectToken-TOS LP Reward
     Team : Team
     TONStarter : TON-TOS, TON-Staker, TOS-Staker
  */
async function main(
  projectInfo: DeployedProjectInfo,
  answers: CLI_Answer
): Promise<DeployedProjectInfo> {
  console.log("project", projectInfo);
  console.log("answers", answers);
  // return project;

  const { l1Signer } = await walletSetup();
  const EthereumSDK = new MultiChainSDK({
    chainId: 5,
    signerOrProvider: l1Signer,
  });
  const L1ProjectManager = EthereumSDK.getContract("L1ProjectManagerProxy");
  const TitanSDK = new MultiChainSDK({
    chainId: 5050,
  });
  const L2TOS = TitanSDK.getToken("TOS").address;
  const L2TON = TitanSDK.getToken("TON").address;

  // const L2TOS = "0x6AF3cb766D6cd37449bfD321D961A61B0515c1BC";
  // const L2TON = "0xFa956eB0c4b3E692aD5a6B2f08170aDE55999ACa";

  const {
    saleAmount,
    initialLiquidityAmount,
    rewardTonTosPoolAmount,
    rewardProjectTosPoolAmount,
    airdropStosAmount,
    airdropTonAmount,
  } = getVaultTokenAllocation(answers);

  // const saleAmount = 50000;
  // const initialLiquidityAmount = 10000;
  // const rewardTonTosPoolAmount = 10000;
  // const rewardProjectTosPoolAmount = 10000;
  // const airdropStosAmount = 10000;
  // const airdropTonAmount = 10000;

  console.log("*****gogo*****");

  console.log(
    saleAmount,
    initialLiquidityAmount,
    rewardTonTosPoolAmount,
    rewardProjectTosPoolAmount,
    airdropStosAmount,
    airdropTonAmount
  );

  const {
    snapshotTime,
    whitelistStartTime,
    whitelistEndTime,
    round1StartTime,
    round1EndTime,
    round2StartTime,
    round2EndTime,
    claimStartTime,
  } = getSaleSchedule(answers);

  const {
    firstClaimTime,
    secondClaimTime,
    totalClaimCount,
    roundIntervalTime,
    firstVesingClaimTime,
    secondVesingClaimTime,
    changeTOS,
    firstClaimPercent,
    fee,
  } = getParamsAfterSale({
    answers,
    claimStartTime,
  });

  const publicSaleParams = getPublicSaleParams({
    tier: [100, 200, 1000, 4000], //tier,
    percents: [2500, 2500, 2500, 2500], // percentage,
    saleAmount: [Number(saleAmount) / 2, saleAmount / 2],
    price: [200, 2000],
    hardcapAmount: 100 * 1e18,
    changeTOSPercent: changeTOS,
    times: [
      whitelistStartTime,
      whitelistEndTime,
      round1StartTime,
      round1EndTime,
      snapshotTime,
      round2StartTime,
      round2EndTime,
    ],
    claimCounts: totalClaimCount,
    firstClaimPercent,
    firstClaimTime: claimStartTime,
    secondClaimTime: secondClaimTime,
    roundInterval: roundIntervalTime,
    receiveAddress: answers.recevingAddress,
    vestingClaimCounts: totalClaimCount,
    vestingfirstClaimPercent: firstClaimPercent,
    vestingClaimTime1: firstVesingClaimTime,
    vestingClaimTime2: secondVesingClaimTime,
    vestingRoundInterval: roundIntervalTime,
    fee,
  });

  const check = await L1ProjectManager.validationPublicSaleVaults(
    publicSaleParams
  );
  if (check.valid === false) {
    throw Error("publicSaleVault's valid is failed");
  }
  console.log("**publicSaleParams**");
  console.log(check);

  /**
   * Common Props for vaults except for Sale
   */
  const firstClaimAmount = getFirstClaimAmountForAllVaults(answers.vaults);

  /**
   * Liquidity
   */
  const tosPrice = 1;
  const tokenPrice = Number(answers.tokenPrice);

  let token0Price = tosPrice;
  let token1Price = tokenPrice;

  if (projectInfo.l2Token && L2TOS > projectInfo.l2Token) {
    token0Price = tokenPrice;
    token1Price = tosPrice;
  }
  const sqrtPrice = univ3prices.utils.encodeSqrtRatioX96(
    token0Price,
    token1Price
  );
  const initialVaultParams = getInitialLiquidityParams(
    initialLiquidityAmount,
    tosPrice / 1e18,
    token1Price / 1e18,
    sqrtPrice.toString(),
    claimStartTime,
    fee
  );

  /**
   * Ecosystem
   */
  const rewardProject_fcAmount = firstClaimAmount.Ecosystem;

  const rewardProjectTosPoolParams = getLpRewardParams(
    ethers.constants.AddressZero,
    projectInfo.l2Token as string,
    L2TOS,
    fee,
    rewardProjectTosPoolAmount,
    totalClaimCount,
    rewardProject_fcAmount, //firstClaimAmount
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );

  /**
   * TONStarter
   */
  const tonstarter_fcAmount = integerDivision(firstClaimAmount.TONStarter, 3);
  const tontos_fcAmount =
    tonstarter_fcAmount.allocation + tonstarter_fcAmount.remainder;
  const tosStaker_fcAmount = tonstarter_fcAmount.allocation;
  const tonStaker_fcAmount = tonstarter_fcAmount.allocation;

  const rewardTonTosPoolParams = getLpRewardParams(
    ethers.constants.AddressZero,
    L2TON,
    L2TOS,
    fee,
    rewardTonTosPoolAmount,
    totalClaimCount,
    tontos_fcAmount, //firstClaimAmount
    firstClaimTime, //firtClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );

  const tosAirdropParams = getTosAirdropParams(
    ethers.constants.AddressZero,
    airdropStosAmount,
    totalClaimCount,
    tosStaker_fcAmount,
    firstClaimTime,
    secondClaimTime,
    roundIntervalTime
  );

  const tonAirdropParams = getTonAirdropParams(
    ethers.constants.AddressZero,
    airdropTonAmount,
    totalClaimCount,
    tonStaker_fcAmount,
    firstClaimTime,
    secondClaimTime,
    roundIntervalTime
  );

  const tokamakVaults = {
    publicSaleParams,
    initialVaultParams,
    rewardTonTosPoolParams,
    rewardProjectTosPoolParams,
    tosAirdropParams,
    tonAirdropParams,
  };

  console.log("params*****");
  console.log(
    projectInfo.projectId,
    projectInfo.l2Token,
    projectInfo.initialTotalSupply,
    tokamakVaults
  );

  const receipt = await (
    await L1ProjectManager.launchProjectExceptCheckPublic(
      projectInfo.projectId,
      projectInfo.l2Token,
      projectInfo.initialTotalSupply,
      tokamakVaults,
      [],
      []
    )
  ).wait();

  console.log("\r");
  console.log("Your token successfully distributed on L1!!");
  console.log(
    "See your tx 👉",
    getBlockExplorerWithHash("sepolia", receipt.transactionHash)
  );

  const topic = L1ProjectManager.interface.getEventTopic("LaunchedProject");
  const log = receipt.logs.find((x: any) => x.topics.indexOf(topic) >= 0);

  return projectInfo;
}

async function setUpVaults(
  projectInfo: DeployedProjectInfo | undefined,
  answers: CLI_Answer
) {
  try {
    if (!projectInfo)
      throw new Error("projectInfo is undefined at setVaultsOnL2");
    const result = await main(projectInfo, answers);
    return { state: true, result };
  } catch (e) {
    console.log(e);
    return { state: false, result: undefined };
  }
}

export default setUpVaults;
