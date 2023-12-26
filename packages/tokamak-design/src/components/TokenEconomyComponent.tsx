import { Flex, Text, Tooltip } from "@chakra-ui/react";
import "font-proxima-nova/style.css";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";

type Vault = {
  vaultName: string;
  color: string;
  value: number;
};

const TokenEconomyComponent = (props: { project: any }) => {
  const { project } = props;
  const [vaults] = useState([
    {
      vaultName: "Public",
      color: "#2B66AA",
      value: 30,
    },
    {
      vaultName: "Ecosystem",
      color: "#F23C35",
      value: 35,
    },
    {
      vaultName: "Team",
      color: "#F7B729",
      value: 15,
    },
    {
      vaultName: "Liquidity",
      color: "#5DA344",
      value: 10,
    },
    {
      vaultName: "TONStarter",
      color: "#F17235",
      value: 5,
    },
  ]);

  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (svgRef !== undefined) {
      const h = 200;
      const w = 200;
      const radius = w / 2;
      const svg = d3
        .select(svgRef.current)
        .attr("width", w)
        .attr("height", h)
        .style("overflow", "visible")
        .style("position", "relative")
        .style("top", 100)
        .style("left", 100);
      const pie = d3.pie<Vault>().value((d) => d.value)(vaults);
      const arcGen = d3.arc<any>().innerRadius(0).outerRadius(radius);
      const color = d3.scaleOrdinal<any>().range(d3.schemeGnBu);

      svg
        .selectAll()
        .data(pie)
        .join("path")
        .attr("d", arcGen)
        .attr("fill", (d: any) => d.data.color);
    }
  }, [vaults]);

  return (
    <Flex
      mt={"90px"}
      ml={"171px"}
      fontFamily={"Proxima Nova Rg"}
      flexDir={"column"}
    >
      <Text
        color={"#fff"}
        fontSize={"24px"}
        fontWeight={700}
        lineHeight={"21px"}
      >
        Token Economy
      </Text>
      <Flex mt={"51px"} flexDir={"column"} rowGap={"21px"}>
        <Flex fontSize={"15px"} letterSpacing={"0.75px"}>
          <Text w={"136px"} fontWeight={600} color={"#9D9EA5"}>
            {" "}
            Contract
          </Text>
          <Text fontWeight={400}>{project.tokenAddress}</Text>
        </Flex>
        <Flex fontSize={"15px"} letterSpacing={"0.75px"}>
          <Text w={"136px"} fontWeight={600} color={"#9D9EA5"}>
            {" "}
            Symbol
          </Text>
          <Text fontWeight={400}>{project.tokenSymbol}</Text>
        </Flex>
        <Flex fontSize={"15px"} letterSpacing={"0.75px"}>
          <Text w={"136px"} fontWeight={600} color={"#9D9EA5"}>
            {" "}
            Total Supply
          </Text>
          <Text fontWeight={400}>
            {Number(project.tokenAllocationAmount).toLocaleString()}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Flex w={"200px"} h={"200px"} mt={"60px"}>
          <svg ref={svgRef}></svg>
        </Flex>
        <Flex
          h={"70px"}
          flexWrap={"wrap"}
          columnGap={"30px"}
          mt={"105px"}
          w={"280px"}
          ml={"60px"}
          rowGap={"3px"}
        >
          {vaults.map((vault: any, index: number) => {
            return (
              <Flex
                w={"125px"}
                key={index}
                h={"21px"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Flex alignItems={"center"}>
                  <Flex
                    bg={vault.color}
                    height={"9px"}
                    width={"9px"}
                    borderRadius={"50%"}
                    mr={"6px"}
                  ></Flex>
                  <Text
                    fontSize={"13px"}
                    fontWeight={400}
                    letterSpacing={"0.26px"}
                    w={"67px"}
                    mr={"12px"}
                  >
                    {vault.vaultName}
                  </Text>
                </Flex>

                <Text
                  fontSize={"13px"}
                  color={"#9D9EA5"}
                  letterSpacing={"0.26px"}
                  fontWeight={400}
                >
                  {vault.value} {"%"}
                </Text>
              </Flex>
            );
          })}
          <Text
            mt={"21px"}
            color={"#9D9EA5"}
            fontSize={"13px"}
            fontWeight={400}
            letterSpacing={"0.26px"}
          >
            TONStarter section consists of three parts{" "}
            <Tooltip
              label={
                <>
                  <div>1. WTON-TOS LP reward (2.5%)</div>
                  <div>2. TON Staker (1.25%)</div>
                  <div>3. TOS Staker (1.25%)</div>
                </>
              }
              fontSize="12px"
              bg={"#1F2128"}
              color={"#fff"}
              fontWeight={400}
            >
              <QuestionOutlineIcon />
            </Tooltip>
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TokenEconomyComponent;
