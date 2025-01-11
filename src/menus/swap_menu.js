import inquirer from "inquirer";
import { swap } from "../utils/web3/dexFunctions.js";
import MainMenu from "./main_menu.js";
import ora from "ora";

async function SwapMenu() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Swap Menu",
      choices: [
        {
          name: "TokenA" + "->" + "TokenB",
          value: 1,
        },
        {
          name: "TokenB" + "->" + "TokenA",
          value: 2,
        },
        "Return Back",
      ],
    },
  ]);

  if (choice === 1) {
    const { amount } = await inquirer.prompt([
      {
        type: "input",
        name: "amount",
        message: "Enter your " + "TokenA" + " amount:",
      },
    ]);

    const spinner = ora("Processing...").start(); // Start spinner

    await swap(amount, 0, true);
    spinner.succeed("Swap successful!");
  } else if (choice === 2) {
    const { amount } = await inquirer.prompt([
      {
        type: "input",
        name: "amount",
        message: "Enter your " + "TokenB" + " amount:",
      },
    ]);

    const spinner = ora("Processing...").start(); // Start spinner

    await swap(amount, 0, false);

    spinner.succeed("Swap successful!");
  } else if (choice === "Return Back") {
    return await MainMenu();
  }

  return await MainMenu();
}

export default SwapMenu;
