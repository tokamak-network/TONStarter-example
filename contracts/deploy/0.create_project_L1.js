import { ethers, Contract } from "ethers";
import lib from "titan.github.io";

//abis
import ERC20AJson from "../abis/ERC20A.json" assert { type: "json" };
import L1ProjectManagerJson from "../abis/goerli/L1ProjectManager.json" assert { type: "json" };
import { setup } from "../setup/index.js";
import { projectInfo as projectInfoTemp } from "../config.js";

// Answers: {
//   projectName: 'd',
//   tokenName: 'd',
//   tokenSymbol: 'd',
//   initialTotalSupply: '1',
//   address: true
// }

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
async function main(answers) {
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
  const GOERLI_CONTRACTS = lib.contracts.tonstarter.goerli;
  const { l1Signer } = await setup();

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
async function createProjectL1(answers) {
  const result = await main(answers).catch((e) => {
    console.log("**err at main()**", e);
    process.exitCode = 1;
  });
  return result;
}

export default createProjectL1;
