import { BigNumber, ethers } from "ethers";
import { ProjectManager } from "tokamak-dapp-sdk/__commonjs/tonstarter";
import { MultiChainSDK } from "tokamak-multichain";
import setUpVaults from "../contracts/deploy/2.set_vaults_L2";
import { walletSetup } from "../constants";
const projectInfo = {
  tokenOwner: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  projectOwner: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  initialTotalSupply: "100000",
  addressManager: "0xEFa07e4263D511fC3a7476772e2392efFb1BDb92",
  tokenType: 0,
  tokenName: "100000",
  tokenSymbol: "100000",
  projectName: "100000",
  projectId: "15",
  l1Token: "0xd42b460b02faC4aCD43451cbE0C6B43B0d6f079c",
  l2Token: "0x7ACA99825a93Fa45D5CCdc0Ba4f6B8c0942a8a00",
};
const answers = {
  adminAddress: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  projectName: "100000",
  tokenName: "100000",
  tokenSymbol: "100000",
  initialTotalSupply: "100000",
  totalTokenAllocation: "100000",
  tokenPrice: "10",
  round1Start: "2024-02-01T07:30:21.896Z",
  round1End: "2024-02-02T07:31:23.507Z",
  round2Start: "2024-02-03T07:30:25.542Z",
  round2End: "2024-02-04T07:30:26.592Z",
  claimStart: "2024-02-05T07:30:27.804Z",
  totalRoundChoice: "3",
  roundIntervalUnit: "Monthly",
  roundInterval: "1 Month",
  totalRound: 3,
  vaults: {
    Public: { tokenAllocation: 30000, claimSchedule: [Array] },
    Liquidity: { tokenAllocation: 10000, claimSchedule: [Array] },
    Ecosystem: { tokenAllocation: 40000, claimSchedule: [Array] },
    Team: { tokenAllocation: 15000, claimSchedule: [Array] },
    TONStarter: { tokenAllocation: 5000, claimSchedule: [Array] },
  },
};

async function init() {
  const { l1Signer } = await walletSetup();

  const sdk = new MultiChainSDK({
    chainId: 5,
    signerOrProvider: l1Signer,
  });
  const block = await sdk.provider.getBlock("latest");
  console.log(block.timestamp);
  // const d = sdk.getContract("L1ProjectManagerProxy");
  // console.log(d);

  // // console.log(d);
  // //@ts-ignore
  // setUpVaults(projectInfo, answers);
}

init();
