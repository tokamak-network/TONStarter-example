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
      <article style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex" }}>
          <input style={{ borderRadius: 10 }}></input>
          <button>claim</button>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          <div>
            <span>your TON balance : </span>
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
    </section>
  );
}

export default Participate;
