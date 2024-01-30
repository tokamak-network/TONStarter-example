import { MultiChainSDK as TitanSDK } from "tokamak-multichain";
import { MODE } from "./config";

export const MultiChainSDK = new TitanSDK({
  chainId: MODE === "DEV" ? 5050 : 55004,
});
