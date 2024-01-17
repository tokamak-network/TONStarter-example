import chalk from "chalk";
import inquirer from "inquirer";
//@ts-ignore
import TableInput from "../lib/inquirer-table-input";
import DatePrompt from "inquirer-date-prompt";

inquirer.registerPrompt("table-input", TableInput);
//@ts-ignore
inquirer.registerPrompt("date", DatePrompt);

inquirer
  .prompt([
    {
      type: "table-input",
      name: "pricing",
      message: "PRICING",
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
          editable: "number",
        },
        {
          name: chalk.cyan.bold("Pricing"),
          value: "pricing",
          editable: "decimal",
        },
      ],
      rows: [
        [chalk.bold("8288"), "Shinji Masumoto", "2024.02.01 17:00", 1, 68.03],
        [chalk.bold("8289"), "Arnold Mcfee", "New York", 4, 125.85],
      ],
      validate: () => false /* See note ¹ */,
    },
    {
      type: "date",
      name: "go",
      // ...
    },
  ])
  .then((answers) => {
    console.log(answers);
  });
