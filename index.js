#!/usr/bin/env node
import chalk from "chalk";
import MainMenu from "./src/menus/main_menu.js";
import figlet from "figlet";

async function startApp() {
  figlet("ITU BlockChain", function (err, data) {
    if (!err) {
      console.log(chalk.cyan(data));
      console.log(chalk.blue("Greetings, how can we help?"));
      MainMenu();
    } else {
      MainMenu();
    }
  });
}

// Uygulamayı başlat
startApp().catch((err) => {
  console.error("An error occurred:", err);
  process.exit(1);
});
