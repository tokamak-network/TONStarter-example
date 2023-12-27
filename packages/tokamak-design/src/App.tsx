import { Contract, ethers } from "ethers";
import Page from "./components/Page";
import L2ProjectManagerJson from "./abi/L2ProjectManager.json";
import { useTONStarter } from "./hooks/useTONStarter";

export type TokamakDesignProps = {
  l2Token?: string;
  title?: string;
  description?: string;
};

function App(props: TokamakDesignProps) {
  // const TITAN_GOERLI_CONTRACTS = lib.contracts.tonstarter["titan-goerli"];
  // const contract = new Contract(
  //   "0x",
  //   L2ProjectManagerJson.abi,
  //   new ethers.JsonRpcProvider("https://rpc.titan-goerli.tokamak.network")
  // );

  // const dd = await contract.projectId()
  // const d = useTONStarter();

  return (
    <div className="App">
      <Page {...props} />
    </div>
  );
}

export default App;
