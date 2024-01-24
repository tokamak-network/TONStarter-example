// import createProjectL1 from "../contracts/deploy/0.create_project_L1.js";
// import setTokenOnL2 from "../contracts/deploy/1.set_token_L2.js";
//@ts-ignore
import welcomeMsg from "../contracts/utils/welcomeMsg.js";
import { getWallet } from "../constants/environment.js";
import {
  CreateProject,
  DeployProjectOnL1,
  SetTokenOnL2,
} from "./deployProject";
import { createCliAnswers } from "./createCliAnswers";
import { cloneTemplate } from "./cloneTemplate.js";

const wallet = getWallet();
const accountAddress = wallet?.address;

/** @typedef {("React", "Nextjs", "Remix")} Framework */

/** 
 *Generate a new project
 @constructor
 @param {Object} answers
 @param {string} answers.projectName
 @param {Framework} answers.framwork
 @param {string} answers.langauge
 @param {string} answers.adminAddress

*/

//     answers = { ...answers, adminAddress: process.env.WALLET_ADDRESS };
//     const spinner0 = ora("Deploying a project on L1...").start();

//     const distributedTokens = await animateEllipsis(
//       "Distributing tokens to each vault on L1...",
//       () => distributeToken(setTokens),
//       400
//     );

//     console.log(
//       "🚀All process is done. You just need to wait for depositing your tokens."
//     );

//     // Continue with the logic based on the user's answers
//     //createApp()
//     //Run()
//   } catch (error: unknown) {
//     if (error instanceof Error) console.error("Error:", error.message);
//     process.exit(1); // Exit the process if there's an error in the input
//   }
// }

async function init() {
  welcomeMsg();
  console.log("Starting to create a TONStarter project...");

  try {
    if (!accountAddress) {
      return console.log(
        "The admin account should be defined. Please take a look on a env file"
      );
    }

    const cliAnswers = await createCliAnswers(accountAddress);

    //start to deploy contracts through toolkit
    const CLI = new CreateProject(cliAnswers);
    const deployOnL1 = new DeployProjectOnL1(CLI);
    const setTokenOnL2 = new SetTokenOnL2(CLI);

    CLI.addStepChangeListener([deployOnL1, setTokenOnL2]);
    const deployed = await CLI.start();

    if (deployed) {
      return cloneTemplate();
      // return console.log(
      //   "🚀All process is done. You just need to wait for depositing your tokens."
      // );
    }
  } catch (error: unknown) {
    if (error instanceof Error) console.error("Error:", error.message);
    process.exit(1); // Exit the process if there's an error in the input
  }
}

init();
