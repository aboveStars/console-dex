import { ethers } from "ethers";
import { token0, token1, signer } from "./contractSetup.js";

async function getTokenBalances(optionalPublicAddress) {
  const balance0 = await token0.balanceOf(
    optionalPublicAddress ? optionalPublicAddress : signer.address
  );
  const balance1 = await token1.balanceOf(
    optionalPublicAddress ? optionalPublicAddress : signer.address
  );

  return {
    token0: ethers.formatEther(balance0),
    token1: ethers.formatEther(balance1),
  };
}

async function approveToken(tokenContract, spender, amount) {
  const amt = ethers.parseEther(amount.toString());
  const tx = await tokenContract.approve(spender, amt);
  return await tx.wait();
}

export { getTokenBalances, approveToken, token0, token1 };
