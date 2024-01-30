import HeadTitle from "./public/HeadTitle";
import TxTable from "./public/TxTable";

function Transactions() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HeadTitle title="Transactions"></HeadTitle>
      <TxTable />
    </section>
  );
}

export default Transactions;
