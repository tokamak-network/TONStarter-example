import { CLI_Answer, TokenAllocationPerEachVault, Vaults } from "../types";
import chalk from "chalk";
import commafy from "./commafy";
import BigNumber from "bignumber.js";

const validateTokenAllocation = (totalAllocation: number) => {};
const sumArraysAtIndex = (arr1: any[], arr2: any[]) =>
  arr1.map((value, index) => value + arr2[index]);

export const getVaultSchedule = (answer: CLI_Answer) => {
  const { totalRound, vaults } = answer;
  let row: any[] = [];
  const ratios = 100 / Number(totalRound);
  const getTokenAllocation = (tokenAmount: number) => {
    return Math.floor(tokenAmount * ratios) / 100;
  };
  for (let i = 0; i < Number(totalRound); i++) {
    row.push([
      chalk.bold(`Round ${i + 1}`),
      getTokenAllocation(vaults.Public.tokenAllocation),
      getTokenAllocation(vaults.Liquidity.tokenAllocation),
      getTokenAllocation(vaults.Ecosystem.tokenAllocation),
      getTokenAllocation(vaults.Team.tokenAllocation),
      getTokenAllocation(vaults.TONStarter.tokenAllocation),
    ]);
  }

  const result = row.reduce(
    (acc, current) => sumArraysAtIndex(acc, current),
    Array.from({ length: row[0].length }).fill(0)
  );
  console.log("--result", result);
  const checkSum = result
    .filter((_: number | string, index: number) => index !== 0)
    .map((value: number) => Number(value.toFixed(2)))
    .map((value: number, index: number) => {
      const targetKey = Object.keys(vaults)[index] as keyof Vaults;
      const targetValue = vaults[targetKey];
      if (Number(targetValue.tokenAllocation) !== value) {
        row[row.length - 1][index + 1] += new BigNumber(
          targetValue.tokenAllocation
        )
          .minus(value)
          .toNumber();
      }
    });

  return row;
};

export const getValuesFromTokenAllocation = (
  totalTokenAllocation: number,
  value: TokenAllocationPerEachVault
) => {
  const obj = value.tokenAllocationPerEachVault.result[0];
  const getTokenAllocationForEachVault = (ratio: number) => {
    return Math.floor(totalTokenAllocation * (ratio / 100));
  };

  const values: Vaults = {
    Public: {
      tokenAllocation: getTokenAllocationForEachVault(
        Number(obj.tokenAllocation_Public)
      ),
      claimSchedule: undefined,
    },
    Liquidity: {
      tokenAllocation: getTokenAllocationForEachVault(
        Number(obj.tokenAllocation_InitialLiquidity)
      ),
      claimSchedule: undefined,
    },
    Ecosystem: {
      tokenAllocation: getTokenAllocationForEachVault(
        Number(obj.tokenAllocation_Ecosystem)
      ),
      claimSchedule: undefined,
    },
    Team: {
      tokenAllocation: getTokenAllocationForEachVault(
        Number(obj.tokenAllocation_Team)
      ),
      claimSchedule: undefined,
    },
    TONStarter: {
      tokenAllocation: getTokenAllocationForEachVault(
        Number(obj.tokenAllocation_TONStarter)
      ),
      claimSchedule: undefined,
    },
  };

  return values;
};
