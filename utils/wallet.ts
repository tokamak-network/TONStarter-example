import { ethers } from "ethers";

export const getWallet = (privateKey: string | undefined) => {
  if (!privateKey) return null;
  const wallet = new ethers.Wallet(privateKey);
  return wallet;
};
