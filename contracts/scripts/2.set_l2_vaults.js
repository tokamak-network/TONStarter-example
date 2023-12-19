import { ethers, Contract } from "ethers";
import lib from "titan.github.io";
import optimismSDK from "@tokamak-network/tokamak-layer2-sdk";
import { setup } from "../setup/index.js";
import {
  addressManager,
  readContracts,
  deployedContracts,
  BridgeABI,
  bridge,
  messenger,
} from "./common_func.js";

import L1BridgeJson from "../abis/L1StandardBridge.json" assert { type: "json" };
import l1MessengerJson from "../abis/L1CrossDomainMessenger.json" assert { type: "json" };
import L2BridgeJson from "../abis/L2StandardBridge.json" assert { type: "json" };
import IERC20Json from "../abis/ERC20A.json" assert { type: "json" };
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json" assert { type: "json" };
import L2ProjectManagerJson from "../abis/titan-goerli/L2ProjectManager.json" assert { type: "json" };
import L2TokenFactoryJson from "../abis/titan-goerli/L2TokenFactory-old.json" assert { type: "json" };

// Global variable because we need them almost everywhere
let crossChainMessenger;
let l1ERC20, l2ERC20; // OUTb contracts to show ERC-20 transfers
let projectInfo;

const reportERC20Balances = async () => {
  const l1Balance = (await l1ERC20.balanceOf(ourAddr)).toString().slice(0, -18);
  const l2Balance = (await l2ERC20.balanceOf(ourAddr)).toString().slice(0, -18);

  console.log(`ourAddr:${ourAddr} `);
  console.log(`OUTb on L1:${l1Balance}     OUTb on L2:${l2Balance}`);

  if (l1Balance != 0) {
    return;
  }
};

const allowanceERC20 = async () => {
  console.log(`\n`, l1Signer.address);
  const allowance = await l1ERC20.allowance(l1Signer.address, bridge.l1Bridge);
  console.log(`allowance `, allowance);
  console.log(`\n`);
};

const approveERC20 = async () => {
  const tx = await l1ERC20.approve(l1Signer.address, bridge.l1Bridge, {
    gasLimit: 200000,
  });
  console.log("tx", tx);
  await tx.wait();
};

