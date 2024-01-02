function Header() {
  return (
    <header
      style={{
        display: "flex",
        width: "100%",
        justifyContent: "flex-end",
        paddingRight: 20,
      }}
    >
      <button
        style={{
          width: 134,
          height: 35,
          background: "#0070ED",
          color: "#fff",
          border: "none",
          borderRadius: 10,
          borderColor: "none",
          cursor: "pointer",
        }}
      >
        Connect Wallet
      </button>
    </header>
  );
}

export default Header;
