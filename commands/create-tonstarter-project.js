import { isAddress } from "ethers";
import inquirer from "inquirer";

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

function getnerateProject(answers) {
  // Use 'answers' object to perform actions based on user input
  // For example, create files, folders, templates, etc.

  //checksum whether this admin account address is valid or not
  if (!isAddress(answers.adminAddress)) {
    throw new Error("Invalid admin address");
  }

  // Here's an example of creating a file with the user's input
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
    type: "list",
    name: "framwork",
    message: "Choose your framework",
    choices: ["React", "Nextjs", "Remix"],
  },
  {
    type: "list",
    name: "language",
    message: "Choose your language (Typescript recommended)",
    choices: ["Typescript", "Javascript"],
  },
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

async function init() {
  console.log("Starting to create a TONStarter project...");
  try {
    const answers = await inquirer.prompt(questions);
    console.log("Answers:", answers);
    // Continue with the logic based on the user's answers
    //createApp()
    //Run()
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1); // Exit the process if there's an error in the input
  }
}

init();
