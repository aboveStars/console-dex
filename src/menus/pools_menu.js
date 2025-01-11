import chalk from "chalk";
import { getReserves } from "../utils/web3/dexFunctions.js";
import MainMenu from "./main_menu.js";
import inquirer from "inquirer";

async function PoolsMenu() {
  const reserves = await getReserves();

  Object.entries(reserves).forEach(([token, amount]) => {
    console.log(`${chalk.blue.bold(token)}: ${chalk.yellow.bold(amount)}`);
  });

  await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Pool Reserves",
      choices: ["Return Back"],
    },
  ]);

  return await MainMenu();
}

export default PoolsMenu;
