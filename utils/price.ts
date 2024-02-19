const graphqlQuery = `
 query GetTokenMarketData {
    getTokenMarketData(tokenName: "tokamak-network") {
      current_price
    }
  }
`;

export const getTonPrice = async (): Promise<string> => {
  const tonPriceResponse = await fetch(
    "https://coingecko-api.tokamak.network/graphql",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: graphqlQuery,
      }),
    }
  );
  try {
    const tonPriceData = await tonPriceResponse.json();
    return tonPriceData.data.getTokenMarketData.current_price;
  } catch (error) {
    // console.error("Error converting JSON:", error);
    return "failed to fetch price"; // or handle the error in an appropriate way
  }
};
