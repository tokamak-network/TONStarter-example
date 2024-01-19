import { VaultTypesOnI } from "../types";
import commafy from "./commafy";

/**
 * @description totalAllocation will be divided with this ratios
 * @link https://tokamaknetwork.gitbook.io/home/02-service-guide/tonstarter/launch-simplified/step-2-token-economy
 */

const ratio: { [key in VaultTypesOnI]: number } = {
  Public: 30,
  Liquidity: 15,
  Ecosystem: 35,
  Team: 15,
  TONStarter: 5,
};

export const distributeToken = (
  tokenAmount: number
): {
  distributedAmounts: {
    [key in VaultTypesOnI]: number;
  };
  recalculatedPercentage: {
    [key in VaultTypesOnI]: number;
  };
} => {
  const totalRatio = Object.values(ratio).reduce((acc, val) => acc + val, 0);

  const distributedAmounts: { [key in VaultTypesOnI]: number } = {
    Public: 0,
    Liquidity: 0,
    Ecosystem: 0,
    Team: 0,
    TONStarter: 0,
  };

  for (const key in ratio) {
    if (ratio.hasOwnProperty(key)) {
      const percentage = ratio[key as keyof typeof ratio] / totalRatio;
      const amount = Math.floor(tokenAmount * percentage);
      distributedAmounts[key as keyof typeof ratio] = amount;
    }
  }

  // Adjust for any rounding errors by distributing the remaining tokens
  const remainingTokens =
    tokenAmount -
    Object.values(distributedAmounts).reduce((acc, val) => acc + val, 0);

  distributedAmounts.Public += remainingTokens;

  // Recalculate percentages based on the final distributed amounts
  const recalculatedPercentage: { [key in VaultTypesOnI]: number } = {
    Public: 0,
    Liquidity: 0,
    Ecosystem: 0,
    Team: 0,
    TONStarter: 0,
  };
  for (const key in distributedAmounts) {
    if (distributedAmounts.hasOwnProperty(key)) {
      recalculatedPercentage[key as keyof typeof ratio] = Number(
        commafy(
          (distributedAmounts[key as keyof typeof ratio] / tokenAmount) * 100
        )
      );
    }
  }

  return { distributedAmounts, recalculatedPercentage };
};
