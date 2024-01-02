import "./TxTable.css";

type TableTxData = {
  tx: string;
  block: number;
  account: string;
  type: "PublicRound1" | "PublicRound2" | "Claim";
  amount: number;
  date: string;
}[];

function TxTable() {
  const dummyData: TableTxData = [
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
    {
      tx: "0xfb4f1c",
      block: 5136990,
      account: "0xAA5a562B2C3CA302aFa35db0b94738A7384d6aA3",
      type: "Claim",
      amount: 1000,
      date: "2024. 01. 02 08:43:59 (+09:00)",
    },
  ];
  return (
    <div>
      <table className="custom-table">
        <thead>
          <tr>
            <th className="column-tx">Tx</th>
            <th className="column-block">BLOCK</th>
            <th className="column-account">ACCOUNT</th>
            <th className="column-type">TYPE</th>
            <th className="column-amount">AMOUNT</th>
            <th className="column-date">Date</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((data) => {
            return (
              <tr>
                <td className="column-tx">{data.tx}</td>
                <td className="column-block">{data.block}</td>
                <td className="column-account">{data.account}</td>
                <td className="column-type">{data.type}</td>
                <td className="column-amount">{data.amount}</td>
                <td className="column-date">{data.date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          columnGap: "25px",
          textAlign: "center",
          height: "32px",
          lineHeight: "32px",
          marginTop: "20px",
        }}
      >
        <button>FIRST</button>
        <button>{"<"}</button>
        <span style={{ marginTop: 9 }}>1 OF 156</span>
        <button>{">"}</button>
        <button>LAST</button>
      </div>
    </div>
  );
}

export default TxTable;
