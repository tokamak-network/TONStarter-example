import { ethers, Contract } from "ethers";
import lib from "titan.github.io";

//abis
import ERC20AJson from "../abis/ERC20A.json" assert { type: "json" };
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json" assert { type: "json" };
import L2ProjectManagerJson from "../abis/titan-goerli/L2ProjectManager.json" assert { type: "json" };
import L2TokenFactoryJson from "../abis/titan-goerli/L2TokenFactory-old.json" assert { type: "json" };
import L2StandardERC20 from "../abis/L2StandardERC20.json" assert { type: "json" };

import { setup } from "../setup/index.js";
import { addressManager } from "./common_func.js";

// Global variable because we need them almost everywhere
let projectInfo;

// set L2 Token
async function main() {
  const GOERLI_CONTRACTS = lib.contracts.tonstarter.goerli;
  const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  const { l1Signer, l2Signer, ourAddr } = await setup();
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
  const L2TokenFactory = new Contract(
    TITAN_GOERLI_CONTRACTS.L2TokenFactory,
    L2TokenFactoryJson.abi,
    l2Signer
  );

  // projectInfo.projectId = ethers.BigNumber.from("6");
  projectInfo.projectId = await L1ProjectManager.projectCount();

  console.log("projectId", projectInfo.projectId.toString());
  let projects = await L1ProjectManager.projects(projectInfo.projectId);
  let l2Token = await L2ProjectManager.tokenMaps(projectInfo.l1Token);
  console.log(projects);
  projectInfo.l1Token = projects.l1Token;

  if (l2Token == "0x0000000000000000000000000000000000000000") {
    /// L2 : create L2 token
    const topic = L2TokenFactory.interface.getEventTopic(
      "StandardL2TokenCreated"
    );

    console.log("projectInfo", projectInfo);

    const receipt = await (
      await L2TokenFactory.createL2Token(
        projectInfo.projectOwner,
        projectInfo.l1Token,
        projectInfo.tokenName,
        projectInfo.tokenSymbol,
        projectInfo.projectName
      )
    ).wait();

    const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
    const deployedEvent = L2TokenFactory.interface.parseLog(log);

    projectInfo.l2Token = deployedEvent.args.l2Token;
    console.log("StandardL2TokenCreated  L2Token", projectInfo.l2Token);

    let l2Token_CONTRACT = new ethers.Contract(
      projectInfo.l2Token,
      L2StandardERC20.abi,
      l2Signer
    );
    let l1Token = await l2Token_CONTRACT.l1Token();
    return console.log("l1Token in L2Token", l1Token);
  }
  console.log("Already set l2Token");
  return console.log("L2Token", l2Token);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
