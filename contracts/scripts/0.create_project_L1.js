import { ethers, Contract } from "ethers";
import lib from "titan.github.io";

//abis
import ERC20AJson from "../abis/ERC20A.json" assert { type: "json" };
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json" assert { type: "json" };
import { setup } from "../setup/index.js";
import { addressManager } from "./common_func.js";
import { projectInfo } from "../config.js";

let projectInfo = projectInfo;

async function main() {
  const GOERLI_CONTRACTS = lib.contracts.tonstarter.goerli;
  const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  const { l1Signer, ourAddr } = await setup();

  const L1ProjectManager = new Contract(
    GOERLI_CONTRACTS.L1ProjectManagerProxy,
    L1ProjectManagerJson.abi,
    l1Signer
  );

  // create project on L1
  const receipt = await (
    await L1ProjectManager.createProject(
      projectInfo.tokenOwner,
      projectInfo.projectOwner,
      projectInfo.addressManager,
      projectInfo.initialTotalSupply,
      projectInfo.tokenType,
      projectInfo.projectName,
      projectInfo.tokenName,
      projectInfo.tokenSymbol
    )
  ).wait();

  const topic = L1ProjectManager.interface.getEventTopic("CreatedProject");
  const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
  const deployedEvent = L1ProjectManager.interface.parseLog(log);
  projectInfo.projectId = deployedEvent.args.projectId;
  projectInfo.l1Token = deployedEvent.args.l1Token;

  const tokenContract = new ethers.Contract(
    projectInfo.l1Token,
    ERC20AJson.abi,
    l1Signer
  );
  const totalSupply = await tokenContract.totalSupply();
  const balanceOf = await tokenContract.balanceOf(L1ProjectManager.address);
  console.log("totalSupply", totalSupply);
  console.log("balanceOf", balanceOf);
}

main().catch((e) => {
  console.log("**err at main()**", e);
  process.exitCode = 1;
});
