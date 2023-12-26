import { Flex, Text } from "@chakra-ui/react";
import MockData from "../data/MOCK_TABLE.json";
import { useEffect, useMemo, useState } from "react";
import commafy from "../utils/commafy";

const ClaimTable = () => {
  const [tableData, setTableData] = useState<any>([]);
  const [totalColData, setTotalColData] = useState<any>([]);
  const [columnLength, setColumnLength] = useState<any>([]);

  const vaultsList = useMemo(() => {
    return MockData.vaults.filter(
      (vault) => vault.index !== 2 && vault.index !== 1
    );
  }, []);

  useEffect(() => {
    const claimData = vaultsList.map((vault: any) => {
      if (vault.claim) {
        return { name: vault.vaultName, claim: vault.claim };
      }
    });
    let i = 0;
    claimData.map((data: any) => {
      return (i = data.claim.length > i ? data.claim.length : i);
    });
    setColumnLength(Array.from({ length: i }, (v, i) => i));
    setTableData(claimData);
  }, [vaultsList]);

  useEffect(() => {
    const totals = tableData.map((data: any) => {
      const { claim } = data;
      const result = claim.map((claimData: any) => {
        return claimData.claimTokenAllocation;
      });
      return result;
    });
    const totalSum = [];
    const lengths = totals.map((a: any) => a.length);
    const indexOfLongestArray = lengths.indexOf(Math.max(...lengths));

    if (totals.length === 0) {
      return;
    }
    for (let i = 0; i < totals[indexOfLongestArray].length; i++) {
      let arr: any = [];
      totals.filter((data: any) => {
        const dd = data.filter((d: number, index: number) => {
          if (i === index) {
            return d;
          }
        });
        arr.push(...dd);
      });
      totalSum.push(arr);
    }
    setTotalColData(totalSum);
  }, [tableData]);

  let sumColumn = 0;

  return (
    <Flex
      textAlign="center"
      lineHeight={"38px"}
      mt={"30px"}
      border={"1px solid #373737"}
    >
      <Flex fontSize={12} flexDir={"column"} fontWeight={600} w={"110px"}>
        <Text
          fontSize={12}
          borderRight={"1px solid #373737"}
          fontWeight={500}
          w={"110px"}
          m={0}
        >
          Round
        </Text>
        {columnLength.map((data: any, index: number) => {
          return (
            <Text
              key={index}
              borderTop={"1px solid #373737"}
              borderRight={"1px solid #373737"}
              fontSize={13}
              h={"38px"}
              fontWeight={400}
              bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
              m={0}
            >
              {index > 8 ? index + 1 : `0${index + 1}`}
            </Text>
          );
        })}
        <Text
          fontSize={13}
          color={"white.100"}
          fontWeight={500}
          h={"38px"}
          borderTop={"1px solid #373737"}
          borderRight={"1px solid #373737"}
          bg={totalColData.length % 2 === 0 ? "" : ""}
          m={0}
        >
          Sum
        </Text>
      </Flex>
      <Flex
        w={"2040px"}
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            paddingTop: "5px",
            height: "6px",
          },
          "::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "4px",
          },
          "::-webkit-scrollbar-thumb": {
            background: "#257eee",
            borderRadius: "4px",
          },
        }}
      >
        {tableData.map((data: any, index: number) => {
          const { name, claim } = data;
          return (
            <Flex
              key={index}
              fontSize={12}
              //   color={overviewTableStyle.fontColor[colorMode]}
              flexDir={"column"}
              fontWeight={500}
              minW={name.length > 10 ? "150px" : "135px"}
              m={0}
            >
              <Text
                fontSize={12}
                borderBottom={"1px solid #373737"}
                borderRight={"1px solid #373737"}
                m={0}
              >
                {name === "Liquidity Incentive"
                  ? `${MockData.tokenName}-TOS LP Reward`
                  : name}
              </Text>
              {claim.map((claimData: any, index: number) => {
                return (
                  <Text
                    key={index}
                    borderBottom={"1px solid #373737"}
                    borderRight={"1px solid #373737"}
                    fontSize={13}
                    h={"38px"}
                    fontWeight={400}
                    bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                    m={0}
                  >
                    {claimData.claimTokenAllocation || "-"}
                  </Text>
                );
              })}
              {columnLength.map((data: any, index: number) => {
                if (claim[index] === undefined) {
                  return (
                    <Text
                      key={index}
                      borderBottom={"1px solid #373737"}
                      borderRight={"1px solid #373737"}
                      fontSize={13}
                      h={"38px"}
                      fontWeight={400}
                      bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                      m={0}
                    >
                      {"-"}
                    </Text>
                  );
                }
              })}
              <Text
                fontSize={13}
                fontWeight={400}
                marginTop={"1px solid #373737"}
                borderRight={"1px solid #373737"}
                bg={totalColData.length % 2 === 0 ? "#1E1E1E" : ""}
              >
                {commafy(
                  claim.reduce((acc: any, cur: any, index: number) => {
                    if (cur?.claimTokenAllocation) {
                      return acc + cur.claimTokenAllocation || 0;
                    }
                    return "-";
                  }, 0)
                )}
              </Text>
            </Flex>
          );
        })}
        <Flex
          fontSize={12}
          //   color={overviewTableStyle.fontColor[colorMode]}
          flexDir={"column"}
          fontWeight={500}
          minW={"135px"}
          borderRight={"1px solid #373737"}
        >
          <Text fontSize={12}>Total</Text>
          {totalColData.map((roundTotal: number[], index: number) => {
            const sumWithInitial = roundTotal.reduce(
              (previousValue, currentValue) => previousValue + currentValue,
              0
            );

            sumColumn += sumWithInitial;
            if (index + 1 === totalColData.length) {
              if (sumWithInitial !== 0) {
                return (
                  <Flex key={index}>
                    <Text
                      borderTop={"1px solid #373737"}
                      h={"38px"}
                      fontSize={13}
                      bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                    >
                      {commafy(sumWithInitial)}
                    </Text>
                    <Text
                      borderTop={"1px solid #373737"}
                      h={"38px"}
                      fontSize={13}
                      bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                    >
                      {commafy(sumColumn)}
                    </Text>
                  </Flex>
                );
              } else {
                return (
                  <>
                    <Text
                      borderTop={"1px solid #373737"}
                      borderBottom={"1px solid #373737"}
                      h={"38px"}
                      fontSize={13}
                      bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                    >
                      -
                    </Text>
                    <Text
                      h={"38px"}
                      fontSize={13}
                      bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                    >
                      -
                    </Text>
                  </>
                );
              }
            }

            if (sumWithInitial !== 0) {
              return (
                <Text
                  key={index}
                  borderTop={"1px solid #373737"}
                  h={"38px"}
                  fontSize={13}
                  bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                >
                  {commafy(sumWithInitial)}
                </Text>
              );
            } else {
              return (
                <Text
                  key={index}
                  borderTop={"1px solid #373737"}
                  h={"38px"}
                  fontSize={13}
                  bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                >
                  -
                </Text>
              );
            }
          })}
        </Flex>
        <Flex
          fontSize={12}
          //   color={overviewTableStyle.fontColor[colorMode]}
          flexDir={"column"}
          fontWeight={500}
          minW={"135px"}
        >
          <Text fontSize={12}>Accumulated</Text>
          {totalColData.map((roundTotal: number[], index: number) => {
            let sumNum = 0;

            const totalAcc = totalColData
              .map((roundTotal: number[], i: number) =>
                i <= index ? roundTotal : []
              )
              .map((data: number[]) => {
                return data.reduce(
                  (previousValue, currentValue) => previousValue + currentValue,
                  0
                );
              });

            if (index + 1 === totalColData.length) {
              return (
                <Flex key={index}>
                  <Text
                    borderTop={"1px solid #373737"}
                    h={"38px"}
                    fontSize={13}
                    bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
                  >
                    {totalAcc.map((data: number, i: number) => {
                      if (i <= index) {
                        sumNum += data;
                      }
                    })}
                    {sumNum !== 0 ? commafy(sumNum) : "-"}
                  </Text>
                  <Text
                    borderTop={"1px solid #373737"}
                    h={"38px"}
                    fontSize={13}
                    bg={
                      index + 1 === 0 || (index + 1) % 2 === 0 ? "#1E1E1E" : ""
                    }
                  >
                    {sumNum !== 0 ? commafy(sumNum) : "-"}
                  </Text>
                </Flex>
              );
            }

            return (
              <Text
                key={index}
                borderTop={"1px solid #373737"}
                h={"38px"}
                fontSize={13}
                bg={index === 0 || index % 2 === 0 ? "#1E1E1E" : ""}
              >
                {totalAcc.map((data: number, i: number) => {
                  if (i <= index) {
                    sumNum += data;
                  }
                })}
                {sumNum !== 0 ? commafy(sumNum) : "-"}
              </Text>
            );
          })}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default ClaimTable;
