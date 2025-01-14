import { ethers } from "ethers";
import { dex, signer } from "./contractSetup.js";
import { approveToken, token0, token1 } from "./tokenFunctions.js";

async function getReserves() {
  const [reserve0, reserve1] = await dex.getReserves();
  return {
    token0: ethers.formatEther(reserve0),
    token1: ethers.formatEther(reserve1),
  };
}

async function getLiquidityAmount(amountA, isToken0) {
  try {
    // Convert string amounts to BigNumber if necessary
    const amount = ethers.toBigInt(amountA);

    // Call the contract's getLiquidityAmount function
    const [requiredOtherToken, expectedLiquidity] =
      await dex.getLiquidityAmount(amount, isToken0);

    return {
      requiredOtherToken,
      expectedLiquidity,
    };
  } catch (error) {
    // Handle specific error cases
    if (error.message.includes("Invalid input amount")) {
      throw new Error("The input amount must be greater than 0");
    } else if (error.message.includes("Invalid required amount")) {
      throw new Error("The calculated required amount is too small");
    }

    // Rethrow any other errors
    throw error;
  }
}

async function addLiquidity(amount0, amount1) {
  const amt0 = ethers.parseEther(amount0.toString());
  const amt1 = ethers.parseEther(amount1.toString());

  // Approve tokens
  await approveToken(token0, dex.target, amount0);
  await approveToken(token1, dex.target, amount1);

  // Add liquidity
  const tx = await dex.addLiquidity(amt0, amt1);
  return await tx.wait();
}

async function getSwapAmount(amountIn, token0ToToken1) {
  try {
    const amtIn = ethers.parseEther(amountIn.toString());
    const expectedAmount = await dex.getSwapAmount(amtIn, token0ToToken1);
    return ethers.formatEther(expectedAmount);
  } catch (error) {
    console.error("Error calculating swap amount:", error.message);
    throw error;
  }
}

async function swap(amountIn, minAmountOut, token0ToToken1) {
  const amtIn = ethers.parseEther(amountIn.toString());
  const minAmtOut = ethers.parseEther(minAmountOut.toString());

  // Approve token
  if (token0ToToken1) {
    await approveToken(token0, dex.target, amountIn);
  } else {
    await approveToken(token1, dex.target, amountIn);
  }

  // Perform swap
  const tx = await dex.swap(amtIn, minAmtOut, token0ToToken1);
  return await tx.wait();
}

async function getLiquidity(optionalPublicAddress) {
  const liquidity = await dex.getUserLiquidity(
    optionalPublicAddress ? optionalPublicAddress : signer.address
  );
  return ethers.formatEther(liquidity);
}

async function removeLiquidity(amount) {
  const amt = ethers.parseEther(amount.toString());
  const tx = await dex.removeLiquidity(amt);
  return await tx.wait();
}

export {
  getReserves,
  addLiquidity,
  swap,
  getLiquidity,
  removeLiquidity,
  getSwapAmount,
  getLiquidityAmount,
};
