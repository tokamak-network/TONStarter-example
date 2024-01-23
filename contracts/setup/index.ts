import { Wallet } from "ethers";
import { getSigners } from "../../constants/common_func.js";
import dotenv from "dotenv";
dotenv.config();

async function setup(): Promise<{
  wallets:
    | {
        l1Wallet: Wallet;
        l2Wallet: Wallet;
      }
    | undefined;
  l1Signer: Wallet | undefined;
  l2Signer: Wallet | undefined;
  ourAddr: string | undefined;
}> {
  try {
    const wallets = await getSigners();
    const l1Signer = wallets?.l1Wallet;
    const l2Signer = wallets?.l2Wallet;
    const ourAddr = wallets?.l1Wallet.address;

    return { wallets, l1Signer, l2Signer, ourAddr };
  } catch (e) {
    console.log(`**error while it's setup**`);
    console.log("The Private Key might not be properly set up.");
    console.log(e);
    throw e;
  }
}

function getContract() {}

export { setup, getContract };
