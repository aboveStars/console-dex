import chalk from "chalk";
import inquirer from "inquirer";
import { getTokenBalances } from "../utils/web3/tokenFunctions.js";
import MainMenu from "./main_menu.js";
import ituScanMenu from "./ituscan_menu.js";
import { getLiquidity } from "../utils/web3/dexFunctions.js";

async function WalletMenu(optionalPublicAddress, inScan) {
  let balances = await getTokenBalances(optionalPublicAddress);

  let liquidityTokenValue = await getLiquidity(optionalPublicAddress);

  balances = { ...balances, ITULiquidityToken: liquidityTokenValue };

  Object.entries(balances).forEach(([token, amount]) => {
    console.log(`${chalk.blue.bold(token)}: ${chalk.yellow.bold(amount)}`);
  });

  const { choice } = await inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "Wallet Menu",
      choices: [{ name: "Return Back" }],
    },
  ]);

  if (choice === "Return Back") {
    if (inScan) {
      return await ituScanMenu();
    }
    return await MainMenu();
  }
}

export default WalletMenu;
