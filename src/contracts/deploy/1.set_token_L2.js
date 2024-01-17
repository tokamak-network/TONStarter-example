import { Contract } from "ethers";
import lib from "titan.github.io";

//abis
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json" assert { type: "json" };
import L2ProjectManagerJson from "../abis/titan-goerli/L2ProjectManager.json" assert { type: "json" };
import L2TokenFactoryJson from "../abis/titan-goerli/L2TokenFactory-old.json" assert { type: "json" };
import { setup } from "../setup/index.js";
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg.js";
import { ethers, BigNumber } from "ethers";
import { addressManager } from "../scripts/common_func.js";

const testData = {
  projectId: "06",
  tokenOwner: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  projectOwner: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
  initialTotalSupply: "100",
  tokenType: 0,
  projectName: "test",
  tokenName: "test",
  tokenSymbol: "test",
  l1Token: "0x4cB14C88233346c32e922d6F791c96eDBfbE74FA",
  l2Token: "0x0000000000000000000000000000000000000000",
  l2Type: 0,
  addressManager: "0xEFa07e4263D511fC3a7476772e2392efFb1BDb92",
};
// set L2 Token
async function main(project) {
  const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];

  const { l2Signer } = await setup();
  let projectInfo = project;

  if (
    projectInfo.l2Token == "0x0000000000000000000000000000000000000000" &&
    l2Signer
  ) {
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
    const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
    const deployedEvent = L2TokenFactory.interface.parseLog(log);

    projectInfo.l2Token = deployedEvent.args.l2Token;
    return projectInfo;
  }
  return console.log("Already set l2Token");
}

async function setTokenOnL2(projectInfo) {
  const result = await main(projectInfo).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  return result;
}

export default setTokenOnL2;
