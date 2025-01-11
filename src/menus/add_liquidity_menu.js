import inquirer from "inquirer";
import ora from "ora";
import { addLiquidity } from "../utils/web3/dexFunctions.js";
import MainMenu from "./main_menu.js";

async function AddLiquidityMenu() {
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Add Liquidity Menu",
      choices: [
        { name: "Token0", value: 1 },
        { name: "Token1", value: 2 },
        "Return Back",
      ],
    },
  ]);

  if (choice === 1) {
    const { amount } = await inquirer.prompt([
      {
        type: "input",
        name: "amount",
        message: "Enter your " + "Token0" + " amount:",
      },
    ]);

    const spinner = ora("Processing...").start();

    // Need to get liquidity details...

    await addLiquidity(amount, amount);

    spinner.succeed("Liquidity added successfully!");
  } else if (choice === 2) {
    const { amount } = await inquirer.prompt([
      {
        type: "input",
        name: "amount",
        message: "Enter your " + "Token1" + " amount:",
      },
    ]);

    const spinner = ora("Processing...").start();

    await addLiquidity(amount, amount);

    spinner.succeed("Liquidity added successfully!");
  } else if (choice === "Return Back") {
    return await MainMenu();
  }

  return await MainMenu();
}

export default AddLiquidityMenu;
