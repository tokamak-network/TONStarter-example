import { Contract } from "ethers";
// import lib from "titan.github.io";

//abis
import L2TokenFactoryJson from "../abis/titan-goerli/L2TokenFactory-old.json";
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg.js";
import { Deployed, DeployedProjectInfo } from "../../types";
import { ZERO_ADDRESS, walletSetup } from "../../constants";

// set L2 Token
async function main(project: DeployedProjectInfo) {
  // const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  const TITAN_GOERLI_CONTRACTS = {
    L2TokenFactory: "0x42773cf37d7e2757a41d14ca130cd1ac8ac5064a",
  };
  const { l2Signer } = await walletSetup();
  let projectInfo = project;

  if (projectInfo.l2Token == ZERO_ADDRESS && l2Signer) {
    const L2TokenFactory = new Contract(
      TITAN_GOERLI_CONTRACTS.L2TokenFactory,
      L2TokenFactoryJson.abi,
      l2Signer
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

    const topic = L2TokenFactory.interface.getEventTopic(
      "StandardL2TokenCreated"
    );
    const log = receipt.logs.find((x: any) => x.topics.indexOf(topic) >= 0);
    const deployedEvent = L2TokenFactory.interface.parseLog(log);

    projectInfo.l2Token = deployedEvent.args.l2Token;
    return projectInfo;
  }
  throw new Error("Already set l2Token");
}

async function setTokenOnL2(
  projectInfo: DeployedProjectInfo | undefined
): Promise<Deployed> {
  try {
    if (!projectInfo)
      throw new Error("projectInfo is undefined at setTokenOnL2");
    const result = await main(projectInfo);
    return { state: true, result };
  } catch (e) {
    return { state: false };
  }
}

export default setTokenOnL2;
