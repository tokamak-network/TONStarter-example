import { Contract, ethers } from "ethers";
import L2ProjectManagerJson from "../abi/L2ProjectManager.json";

export function useTONStarter() {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.titan-goerli.tokamak.network"
  );
  const contract = new Contract(
    "0x7A4710394a7f96028a517A9846b5aC3ECE6ebC62",
    L2ProjectManagerJson.abi,
    provider
  );
  return contract;
}
