import welcomeMsg from "../contracts/utils/welcomeMsg.js";
import { getAccountAddress } from "../constants/environment.js";
import {
  CreateProject,
  DeployProjectOnL1,
  SetTokenOnL2,
  SetUpVaults,
} from "./deployProject";
import { createCliAnswers } from "./createCliAnswers";
import { cloneTemplate } from "./cloneTemplate.js";

const accountAddress = getAccountAddress();

/**
 * Initializes the TONStarter project creation process.
 * This function prompts the user for necessary information, deploys contracts, and sets up project vaults.
 * @returns {Promise<void>} A promise that resolves when the project creation process is complete.
 */
async function init(): Promise<void> {
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
    const setUpVaults = new SetUpVaults(CLI);

    CLI.addStepChangeListener([deployOnL1, setTokenOnL2, setUpVaults]);
    const deployed = await CLI.start();

    if (deployed && CLI.projectInfo) {
      return cloneTemplate(CLI.projectInfo);
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
