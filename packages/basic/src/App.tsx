import "./App.css";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Participate from "./components/Participate";
import Transactions from "./components/Transactions";

function App() {
  return (
    <div
      className="App"
      style={{
        fontFamily: "Roboto Mono",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Header />
      <Overview />
      <Participate />
      <Transactions />
    </div>
  );
}

export default App;
