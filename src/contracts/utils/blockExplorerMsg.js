import { blockExplorer } from "../config.js";

function getBlockExplorerWithHash(networkName, hash) {
  return `${blockExplorer[networkName]}/tx/${hash}`;
}

export { getBlockExplorerWithHash };
