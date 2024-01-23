import { ethers, Contract } from "ethers";
//@ts-ignore
// import lib from "titan.github.io";

//abis
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json";
import { setup } from "../setup/index.js";
//@ts-ignore
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg.js";
import { CLI_Answer } from "../../types";

/**
 * @typedef {Object} CLI_Answer
 * @property {string} projectName - The name of the project.
 * @property {string} tokenName - The name of the token.
 * @property {string} tokenSymbol - The symbol of the token.
 * @property {number} initialTotalSupply - The initial total supply of the token.
 * @property {string} adminAddress - The admin account address.
 */

/**
 * @param {Answers}
 */
async function main(answers: CLI_Answer) {
  const {
    adminAddress,
    tokenName,
    tokenSymbol,
    initialTotalSupply,
    projectName,
  } = answers;
  let projectInfo = {
    ...projectInfoTemp,
    tokenOwner: adminAddress,
    projectOwner: adminAddress,
    initialTotalSupply: ethers.utils.parseEther(initialTotalSupply),
    tokenName,
    tokenSymbol,
    projectName,
  };
  const GOERLI_CONTRACTS = {
    L1ProjectManagerProxy: "0x",
  };
  const { l1Signer } = await setup();

  if (!l1Signer) return;

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

  console.log("\r");
  console.log("Your project successfully deployed!!");
  console.log(
    "See your tx 👉",
    getBlockExplorerWithHash("sepolia", receipt.transactionHash)
  );

  const topic = L1ProjectManager.interface.getEventTopic("CreatedProject");
  const log = receipt.logs.find((x) => x.topics.indexOf(topic) >= 0);
  const deployedEvent = L1ProjectManager.interface.parseLog(log);
  projectInfo.projectId = deployedEvent.args.projectId;
  projectInfo.l1Token = deployedEvent.args.l1Token;

  // const tokenContract = new ethers.Contract(
  //   projectInfo.l1Token,
  //   ERC20AJson.abi,
  //   l1Signer
  // );
  // const totalSupply = await tokenContract.totalSupply();
  // const balanceOf = await tokenContract.balanceOf(L1ProjectManager.address);

  return projectInfo;
}

/**
 * @typedef {Object} Answers
 * @property {string} projectName - The name of the project.
 * @property {string} tokenName - The name of the token.
 * @property {string} tokenSymbol - The symbol of the token.
 * @property {number} initialTotalSupply - The initial total supply of the token.
 * @property {string} adminAddress - The admin account address.
 */

/**
 * @param {Answers} answers
 */
async function createProjectL1(answers: CLI_Answer): Promise<boolean> {
  try {
    await main(answers).catch((e) => {
      console.log("**err at main()**", e);
      process.exitCode = 1;
    });
    return true;
  } catch (e) {
    return false;
  }
}

export default createProjectL1;
