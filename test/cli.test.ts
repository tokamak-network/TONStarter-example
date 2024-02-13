import { BigNumber, ethers } from "ethers";
import { ProjectManager } from "tokamak-dapp-sdk/__commonjs/tonstarter";
import { MultiChainSDK } from "tokamak-multichain";
import setUpVaults from "../contracts/deploy/2.set_vaults_L2";
import { walletSetup } from "../constants";

const getScheduleTime = (mins: number) => {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + mins * 60 * 1000);
  return oneHourLater.toISOString();
};

const testAnswer1 = {
  projectName: "TEST",
  tokenName: "TET",
  tokenSymbol: "TET",
  initialTotalSupply: "100000",
  totalTokenAllocation: "100000",
  tokenPrice: "10",
  snapshot: getScheduleTime(10),
  whitelistStart: getScheduleTime(12),
  whitelistEnd: getScheduleTime(14),
  round1Start: getScheduleTime(16),
  round1End: getScheduleTime(18),
  round2Start: getScheduleTime(20),
  round2End: getScheduleTime(22),
  claimStart: getScheduleTime(23),
  totalRoundChoice: "3",
  roundIntervalUnit: "Monthly",
  roundInterval: "1 Month",
  adminAddress: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  recevingAddress: true,
  totalRound: 3,
  vaults: {
    Public: { tokenAllocation: 30000, claimSchedule: [Array] },
    Liquidity: { tokenAllocation: 15000, claimSchedule: [Array] },
    Ecosystem: { tokenAllocation: 35000, claimSchedule: [Array] },
    Team: { tokenAllocation: 15000, claimSchedule: [Array] },
    TONStarter: { tokenAllocation: 5000, claimSchedule: [Array] },
  },
};
async function init() {
  const { l1Signer } = await walletSetup();

  const EthereumSDK = new MultiChainSDK({
    chainId: 5,
    signerOrProvider: l1Signer,
  });
  // const TitanSDK = new MultiChainSDK({
  //   chainId: 55004,
  // });
  // // const block = await sdk.provider.getBlock("latest");
  // // console.log(block.timestamp);
  // console.log(EthereumSDK.getContract("L1ProjectManagerProxy"));
  // const d = sdk.getContract("L1ProjectManagerProxy");
  // console.log(d);

  // // console.log(d);
  //@ts-ignore
  setUpVaults(projectInfo, answers);
}

init();
