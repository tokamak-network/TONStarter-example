import { BigNumber, Contract, ethers } from "ethers";
//@ts-ignore
import univ3prices from "@thanpolas/univ3prices";

import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json";
import L2ProjectManagerABI from "../abis/titan-goerli/L2ProjectManager.json";
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
  const { l1Signer, l2Signer } = await walletSetup();
  const EthereumSDK = new MultiChainSDK({
    chainId: 5,
    signerOrProvider: l1Signer,
  });

  // const L1ProjectManager = EthereumSDK.getContract("L1ProjectManagerProxy");
  const L1ProjectManager = new Contract(
    EthereumSDK.getContract("L1ProjectManagerProxy").address,
    L1ProjectManagerJson.abi,
    l1Signer
  );
  // const L2TOS = TitanSDK.getToken("TOS").address;
  // const L2TON = TitanSDK.getToken("TON").address;

  const L2TOS = "0x6AF3cb766D6cd37449bfD321D961A61B0515c1BC";
  const L2TON = "0xFa956eB0c4b3E692aD5a6B2f08170aDE55999ACa";

  const {
    saleAmount,
    initialLiquidityAmount,
    rewardTonTosPoolAmount,
    rewardProjectTosPoolAmount,
    airdropStosAmount,
    airdropTonAmount,
    teamAmount,
  } = getVaultTokenAllocation(answers);

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

  const publicSaleAmount = integerDivision(saleAmount, 2);
  const round1Amount = publicSaleAmount.allocation;
  const round2Amount = publicSaleAmount.allocation + publicSaleAmount.remainder;

  const publicSaleParams = getPublicSaleParams({
    tier: [100, 200, 1000, 4000], //tier,
    percents: [2500, 2500, 2500, 2500], // percentage,
    saleAmount: [round1Amount, round2Amount],
    price: [200, 2000],
    hardcapAmount: 100,
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

  try {
    const check = await L1ProjectManager.validationPublicSaleVaults(
      publicSaleParams
    );

    if (check.valid === false) {
      console.log(publicSaleParams);
      throw Error("publicSaleVault's valid is failed");
    }
  } catch (e) {
    console.log("\r");
    console.log("**************************");
    console.log("publicSaleParams", publicSaleParams);
    console.error(e);
  }

  console.log("\r");
  console.log("**************************");
  console.log("publicSaleVault is valid.");
  console.log("**************************");

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
    tosPrice,
    token1Price,
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
   * Team
   */
  const team_fcAmount = firstClaimAmount.Team;

  const teamVault = getScheduleParams(
    "TEAM",
    answers.recevingAddress,
    teamAmount, //totalAllocatedAmount
    totalClaimCount, // totalClaimCount
    team_fcAmount, //firstClaimAmount
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

  const customScheduleVaults = [teamVault];

  // console.log("*****Trying to setup a project on L1*****");
  // console.log("*****params******");
  // console.log(
  //   projectInfo.projectId,
  //   projectInfo.l2Token,
  //   projectInfo.initialTotalSupply,
  //   tokamakVaults,
  //   customScheduleVaults,
  //   []
  // );

  const check_validateTokamakVaults =
    await L1ProjectManager.validateTokamakVaults(tokamakVaults);

  const receipt = await (
    await L1ProjectManager.launchProject(
      projectInfo.projectId,
      projectInfo.l2Token,
      projectInfo.initialTotalSupply,
      tokamakVaults,

      customScheduleVaults,
      []
    )
  ).wait();

  console.log("\r");
  console.log("Your token successfully deposited from L1 to L2");
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
