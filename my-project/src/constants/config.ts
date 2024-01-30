import { ethers } from "ethers";

export const MODE = process.env.REACT_APP_MODE;
export const L2_TOKEN = process.env.REACT_APP_L2TOKEN;
export const PROVIDER_URL = process.env.REACT_APP_TITAN_PROVIDER;
export const TITAN_PROVIDER = new ethers.providers.JsonRpcProvider(
  PROVIDER_URL
);
