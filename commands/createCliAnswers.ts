import ethers from "ethers";
import inquirer from "inquirer";
//@ts-ignore
import TableInput from "../lib/inquirer-table-input";
import DatePrompt from "inquirer-date-prompt";
import { getValuesFromTokenAllocation, setUpClaim } from "../utils/vaults";
import { CLI_Answer } from "../types";
import {
  firstQuestions,
  getScheduling,
  getSecondQuestions,
  validateAccount,
} from "./questions";

export const createCliAnswers = async (
  accountAddress: string
): Promise<CLI_Answer> => {
  //@ts-ignore
  inquirer.registerPrompt("date", DatePrompt);
  inquirer.registerPrompt("table-input", TableInput);

  const validatedAccountInfo = await inquirer
    .prompt(validateAccount)
    .then(async (answer: CLI_Answer) => {
      if (answer.recevingAddress) {
        return answer;
      } else {
        const newAddressAnswer = await inquirer.prompt({
          type: "input",
          name: "newReceivingAddress",
          message: "Please enter the new address to receive fundraising TON:",
          validate: (value) => {
            if (!ethers.utils.isAddress(value)) {
              return "Invalid address format! Please enter a valid address on Ethereum.";
            }
            return true;
          },
        });

        const newAddress = newAddressAnswer.newReceivingAddress;
        return { ...answer, recevingAddress: newAddress };
      }
    });
  const initialResponse = await inquirer.prompt(firstQuestions);
  const followUpQuestionForTokenAllocation =
    getSecondQuestions(initialResponse);
  const secondResponse = await inquirer
    .prompt(followUpQuestionForTokenAllocation)
    .then((answer) => {
      return { ...initialResponse, ...answer };
    });

  const cliAnswersForFinalRound: CLI_Answer = {
    ...initialResponse,
    adminAddress: accountAddress,
    recevingAddress: validatedAccountInfo.recevingAddress,
    totalRound:
      initialResponse.totalRoundChoice === "Other"
        ? Number(initialResponse.totalRoundInput)
        : Number(initialResponse.totalRoundChoice),
    vaults: getValuesFromTokenAllocation(
      Number(initialResponse.totalTokenAllocation),
      secondResponse
    ),
  };
  const answersForScheduling = await inquirer
    .prompt(getScheduling(cliAnswersForFinalRound))
    .then((answer) => {
      return { ...secondResponse, ...answer };
    });
  const scheduledVaults = setUpClaim(
    answersForScheduling.schedule.result,
    cliAnswersForFinalRound.vaults
  );

  const finalCliAnswers: CLI_Answer = {
    ...cliAnswersForFinalRound,
    vaults: scheduledVaults,
  };

  // const finalCheck = await inquirer.prompt([
  //   {
  //     type: "confirm",
  //     name: "finalCheck",
  //     message: `Are you certain you want to deploy your project with the provided data?}`,
  //   },
  // ]);

  //     if (!finalCheck.finalCheck) {
  //       console.error("Oops, please try it again with new parameters you want");
  //       return Error();
  //     }

  return finalCliAnswers;
};
