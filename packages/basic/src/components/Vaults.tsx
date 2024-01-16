import HeadTitle from "./public/HeadTitle";

function VaultInfoRow({
  title,
  content,
}: {
  title: string;
  content: string | number;
}) {
  return (
    <div
      style={{
        fontSize: 14,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{title}</span>
      <span>{content}</span>
    </div>
  );
}

function VaultCard() {
  return (
    <div
      style={{
        width: "200px",
        height: "250px",
        border: "1px solid black",
        borderRadius: 16,
        display: "flex",
        padding: "10px",
        flexDirection: "column",
      }}
    >
      <span>Public</span>
      <span
        style={{
          width: "100%",
          height: "1px",
          backgroundColor: "black",
          marginTop: 5,
          marginBottom: 5,
        }}
      ></span>
      <VaultInfoRow title="Token" content={"10,000,000 TKB"} />
      <VaultInfoRow title="Round 1." content={"5,000,000 TKB"} />
      <VaultInfoRow title="Round 2." content={"5,000,000 TKB"} />
      <VaultInfoRow title="Liquidity" content={"1,000,000 TKB"} />
    </div>
  );
}

function Vaults() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HeadTitle title="Vaults"></HeadTitle>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          columnGap: "10px",
        }}
      >
        <VaultCard />
        <VaultCard />
        <VaultCard />
        <VaultCard />
        <VaultCard />
      </div>
      {/* <div style={{ display: "flex", flexDirection: "column" }}>
          <button>Public</button>
          <button>Initial Liquidity</button>
          <button>TON Staker</button>
          <button>TOS Staker</button>
          <button>TOS-TON LP</button>
          <button>TOS-TKB LP</button>
        </div>
        <article style={{ display: "flex" }}>
          <table>
            <th>Token</th>
            <th>Public Round 1</th>
            <th>Public Round 2</th>
            <th>go</th>
          </table>
        </article> */}
    </section>
  );
}

export default Vaults;
