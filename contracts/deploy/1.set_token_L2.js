import { Contract } from "ethers";
import lib from "titan.github.io";

//abis
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json" assert { type: "json" };
import L2ProjectManagerJson from "../abis/titan-goerli/L2ProjectManager.json" assert { type: "json" };
import L2TokenFactoryJson from "../abis/titan-goerli/L2TokenFactory-old.json" assert { type: "json" };
import { setup } from "../setup/index.js";
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg.js";

// set L2 Token
async function main(project) {
  const GOERLI_CONTRACTS = lib.contracts.tonstarter.goerli;
  const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  const { l1Signer, l2Signer, ourAddr } = await setup();
  let projectInfo = project;

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

  if (projectInfo.l2Token == "0x0000000000000000000000000000000000000000") {
    /// L2 : create L2 token
    const topic = L2TokenFactory.interface.getEventTopic(
      "StandardL2TokenCreated"
    );

    const receipt = await (
      await L2TokenFactory.createL2Token(
        projectInfo.projectOwner,
        projectInfo.l1Token,
        projectInfo.tokenName,
        projectInfo.tokenSymbol,
        projectInfo.projectName
      )
    ).wait();

    console.log("\r");
    console.log("Your token successfully listed on L2!!");
    console.log(
      "See your tx 👉",
      getBlockExplorerWithHash("titanSepolia", receipt.transactionHash)
    );

    const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
    const deployedEvent = L2TokenFactory.interface.parseLog(log);

    projectInfo.l2Token = deployedEvent.args.l2Token;
    return projectInfo;
  }
  console.log("Already set l2Token");
}

async function setTokenOnL2(projectInfo) {
  const result = await main(projectInfo).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  return result;
}

export default setTokenOnL2;
