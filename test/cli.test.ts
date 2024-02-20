import { BigNumber, ethers } from "ethers";
import { ProjectManager } from "tokamak-dapp-sdk/__commonjs/tonstarter";
import { MultiChainSDK } from "tokamak-multichain";
import setUpVaults from "../contracts/deploy/2.set_vaults_L2";
import { walletSetup } from "../constants";
import {
  CreateProject,
  DeployProjectOnL1,
  SetTokenOnL2,
  SetUpVaults,
} from "../commands/deployProject";

const getScheduleTime = (mins: number) => {
  const now = new Date();
  const oneHourLater = new Date(
    now.getTime() + mins * 60 * 60 * 1000 + 24 * 60 * 60 * 1000
  );
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
  recevingAddress: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  totalRound: 3,
  vaults: {
    Public: {
      tokenAllocation: 30000,
      claimSchedule: [
        { tokenAllocation: 10000, date: getScheduleTime(23) },
        { tokenAllocation: 10000, date: getScheduleTime(24) },
        { tokenAllocation: 10000, date: getScheduleTime(25) },
      ],
    },
    Liquidity: {
      tokenAllocation: 15000,
      claimSchedule: [
        { tokenAllocation: 5000, date: getScheduleTime(23) },
        { tokenAllocation: 5000, date: getScheduleTime(24) },
        { tokenAllocation: 5000, date: getScheduleTime(25) },
      ],
    },
    Ecosystem: {
      tokenAllocation: 35000,
      claimSchedule: [
        { tokenAllocation: 11666.66, date: getScheduleTime(23) },
        { tokenAllocation: 11666.66, date: getScheduleTime(24) },
        { tokenAllocation: 11666.68, date: getScheduleTime(25) },
      ],
    },
    Team: {
      tokenAllocation: 15000,
      claimSchedule: [
        { tokenAllocation: 5000, date: getScheduleTime(23) },
        { tokenAllocation: 5000, date: getScheduleTime(24) },
        { tokenAllocation: 5000, date: getScheduleTime(25) },
      ],
    },
    TONStarter: {
      tokenAllocation: 5000,
      claimSchedule: [
        { tokenAllocation: 1666.66, date: getScheduleTime(23) },
        { tokenAllocation: 1666.66, date: getScheduleTime(24) },
        { tokenAllocation: 1666.68, date: getScheduleTime(25) },
      ],
    },
  },
};

const testAnswerWithOnlyTokamakVaults = {
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
  recevingAddress: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  totalRound: 3,
  vaults: {
    Public: {
      tokenAllocation: 30000,
      claimSchedule: [
        { tokenAllocation: 10000, date: getScheduleTime(23) },
        { tokenAllocation: 10000, date: getScheduleTime(24) },
        { tokenAllocation: 10000, date: getScheduleTime(25) },
      ],
    },
    Liquidity: {
      tokenAllocation: 15000,
      claimSchedule: [
        { tokenAllocation: 5000, date: getScheduleTime(23) },
        { tokenAllocation: 5000, date: getScheduleTime(24) },
        { tokenAllocation: 5000, date: getScheduleTime(25) },
      ],
    },
    Ecosystem: {
      tokenAllocation: 35000,
      claimSchedule: [
        { tokenAllocation: 11666.66, date: getScheduleTime(23) },
        { tokenAllocation: 11666.66, date: getScheduleTime(24) },
        { tokenAllocation: 11666.68, date: getScheduleTime(25) },
      ],
    },
    TONStarter: {
      tokenAllocation: 20000,
      claimSchedule: [
        { tokenAllocation: 10000, date: getScheduleTime(23) },
        { tokenAllocation: 5000, date: getScheduleTime(24) },
        { tokenAllocation: 5000, date: getScheduleTime(25) },
      ],
    },
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

  //start to deploy contracts through toolkit
  // const CLI = new CreateProject(testAnswer1 as any);
  const CLI = new CreateProject(testAnswerWithOnlyTokamakVaults as any);

  const deployOnL1 = new DeployProjectOnL1(CLI);
  const setTokenOnL2 = new SetTokenOnL2(CLI);
  const setUpVaults = new SetUpVaults(CLI);

  CLI.addStepChangeListener([deployOnL1, setTokenOnL2, setUpVaults]);
  const deployed = await CLI.start();
  console.log("deployed", deployed);
}

init();
