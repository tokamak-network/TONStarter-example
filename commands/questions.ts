import dotenv from "dotenv";
import chalk from "chalk";
import { CLI_Answer } from "../types";

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
    type: "confirm",
    name: "adminAddress",
    message: `Are you certain about using this account as the project owner? (${account})`,
  },
  {
    type: "date",
    name: "round1Start",
    message: "When do you like to start Round 1 (for STOS holders)?",
  },
  {
    type: "date",
    name: "round1End",
    message: "When do you like to end Round 1 (for STOS holders)?",
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
        { name: chalk.cyan.bold("NF Number"), value: "nf" },
        { name: chalk.cyan.bold("Customer"), value: "customer" },
        { name: chalk.cyan.bold("City"), value: "city", editable: "text" },
        {
          name: chalk.cyan.bold("Quantity"),
          value: "quantity",
          editable: "text",
        },
        {
          name: chalk.cyan.bold("Pricing"),
          value: "pricing",
          editable: "text",
        },
      ],
      rows: [
        [
          chalk.bold("8288"),
          "Shinji Masumoto",
          "2024.02.01 17:00",
          `${answer.projectName}`,
          `${answer.projectName}`,
        ],
        [
          chalk.bold("8289"),
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