// set L2 Token
async function main() {
  const GOERLI_CONTRACTS = lib.contracts.tonstarter.goerli;
  const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  const { l1Signer, l2Signer, ourAddr } = await setup();

  crossChainMessenger = new optimismSDK.CrossChainMessenger({
    l1ChainId: 5, // Goerli value, 1 for mainnet
    l2ChainId: 5050, // Goerli value, 10 for mainnet
    l1SignerOrProvider: l1Signer,
    l2SignerOrProvider: l2Signer,
  });

  const l1Bridge = new ethers.Contract(bridge.l1Bridge, BridgeABI, l1Signer);
  const l2Bridge = new ethers.Contract(bridge.l2Bridge, BridgeABI, l2Signer);

  projectInfo = {
    projectId: ethers.constants.Zero,
    tokenOwner: ourAddr,
    projectOwner: ourAddr,
    initialTotalSupply: ethers.utils.parseEther("100000"),
    tokenType: 0, // non-mintable
    projectName: "TokamakBakery",
    tokenName: "TokamakBakery",
    tokenSymbol: "TKB",
    l1Token: ethers.constants.AddressZero,
    l2Token: ethers.constants.AddressZero,
    l2Type: 0,
    addressManager: addressManager,
  };

  // change with the project id of you want to know
  projectInfo.projectId = ethers.BigNumber.from("6");
  //   projectInfo.projectId = await deployedL1.L1ProjectManager.projectCount();

  const L1Brige = new ethers.Contract(
    bridge.l1Bridge,
    L1BridgeJson.abi,
    l1Signer
  );
  const L1Messenger = new ethers.Contract(
    messenger.l1Messenger,
    l1MessengerJson.abi,
    l1Signer
  );
  const L1ProjectManager = new Contract(
    GOERLI_CONTRACTS.L1ProjectManagerProxy,
    L1ProjectManagerJson.abi,
    l1Signer
  );

  const L2ProjectManager = new Contract(
    TITAN_GOERLI_CONTRACTS.L2ProjectManagerProxy,
    L2ProjectManagerJson.abi,
    l2Signer
  );

  let projects = await L1ProjectManager.projects(projectInfo.projectId);
  projectInfo.l1Token = projects.l1Token;
  projectInfo.l2Token = projects.l2Token;

  if (
    projects.l1Token == ethers.constants.Zero ||
    projects.l2Token == ethers.constants.Zero
  ) {
    console.log("l1Token or l2Token is zero address");
    return;
  }

  // token
  l1ERC20 = new ethers.Contract(projectInfo.l1Token, IERC20Json.abi, l1Signer);
  l2ERC20 = new ethers.Contract(projectInfo.l2Token, IERC20Json.abi, l2Signer);

  // set l2 vaults : deposit과 설정을 나누어서 해야 한다.
  //  한 트랜잭션으로 보냈음에도 despoit은 되고, sendMessage는 실행되지 않았다.
  // first : 100 token from L1 to L2
  // depositL1TokenToL2(uint256 projectId, uint256 amount, uint32 _minGasLimit)
  const topic = L1Brige.interface.getEventTopic("ERC20DepositInitiated");
  const topic1 = L1Messenger.interface.getEventTopic("SentMessage");
  const amount = ethers.utils.parseEther("50");

  let totalSupply = await l1ERC20.totalSupply();
  let balanceOf = await l1ERC20.balanceOf(L1ProjectManager.address);
  console.log("totalSupply", totalSupply);
  console.log("balanceOf", balanceOf);

  let allowance = await l1ERC20.allowance(ourAddr, bridge.l1Bridge);
  console.log("allowance", allowance);

  if (allowance.lt(amount)) {
    await (await l1ERC20.approve(bridge.l1Bridge, totalSupply)).wait();
    allowance = await l1ERC20.allowance(ourAddr, bridge.l1Bridge);
    console.log("allowance", allowance);
  }

  //-------------
  const start = new Date();

  const response = await L1ProjectManager.depositAndSetL2Vaults(
    projectInfo.projectId,
    amount,
    ethers.BigNumber.from("200000"),
    ethers.BigNumber.from("200000")
  );

  console.log(
    `depositAndSetL2Vaults transaction hash (on L1): ${response.hash}`
  );
  console.log(`\tMore info: https://goerli.etherscan.io/tx/${response.hash}`);
  await response.wait();

  console.log("Waiting for status to change to RELAYED");
  console.log(`Time so far ${(new Date() - start) / 1000} seconds`);

  await crossChainMessenger.waitForMessageStatus(
    response.hash,
    optimismSDK.MessageStatus.RELAYED
  );
  console.log(
    `depositAndSetL2Vaults took ${(new Date() - start) / 1000} seconds\n\n`
  );
  console.log(`\n`);

  console.log(`deployedL2.L2ProjectManager.addres`, L2ProjectManager.address);
  let balanceOfL2ProjectManager = await l2ERC20.balanceOf(
    L2ProjectManager.address
  );
  let tmp = await L2ProjectManager.tmp();

  console.log(
    "L2ProjectManager ",
    l2ERC20.address,
    ", balanceOf",
    balanceOfL2ProjectManager
  );
  console.log(`L2ProjectManager tmp`, tmp);

  // let res = await deployedL2.L2ProjectManager.balanceOf(projectInfo.l2Token);
  // console.log(`res `, res)
  // await res.wait();

  // let tmp = await deployedL2.L2ProjectManager.tmp()
  // console.log(`L2ProjectManager tmp`, tmp)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
