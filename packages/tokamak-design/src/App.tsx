import { Contract, ethers } from "ethers";
import Page from "./components/Page";
import L2ProjectManagerJson from "./abi/L2ProjectManager.json";
//@ts-ignore
import lib from "titan.github.io";
interface TokamakDesignProps {
  publicValutAddress?: string;
}

function App(props: TokamakDesignProps) {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc.titan-goerli.tokamak.network"
  );
  const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  const contract = new Contract(
    TITAN_GOERLI_CONTRACTS.L2ProjectManagerProxy,
    L2ProjectManagerJson.abi,
    provider
  );

  // const dd = await contract.projectId()

  console.log("contract", contract);

  return (
    <div className="App">
      <Page />
    </div>
  );
}

export default App;
