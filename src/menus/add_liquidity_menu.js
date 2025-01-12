import inquirer from "inquirer";
import ora from "ora";
import {
  addLiquidity,
  getLiquidityAmount,
} from "../utils/web3/dexFunctions.js";
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

    const { expectedLiquidity, requiredOtherToken } = await getLiquidityAmount(
      amount,
      true
    );

    const { confirm } = await inquirer.prompt([
      {
        type: "list",
        name: "confirm",
        message:
          "You will receive " +
          expectedLiquidity +
          " ITULiquidity Tokens" +
          " for " +
          amount +
          " TokenA and " +
          requiredOtherToken +
          " tokenB. " +
          " Do you confirm the transaction?",
        choices: ["Yes", "No"],
      },
    ]);
    if (confirm !== "Yes") {
      console.log("Transaction canceled.");
      return await AddLiquidityMenu();
    }

    const spinner = ora("Processing...").start();

    // Need to get liquidity details...

    await addLiquidity(amount, requiredOtherToken);

    spinner.succeed("Liquidity added successfully!");
  } else if (choice === 2) {
    const { amount } = await inquirer.prompt([
      {
        type: "input",
        name: "amount",
        message: "Enter your " + "Token1" + " amount:",
      },
    ]);
    const { expectedLiquidity, requiredOtherToken } = await getLiquidityAmount(
      amount,
      false
    );
    const { confirm } = await inquirer.prompt([
      {
        type: "list",
        name: "confirm",
        message:
          "You will receive " +
          expectedLiquidity +
          " ITULiquidity Tokens" +
          " for " +
          amount +
          " TokenB and " +
          requiredOtherToken +
          " tokenA. " +
          " Do you confirm the transaction?",
        choices: ["Yes", "No"],
      },
    ]);
    if (confirm !== "Yes") {
      console.log("Transaction canceled.");
      return await AddLiquidityMenu();
    }

    const spinner = ora("Processing...").start();

    await addLiquidity(amount, requiredOtherToken);

    spinner.succeed("Liquidity added successfully!");
  } else if (choice === "Return Back") {
    return await MainMenu();
  }

  return await MainMenu();
}

export default AddLiquidityMenu;
