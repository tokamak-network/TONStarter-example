import dotenv from "dotenv";
import chalk from "chalk";
import { CLI_Answer } from "../types";
import { ethers } from "ethers";
import commafy from "../utils/commafy";

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
  {
    type: "input",
    name: "tokenSymbol",
    message: "Enter your token symbol:",
  },
  {
    type: "input",
    name: "initialTotalSupply",
    message: "Enter initial total supply of your token:",
    validate: (value: string) => validateNumberValue(value),
  },
  {
    type: "input",
    name: "tokenAllocation",
    message: (answers: CLI_Answer) =>
      `How many token do you want to allocate for this IDO (You are planning to mint ${chalk.greenBright(
        commafy(answers.initialTotalSupply)
      )} ${chalk.greenBright(answers.tokenSymbol)}) :`,
    validate: (value: string) => validateNumberValue(value),
  },
  // {
  //   type: "date",
  //   name: "round1Start",
  //   message: "When do you like to start Round 1 (for STOS holders)?",
  // },
  // {
  //   type: "date",
  //   name: "round1End",
  //   message: "When do you like to end Round 1 (for STOS holders)?",
  // },
  // {
  //   type: "date",
  //   name: "round2Start",
  //   message: "When do you like to start Round 2 (for anyone)?",
  // },
  // {
  //   type: "date",
  //   name: "round2End",
  //   message: "When do you like to end Round 1 (for STOS holders)?",
  // },
];

export const getSecondQuestions = (answer: CLI_Answer) => {
  const propotions = "";
  return [
    {
      type: "table-input",
      name: "distribution",
      message: `distirubte your tokens to each vault (total supply : ${answer.initialTotalSupply})`,
      infoMessage: `Navigate and Edit`,
      hideInfoWhenKeyPressed: true,
      freezeColumns: 1,
      decimalPoint: ".",
      decimalPlaces: 2,
      selectedColor: chalk.yellow,
      editableColor: chalk.bgYellow.bold,
      editingColor: chalk.bgGreen.bold,
      columns: [
        { name: chalk.cyan.bold("Round"), value: "nf" },
        { name: chalk.cyan.bold("Public Sale"), value: "nf" },
        { name: chalk.cyan.bold("Initial Liquidity"), value: "customer" },
        {
          name: chalk.cyan.bold(`${answer.tokenSymbol}-TOS`),
          value: "city",
          editable: "text",
        },
        {
          name: chalk.cyan.bold("TON-TOS"),
          value: "quantity",
          editable: "text",
        },
        {
          name: chalk.cyan.bold("TON Staker"),
          value: "pricing",
          editable: "text",
        },
        {
          name: chalk.cyan.bold("TOS Staker"),
          value: "pricing",
          editable: "text",
        },
      ],
      rows: [
        [
          chalk.bold("1"),
          "Shinji Masumoto",
          "2024.02.01 17:00",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("2"),
          "Arnold Mcfee",
          "New York",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("2"),
          "Arnold Mcfee",
          "New York",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("2"),
          "Arnold Mcfee",
          "New York",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("2"),
          "Arnold Mcfee",
          "New York",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("2"),
          "Arnold Mcfee",
          "New York",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("2"),
          "Arnold Mcfee",
          "New York",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("2"),
          "Arnold Mcfee",
          "New York",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
      ],
      validate: () => false /* See note ¹ */,
      tranformer: (input: any, answer: any) => {},
    },
  ];
};
