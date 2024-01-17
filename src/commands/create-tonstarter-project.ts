import ethers from "ethers";
import inquirer from "inquirer";
import ora, { Ora } from "ora";
import dotenv from "dotenv";
// import createProjectL1 from "../contracts/deploy/0.create_project_L1.js";
// import setTokenOnL2 from "../contracts/deploy/1.set_token_L2.js";
//@ts-ignore
import welcomeMsg from "../contracts/utils/welcomeMsg.js";
import { CLI_Answer, DeployContractStep } from "../types/command.js";
// import distributeToken from "../contracts/deploy/2.distribute_token.js";

dotenv.config({ path: "../.env" });

const privateKey = process.env.WALLET_PK;
const account = process.env.WALLET_ADDRESS;

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

function validateNumberValue(value: any) {
  const valid =
    !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0;
  return (
    valid ||
    "Please enter a valid positive number for the initial total supply."
  );
}

function getnerateProject(answers: CLI_Answer) {
  if (!ethers.utils.isAddress(answers.adminAddress)) {
    throw new Error("Invalid admin address");
  }

  const content = `Hello, ${answers.userName}! Your project name is ${answers.projectName}.`;
  console.log(content);
  console.log("Project generated successfully!");
}

const questions = [
  {
    type: "input",
    name: "projectName",
    message: "Enter your project name:",
  },
  {
    type: "input",
    name: "tokenName",
    message: "Enter your token name:",
  },
  {
    type: "input",
    name: "tokenSymbol",
    message: "Enter your token symbol:",
  },
  {
    type: "input",
    name: "initialTotalSupply",
    message: "Enter initial total supply of your token:",
    validate: (value: any) => validateNumberValue(value),
  },
  {
    type: "input",
    name: "initialTotalSupply",
    message: "Enter initial total supply of your token:",
  },
  {
    type: "confirm",
    name: "adminAddress",
    message: `Are you certain about using this account as the project owner? (${account})`,
  },
];

async function animateEllipsis(
  text: string,
  asyncTask: () => any,
  interval: number
) {
  const spinner = ora(text).start();

  const animation = setInterval(() => {
    const currentText = spinner.text;
    if (currentText.endsWith("...")) {
      spinner.text = text;
    } else {
      spinner.text += ".";
    }
  }, interval);

  try {
    // Execute the asynchronous task
    const result = await asyncTask();
    clearInterval(animation);
    spinner.succeed(); // Change spinner to a success state after completing the task
    return result;
  } catch (error) {
    clearInterval(animation);
    spinner.fail("Error occurred"); // Change spinner to a failure state on error
    throw error;
  }
}

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

interface IDeploy {
  answer: CLI_Answer;
  updateStep(step: DeployContractStep): DeployContractStep;
  deployProject(): Promise<boolean>;
}

class DeployProjectL1 implements IDeploy {
  private answer: CLI_Answer;
  constructor(answer: CLI_Answer) {
    this.answer = answer;
  }
  updateStep(step: DeployContractStep): DeployContractStep {
    return step;
  }
  async deployProject() {
    return false;
  }
}

class CreateProject {
  private _isLoading: boolean;
  private _step: DeployContractStep;

  constructor() {
    this._isLoading = false;
    this._step = 1;
  }

  get isLoading(): boolean {
    return this._isLoading;
  }

  get step(): DeployContractStep {
    return this._step;
  }

  set isLoading(isLoading: boolean) {
    this._isLoading = isLoading;
  }

  set setStep(step: DeployContractStep) {
    this._step = step;
  }
}

async function init() {
  const CLI = new CreateProject();
  welcomeMsg();
  console.log("Starting to create a TONStarter project...");

  try {
    let answers = await inquirer.prompt(questions);
    if (!answers.adminAddress || process.env.WALLET_ADDRESS === undefined) {
      return console.log("The admin account should be defined");
    }

    console.log({ ...answers, adminAddress: account });

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
