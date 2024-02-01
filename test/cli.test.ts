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
  projectId: "100000",
  l1Token: "0x07b15d766B002f712c90f002009c548127C6A26B",
  l2Token: "0x1450B5e97a633b55aeE99dFdFe8a3D1dB0B73964",
};
const answers = {
  projectName: "100000",
  tokenName: "100000",
  tokenSymbol: "100000",
  initialTotalSupply: "100000",
  totalTokenAllocation: "100000",
  tokenPrice: "10",
  snapshot: "2024-02-02T07:45:40.200Z",
  whitelistStart: "2024-02-03T07:45:41.640Z",
  whitelistEnd: "2024-02-04T07:45:42.703Z",
  round1Start: "2024-02-05T07:45:43.841Z",
  round1End: "2024-02-06T07:46:45.227Z",
  round2Start: "2024-02-07T07:45:48.526Z",
  round2End: "2024-02-08T07:45:50.538Z",
  claimStart: "2024-02-09T07:45:52.689Z",
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
        { tokenAllocation: 10000, date: 1707378621 },
        { tokenAllocation: 10000, date: 1709884221 },
        { tokenAllocation: 10000, date: 1712562621 },
      ],
    },
    Liquidity: {
      tokenAllocation: 15000,
      claimSchedule: [
        { tokenAllocation: 5000, date: 1707378621 },
        { tokenAllocation: 5000, date: 1709884221 },
        { tokenAllocation: 5000, date: 1712562621 },
      ],
    },
    Ecosystem: {
      tokenAllocation: 35000,
      claimSchedule: [
        { tokenAllocation: 11666.66, date: 1707378621 },
        { tokenAllocation: 11666.66, date: 1709884221 },
        { tokenAllocation: 11666.68, date: 1712562621 },
      ],
    },
    Team: {
      tokenAllocation: 15000,
      claimSchedule: [
        { tokenAllocation: 5000, date: 1707378621 },
        { tokenAllocation: 5000, date: 1709884221 },
        { tokenAllocation: 5000, date: 1712562621 },
      ],
    },
    TONStarter: {
      tokenAllocation: 5000,
      claimSchedule: [
        { tokenAllocation: 1666.66, date: 1707378621 },
        { tokenAllocation: 1666.66, date: 1709884221 },
        { tokenAllocation: 1666.68, date: 1712562621 },
      ],
    },
  },
};
async function init() {
  // const { l1Signer } = await walletSetup();

  // const EthereumSDK = new MultiChainSDK({
  //   chainId: 5,
  //   signerOrProvider: l1Signer,
  // });
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
