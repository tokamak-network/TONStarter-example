import { BigNumber, Contract, ethers } from "ethers";
// import { setup } from "../setup/index.js";
//@ts-ignore
import univ3prices from "@thanpolas/univ3prices";

//abis
import ERC20AJson from "../abis/goerli/L1ProjectManager.json";
import {
  getPublicSaleParams,
  getInitialLiquidityParams,
  getLpRewardParams,
  getTosAirdropParams,
  getTonAirdropParams,
  getScheduleParams,
  getNonScheduleParams,
} from "../utils/getVaultsParams";
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg";
import { DeployedProjectInfo } from "../../types/deploy";
import { CLI_Answer } from "../../types/command";
import { MultiChainSDK } from "tokamak-multichain";
import { convertToTimestamp } from "../../utils/date";
import { walletSetup } from "../../constants";

// Global variable because we need them almost everywhere

// const GOERLI_CONTRACTS

const L2TOS = "0x6AF3cb766D6cd37449bfD321D961A61B0515c1BC";
const L2TON = "0xFa956eB0c4b3E692aD5a6B2f08170aDE55999ACa";

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
  //@ts-ignore
  // const L1ProjectManager = EthereumSDK.getContract("L1ProjectManagerProxy");
  // const L1ProjectManager = new Contract(
  //   GOERLI_CONTRACTS.L1ProjectManagerProxy,
  //   L1ProjectManagerJson.abi,
  //   l1Signer
  // );
  const L1ProjectManager = new Contract(
    "0x3eD0776A8E323a294cd704c02a349ca1B83554da",
    ERC20AJson.abi,
    l1Signer
  );

  /**
   * @description Total 10 Vaults we need to setup here
   * Sale : PublicSale
     Liquidity : Initial Liquidity, 
     Ecocysystem : ProjectToken-TOS LP Reward
     Team : Vesting
     TONStarter : TON-TOS, TON-Staker, TOS-Staker
  */

  const saleAmount = answers.vaults.Public.tokenAllocation;
  const initialLiquidityAmount = answers.vaults.Liquidity.tokenAllocation;
  const rewardTonTosPoolAmount = answers.vaults.Public.tokenAllocation;
  const rewardProjectTosPoolAmount = answers.vaults.Ecosystem.tokenAllocation;
  const airdropStosAmount = answers.vaults.TONStarter.tokenAllocation / 2;
  const airdropTonAmount = answers.vaults.TONStarter.tokenAllocation / 2;

  const snapshotTime = convertToTimestamp(answers.round1Start);
  const whitelistStartTime = convertToTimestamp(answers.round1Start);
  const whitelistEndTime = convertToTimestamp(answers.round1Start);
  const round1StartTime = convertToTimestamp(answers.round1Start);
  const round1EndTime = convertToTimestamp(answers.round1End);
  const round2StartTime = convertToTimestamp(answers.round2Start);
  const round2EndTime = convertToTimestamp(answers.round2End);
  const claimStartTime = convertToTimestamp(answers.claimStart);

  const firstClaimTime = claimStartTime;
  const totalClaimCount = Number(answers.totalRoundChoice);
  const roundIntervalTime = 60 * 60 * 24 * 7;
  const secondClaimTime = firstClaimTime + roundIntervalTime;
  const fundClaimTime1 = firstClaimTime;
  const fundClaimTime2 = secondClaimTime;
  const changeTOS = 10;
  const firstClaimPercent = 4000;
  const roundInterval = 600; //1분
  const fee = 3000;

  const publicSaleParams = getPublicSaleParams({
    tier: [100, 200, 1000, 4000], //tier,
    percents: [600, 1200, 2200, 6000], // percentage,
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
    firstClaimPercent: 3300,
    firstClaimTime: claimStartTime,
    secondClaimTime: secondClaimTime,
    roundInterval: roundIntervalTime,
    receiveAddress: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
    vestingClaimCounts: totalClaimCount,
    vestingfirstClaimPercent: 3300,
    vestingClaimTime1: claimStartTime,
    vestingClaimTime2: secondClaimTime,
    vestingRoundInterval: roundIntervalTime,
    fee,
  });

  let tosPrice = 1e18;
  let tokenPrice = 10e18;

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
    BigNumber.from(initialLiquidityAmount),
    tosPrice / 1e18,
    token1Price / 1e18,
    sqrtPrice.toString(),
    claimStartTime,
    fee
  );

  const initialLiquidityFirstClaimAmount = answers.vaults.Liquidity
    .claimSchedule
    ? answers.vaults.Liquidity.claimSchedule[0].tokenAllocation
    : 1;

  const rewardTonTosPoolParams = getLpRewardParams(
    ethers.constants.AddressZero,
    L2TON,
    L2TOS,
    fee,
    rewardTonTosPoolAmount,
    totalClaimCount,
    initialLiquidityFirstClaimAmount, //firstClaimAmount
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );

  const rewardProjectFirstClaimAmount = answers.vaults.Ecosystem.claimSchedule
    ? answers.vaults.Ecosystem.claimSchedule[0].tokenAllocation
    : 1;

  console.log(
    "rewardProjectFirstClaimAmount",
    rewardProjectFirstClaimAmount,
    //@ts-ignore
    answers.vaults.Ecosystem.claimSchedule[0]
  );

  const rewardProjectTosPoolParams = getLpRewardParams(
    ethers.constants.AddressZero,
    projectInfo.l2Token as string,
    L2TOS,
    fee,
    rewardProjectTosPoolAmount,
    totalClaimCount,
    rewardProjectFirstClaimAmount, //firstClaimAmount
    firstClaimTime, //firstClaimTime
    secondClaimTime, //secondClaimTime
    roundIntervalTime //roundIntervalTime
  );

  const tosStakerFirstClaimAmount = answers.vaults.TONStarter.claimSchedule
    ? answers.vaults.TONStarter.claimSchedule[0].tokenAllocation / 2
    : 1;

  const tosAirdropParams = getTosAirdropParams(
    ethers.constants.AddressZero,
    airdropStosAmount,
    totalClaimCount,
    tosStakerFirstClaimAmount,
    firstClaimTime,
    secondClaimTime,
    roundIntervalTime
  );

  const tonStakerFirstClaimAmount = answers.vaults.TONStarter.claimSchedule
    ? answers.vaults.TONStarter.claimSchedule[0].tokenAllocation / 2
    : 1;

  const tonAirdropParams = getTonAirdropParams(
    ethers.constants.AddressZero,
    airdropTonAmount,
    totalClaimCount,
    tonStakerFirstClaimAmount,
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
    await L1ProjectManager.launchProject(
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
