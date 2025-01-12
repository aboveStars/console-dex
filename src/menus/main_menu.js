import inquirer from "inquirer";
import ItuScanMenu from "./ituscan_menu.js";
import PoolsMenu from "./pools_menu.js";
import WalletMenu from "./wallet_menu.js";
import figlet from "figlet";
import chalk from "chalk";
import SwapMenu from "./swap_menu.js";
import AddLiquidityMenu from "./add_liquidity_menu.js";

async function MainMenu() {
  console.log(
    "----------------------------------------------------------------------------------------"
  );
  const choices = [
    "My Balances",
    "Pool Reserves",
    "ITUScan",
    "Swap Tokens",
    "Add Liquidity",
    "Exit",
  ];
  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Main Menu",
      choices: choices,
    },
  ]);
  if (choice === "My Balances") {
    await WalletMenu();
  } else if (choice === "ITUScan") {
    await ItuScanMenu();
  } else if (choice === "Pool Reserves") {
    await PoolsMenu();
  } else if (choice === "Swap Tokens") {
    await SwapMenu();
  } else if (choice === "Add Liquidity") {
    await AddLiquidityMenu();
  } else if (choice === "Exit") {
    figlet("See You!", "Small", function (err, data) {
      if (!err) {
        console.log(chalk.cyan(data));
        process.exit(0);
      } else {
        process.exit(0);
      }
    });
  }
}

export default MainMenu;
