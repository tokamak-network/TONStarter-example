export const integerDivision = (tokenAllocation: number, division: number) => {
  const allocation = Math.floor(tokenAllocation / division);
  return {
    allocation,
    remainder: tokenAllocation - allocation * division,
  };
};
