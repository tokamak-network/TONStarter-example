import { blockExplorer } from "../../constants/config";

function getBlockExplorerWithHash(
  networkName: keyof typeof blockExplorer,
  hash: string
) {
  return `${blockExplorer[networkName]}/tx/${hash}`;
}

export { getBlockExplorerWithHash };
