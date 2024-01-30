import ethers from "ethers";
import inquirer from "inquirer";
//@ts-ignore
import TableInput from "../lib/inquirer-table-input";
import DatePrompt from "inquirer-date-prompt";
import { getValuesFromTokenAllocation, setUpClaim } from "../utils/vaults";
import { CLI_Answer } from "../types";
import { firstQuestions, getScheduling, getSecondQuestions } from "./questions";

export const createCliAnswers = async (
  accountAddress: string
): Promise<CLI_Answer> => {
  //@ts-ignore
  inquirer.registerPrompt("date", DatePrompt);
  inquirer.registerPrompt("table-input", TableInput);

  const initialResponse = await inquirer.prompt(firstQuestions);
  const followUpQuestionForTokenAllocation =
    getSecondQuestions(initialResponse);
  const secondResponse = await inquirer
    .prompt(followUpQuestionForTokenAllocation)
    .then((answer) => {
      return { ...initialResponse, ...answer };
    });

  console.log("secondResponse", secondResponse);

  const cliAnswersForFinalRound: CLI_Answer = {
    ...initialResponse,
    adminAddress: accountAddress,
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
