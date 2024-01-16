import HeadTitle from "./public/HeadTitle";

function Participate() {
  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HeadTitle title="Participate"></HeadTitle>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          columnGap: "25px",
        }}
      >
        <article style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex" }}>
            <input style={{ borderRadius: 10 }}></input>
            <button>claim</button>
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
          >
            <div>
              <span>your TON : </span>
            </div>
            <div>
              <span>Puchased : </span>
            </div>
            <div>
              <span>Available to Claim : </span>
            </div>
            <div>
              <span>Remained Amount : </span>
            </div>
          </div>
        </article>
        <section
          style={{
            fontSize: 13,
            height: "100%",
            display: "flex",
            marginTop: "25px",
          }}
        >
          <article style={{ display: "flex", flexDirection: "column" }}>
            <span>TIER 1 (10,000 sTOS) : 2,000,000 TKB</span>
            <span>TIER 2 (5,000 sTOS) : 1,000,000 TKB</span>
            <span>TIER 3 (3,000 sTOS) : 1,000,000 TKB</span>
            <span>TIER 4 (1,000 sTOS) : 1,000,000 TKB</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "12px",
                fontSize: 15,
              }}
            >
              <span>Your sTOS: 5,000</span>
              <span style={{ color: "#0070ED", fontWeight: "bold" }}>
                Your tier: 2
              </span>
            </div>
          </article>
          <div
            style={{
              borderLeft: "1px solid black",
              marginLeft: "15px",
              marginRight: "15px",
            }}
          ></div>
          <article
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Round 1 - 5,000,000 TKB </span>
            <span> 2024.01.01 17:00:00 ~ 2024.01.07 16:59:59 </span>
            <span>Round 2 - 5,000,000</span>
            <span>2024.01.01 17:00:00 ~ 2024.01.07 16:59:59</span>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "auto",
                fontSize: 15,
              }}
            >
              <span style={{ color: "#0070ED", fontWeight: "bold" }}>
                Current status : Round 1
              </span>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}

export default Participate;
