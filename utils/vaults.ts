import {
  CLI_Answer,
  TableResult,
  TokenAllocationPerEachVault,
  VaultSchedule,
  VaultTypeOnCommand,
  VaultTypesOnI,
  Vaults,
} from "../types";
import chalk from "chalk";
import commafy from "./commafy";
import BigNumber from "bignumber.js";
import { convertToTimestamp, formatDate, getFutureDate } from "./date";

const validateTokenAllocation = (totalAllocation: number) => {};
const sumArraysAtIndex = (arr1: any[], arr2: any[]) =>
  arr1.map((value, index) => value + arr2[index]);

export const getVaultSchedule = (answer: CLI_Answer) => {
  const { totalRound, vaults, roundInterval, roundIntervalUnit, claimStart } =
    answer;
  let row: any[] = [];
  const ratios = 100 / Number(totalRound);
  const getTokenAllocation = (tokenAmount: number) => {
    return Math.floor(tokenAmount * ratios) / 100;
  };
  for (let i = 0; i < Number(totalRound); i++) {
    row.push([
      chalk.bold(
        `Round ${i + 1} - ${getFutureDate(claimStart, i, roundIntervalUnit)}`
      ),
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

  //checkSum
  result
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

export const setUpClaim = (result: TableResult, vaults: Vaults): Vaults => {
  const roundTokenAllocation = result.map((obj) => {
    const filteredObj = Object.fromEntries(
      Object.entries(obj).filter(([key]) => !key.includes("timezone"))
    );
    return filteredObj;
  });
  const roundDates = result
    .map((obj) => {
      const filteredObj = Object.fromEntries(
        Object.entries(obj).filter(([key]) => key.includes("timezone"))
      );
      return filteredObj;
    })
    .map((obj) => {
      const dateStr = Object.values(obj)[0];
      // Find the position of 'Round'
      const startIndex = dateStr.indexOf("Round");

      // Extract timestamp using slice
      const timestampWithColorCodes = dateStr.slice(startIndex + 10);

      // Remove color codes using replace
      const filteredDate = timestampWithColorCodes.replace(/\x1B\[\d+m/g, "");
      return filteredDate;
    });

  const publicParams: VaultSchedule = [];
  const liquidityParams: VaultSchedule = [];
  const ecosystemParams: VaultSchedule = [];
  const teamParams: VaultSchedule = [];
  const tonstarterParams: VaultSchedule = [];

  roundTokenAllocation.map((data, index) => {
    for (const key in data) {
      const tokenAllocation = data[key];
      const params = {
        tokenAllocation: Number(tokenAllocation),
        date: convertToTimestamp(roundDates[index]),
      };
      switch (key) {
        case "Public":
          publicParams.push(params);
          break;
        case "Liquidity":
          liquidityParams.push(params);
          break;
        case "Ecosystem":
          ecosystemParams.push(params);
          break;
        case "Team":
          teamParams.push(params);
          break;
        case "TONStarter":
          tonstarterParams.push(params);
          break;
        default:
          break;
      }
    }
  });

  vaults.Public.claimSchedule = publicParams;
  vaults.Liquidity.claimSchedule = liquidityParams;
  vaults.Ecosystem.claimSchedule = ecosystemParams;
  vaults.Team.claimSchedule = teamParams;
  vaults.TONStarter.claimSchedule = tonstarterParams;

  return vaults;
};
