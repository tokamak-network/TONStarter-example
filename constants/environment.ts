import { ethers, Wallet } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const l1Url = process.env.RPC_SEPOLIA;
const l2Url = process.env.RPC_TITAN_SEPOLIA;
const privateKey = process.env.WALLET_PK;

export const getWallet = () => {
  if (!privateKey) return null;

  const wallet = new ethers.Wallet(privateKey);
  return wallet;
};

export const getAccountAddress = () => {
  const wallet = getWallet();
  return wallet?.address;
};

export const getL1Provider = async () => {
  const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1Url);
  return l1RpcProvider;
};

export const getL2Provider = async () => {
  const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2Url);
  return l2RpcProvider;
};

export const getSigners = async () => {
  try {
    const l1EndPoint = process.env.RPC_SEPOLIA;
    const l2EndPoint = process.env.RPC_TITAN_SEPOLIA;
    const l1RpcProvider = new ethers.providers.JsonRpcProvider(l1EndPoint);
    const l2RpcProvider = new ethers.providers.JsonRpcProvider(l2EndPoint);

    if (!privateKey) return undefined;

    const l1Wallet = new ethers.Wallet(privateKey, l1RpcProvider);
    const l2Wallet = new ethers.Wallet(privateKey, l2RpcProvider);

    return { l1Wallet, l2Wallet };
  } catch (e) {
    console.log("**err at getSigners()**", e);
  }
};

export const walletSetup = async (): Promise<{
  wallets:
    | {
        l1Wallet: Wallet;
        l2Wallet: Wallet;
      }
    | undefined;
  l1Signer: Wallet | undefined;
  l2Signer: Wallet | undefined;
  ourAddr: string | undefined;
}> => {
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
};
