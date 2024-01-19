import dotenv from "dotenv";
import chalk from "chalk";
import { CLI_Answer, VaultTypesOnI } from "../types";
import { ethers } from "ethers";
import commafy from "../utils/commafy";
import { distributeToken } from "../utils/distributeToken";

dotenv.config({ path: "../.env" });

const privateKey = process.env.WALLET_PK;
const account = process.env.WALLET_ADDRESS;

function validateNumberValue(value: any) {
  const valid =
    !isNaN(parseFloat(value)) && isFinite(value) && parseFloat(value) > 0;
  return (
    valid ||
    "Please enter a valid positive number for the initial total supply."
  );
}

export const firstQuestions = [
  // {
  //   type: "confirm",
  //   name: "adminAddress",
  //   message: `Are you certain about using this account as the project owner? (${account})`,
  //   validate: (value: string) => ethers.utils.isAddress(value),
  // },
  // {
  //   type: "input",
  //   name: "projectName",
  //   message: "Enter your project name:",
  // },
  // {
  //   type: "input",
  //   name: "tokenName",
  //   message: "Enter your token name:",
  // },
  // {
  //   type: "input",
  //   name: "tokenSymbol",
  //   message: "Enter your token symbol:",
  // },
  // {
  //   type: "input",
  //   name: "initialTotalSupply",
  //   message: "Enter initial total supply of your token:",
  //   validate: (value: string) => validateNumberValue(value),
  // },
  // {
  //   type: "input",
  //   name: "tokenAllocation",
  //   message: (answers: CLI_Answer) =>
  //     `How many token do you want to allocate for this IDO (You are planning to mint ${chalk.greenBright(
  //       commafy(answers.initialTotalSupply)
  //     )} ${chalk.greenBright(answers.tokenSymbol)}) :`,
  //   validate: (value: string) => validateNumberValue(value),
  // },
  {
    type: "date",
    name: "round1Start",
    message: "When do you like to start Round 1 (for STOS holders)?",
  },
  {
    type: "date",
    name: "round1End",
    message: "When do you like to end Round 1 (for STOS holders)?",
    validate: (endDate: any, answers: any) => {
      console.log(endDate, answers);
    },
  },
  {
    type: "date",
    name: "round2Start",
    message: "When do you like to start Round 2 (for anyone)?",
  },
  {
    type: "date",
    name: "round2End",
    message: "When do you like to end Round 1 (for STOS holders)?",
  },
];

export const getSecondQuestions = (answer: CLI_Answer) => {
  const { distributedAmounts, recalculatedPercentage } = distributeToken(
    Number(answer.tokenAllocation)
  );
  const getName = (title: VaultTypesOnI, percentage: number) => {
    // return `${chalk.cyan.bold(title)} (${percentage}%)`;
    return `${chalk.cyan.bold(title)}`;
  };

  const generateColumns = () => [
    {
      name: chalk.cyan.bold("   "),
    },
    {
      name: getName("Public", recalculatedPercentage.Public),
      value: "tokenAllocation_Public",
      editable: "number",
    },
    {
      name: getName("Liquidity", recalculatedPercentage.Liquidity),
      value: "tokenAllocation_InitialLiquidity",
      editable: "number",
    },
    {
      name: getName("Ecosystem", recalculatedPercentage.Ecosystem),
      value: "tokenAllocation_ProjectTos",
      editable: "number",
    },
    {
      name: getName("Team", recalculatedPercentage.Team),
      value: "tokenAllocation_TonTos",
      editable: "number",
    },
    {
      name: getName("TONStarter", recalculatedPercentage.TONStarter),
      value: "pricing",
      editable: "number",
    },
  ];

  return [
    {
      type: "table-input",
      name: "distribution",
      message: `distirubte your tokens to each vault (Total Allocated Token : ${commafy(
        answer.tokenAllocation
      )} ${
        answer.tokenSymbol
      }) \n Minimum required percentage for each vault: \n
      - Public : 30%,
      - Liquidity : 15%,
      - Ecosystem : 35%,
      - Team : 15%,
      - TONStarter: 5%
      `,
      infoMessage: `\n Navigate and Edit if you want`,
      hideInfoWhenKeyPressed: true,
      freezeColumns: 1,
      decimalPoint: ".",
      decimalPlaces: 2,
      selectedColor: chalk.yellow,
      editableColor: chalk.bgYellow.bold,
      editingColor: chalk.bgGreen.bold,
      columns: generateColumns(),
      rows: [
        [
          chalk.bold(`Token Allocation (%)`),
          recalculatedPercentage.Public,
          recalculatedPercentage.Liquidity,
          recalculatedPercentage.Ecosystem,
          recalculatedPercentage.Team,
          recalculatedPercentage.TONStarter,
        ],
      ],
      // validate: () => false /* See note ¹ */,
      validate: (value: any) => {
        false;
      },
    },
  ];
};
