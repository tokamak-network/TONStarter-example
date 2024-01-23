import ora, { Ora } from "ora";
import dotenv from "dotenv";

// import createProjectL1 from "../contracts/deploy/0.create_project_L1.js";
// import setTokenOnL2 from "../contracts/deploy/1.set_token_L2.js";
//@ts-ignore
import welcomeMsg from "../contracts/utils/welcomeMsg.js";
import { getWallet } from "../utils/wallet";
import { CreateProject, DeployProjectL1 } from "./deployProject";
import { createCliAnswers } from "./createCliAnswers.js";

dotenv.config({ path: "../.env" });

const privateKey = process.env.WALLET_PK;
const wallet = getWallet(privateKey);
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

// async function init() {
//   welcomeMsg();
//   console.log("Starting to create a TONStarter project...");

//   try {
//     let answers = await inquirer.prompt(questions);
//     if (!answers.adminAddress || process.env.WALLET_ADDRESS === undefined) {
//       return console.log("The admin account should be defined");
//     }

//     console.log({ ...answers, adminAddress: account });

//     const finalCheck = await inquirer.prompt([
//       {
//         type: "confirm",
//         name: "finalCheck",
//         message: `Are you certain you want to deploy your project with the provided data?}`,
//       },
//     ]);

//     if (!finalCheck.finalCheck) {
//       console.error("Oops, please try it again with new parameters you want");
//       return Error();
//     }

//     answers = { ...answers, adminAddress: process.env.WALLET_ADDRESS };
//     const spinner0 = ora("Deploying a project on L1...").start();

//     const deployedProject = await animateEllipsis(
//       "Deploying a project on L1...",
//       () => createProjectL1(answers),
//       400
//     );

//     // await new Promise((resolve) => setTimeout(resolve, 10000));

//     const setTokens = await animateEllipsis(
//       "Setting your token on L2...",
//       () => setTokenOnL2(deployedProject),
//       400
//     );

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
    console.log(CLI.step);

    const deployOnL1 = new DeployProjectL1(CLI);
    await deployOnL1.deployProject();
    console.log(CLI.step);

    // const finalCheck = await inquirer.prompt([
    //   {
    //     type: "confirm",
    //     name: "finalCheck",
    //     message: `Are you certain you want to deploy your project with the provided data?}`,
    //   },
    // ]);

    // if (!finalCheck.finalCheck) {
    //   console.error("Oops, please try it again with new parameters you want");
    //   return Error();
    // }

    // answers = { ...answers, adminAddress: process.env.WALLET_ADDRESS };
    // const spinner0 = ora("Deploying a project on L1...").start();

    console.log(
      "🚀All process is done. You just need to wait for depositing your tokens."
    );
  } catch (error: unknown) {
    if (error instanceof Error) console.error("Error:", error.message);
    process.exit(1); // Exit the process if there's an error in the input
  }
}

init();
