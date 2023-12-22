import ethers from "ethers";
import inquirer from "inquirer";
import ora from "ora";
import dotenv from "dotenv";
import createProjectL1 from "../contracts/deploy/0.create_project_L1.js";
import setTokenOnL2 from "../contracts/deploy/1.set_token_L2.js";
import welcomeMsg from "../contracts/utils/welcomeMsg.js";
import distributeToken from "../contracts/deploy/2.distribute_token.js";

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

function validateNumberValue(value) {
  const valid =
    !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0;
  return (
    valid ||
    "Please enter a valid positive number for the initial total supply."
  );
}

function getnerateProject(answers) {
  if (!ethers.isAddress(answers.adminAddress)) {
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
    validate: (value) => validateNumberValue(value),
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
  // {
  //   type: "list",
  //   name: "framwork",
  //   message: "Choose your framework",
  //   choices: ["React", "Nextjs", "Remix"],
  // },
  // {
  //   type: "list",
  //   name: "language",
  //   message: "Choose your language (Typescript recommended)",
  //   choices: ["Typescript", "Javascript"],
  // },
  //   {
  //     type: "input",
  //     name: "adminAddress",
  //     message: "Enter admin account address(EOA):",
  //     validate: (input) => {
  //       return input && isAddress(input)
  //         ? true
  //         : "Please enter an correct admin account address.";
  //     },
  //   },
];

async function simulateAsyncOperation(asyncFunction) {
  const spinner = ora("Loading...").start();
  const result = await asyncFunction();
  spinner.stop();
  return result;
}

async function init() {
  welcomeMsg();
  console.log("Starting to create a TONStarter project...");

  try {
    let answers = await inquirer.prompt(questions);
    if (!answers.adminAddress || process.env.WALLET_ADDRESS === undefined) {
      return console.log("The admin account should be defined");
    }

    console.log({ ...answers, adminAddress: account });

    const finalCheck = await inquirer.prompt([
      {
        type: "confirm",
        name: "finalCheck",
        message: `Are you certain you want to deploy your project with the provided data?}`,
      },
    ]);

    if (!finalCheck.finalCheck) {
      console.error("Oops, please try it again with new parameters you want");
      return Error();
    }

    answers = { ...answers, adminAddress: process.env.WALLET_ADDRESS };
    const spinner0 = ora("Deploying a project on L1...").start();
    const step0Result = await createProjectL1(answers);
    spinner0.stop();
    // console.log("step0Result", step0Result);
    const spinner1 = ora("Setting your token on L2...").start();
    const step1Result = await setTokenOnL2(step0Result);
    // console.log("step1Result", step1Result);
    spinner1.stop();
    const spinner2 = ora(
      "Distributing your token to each vault on L1..."
    ).start();
    const step2Result = await distributeToken(step1Result);
    // console.log("step2Result", step2Result);
    spinner2.stop();

    // Continue with the logic based on the user's answers
    //createApp()
    //Run()
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1); // Exit the process if there's an error in the input
  }
}

init();
