import { ethers, Contract } from "ethers";
//@ts-ignore
// import lib from "titan.github.io";

//abis
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json";
import { getBlockExplorerWithHash } from "../utils/blockExplorerMsg.js";
import { CLI_Answer, Deployed } from "../../types";
import { addressManager } from "../../constants/common_func";
import { DeployedProjectInfo } from "../../types";
import { ZERO_ADDRESS, walletSetup } from "../../constants";

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
  let projectInfo: DeployedProjectInfo = {
    tokenOwner: adminAddress,
    projectOwner: adminAddress,
    initialTotalSupply: ethers.utils.parseEther(initialTotalSupply),
    addressManager,
    tokenType: 0, // non-mintable
    tokenName,
    tokenSymbol,
    projectName,
    projectId: undefined,
    l1Token: undefined,
    l2Token: undefined,
  };
  const GOERLI_CONTRACTS = {
    L1ProjectManagerProxy: "0x3eD0776A8E323a294cd704c02a349ca1B83554da",
  };
  const { l1Signer } = await walletSetup();

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
  const log = receipt.logs.find((x: any) => x.topics.indexOf(topic) >= 0);
  const deployedEvent = L1ProjectManager.interface.parseLog(log);
  projectInfo.projectId = deployedEvent.args.projectId;
  projectInfo.l1Token = deployedEvent.args.l1Token;
  projectInfo.l2Token = ZERO_ADDRESS;

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
async function createProjectL1(answers: CLI_Answer): Promise<Deployed> {
  try {
    const result = await main(answers);
    return { state: true, result };
  } catch (e) {
    return { state: false, result: undefined };
  }
}

export default createProjectL1;
