import "dotenv/config";
import { ethers } from "ethers";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BasicDEXArtifact = JSON.parse(
  readFileSync(
    join(__dirname, "../../artifacts/contracts/BasicDEX.sol/BasicDEX.json"),
    "utf8"
  )
);
const TestTokenArtifact = JSON.parse(
  readFileSync(
    join(__dirname, "../../artifacts/contracts/TestToken.sol/TestToken.json"),
    "utf8"
  )
);
const deployments = JSON.parse(
  readFileSync(join(__dirname, "../../deployments.json"), "utf8")
);

// Setup provider and signer
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");

const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const dex = new ethers.Contract(deployments.dex, BasicDEXArtifact.abi, signer);

const token0 = new ethers.Contract(
  deployments.token0,
  TestTokenArtifact.abi,
  signer
);

const token1 = new ethers.Contract(
  deployments.token1,
  TestTokenArtifact.abi,
  signer
);

export { provider, signer, dex, token0, token1 };
