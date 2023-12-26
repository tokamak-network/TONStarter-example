import { Button, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import ClaimTable from "./ClaimTable";

const ClaimScheduleChart = () => {
  const [chartState, setChartState] = useState("table");

  return (
    <Flex mt={"90px"} flexDir={"column"}>
      <Flex justifyContent={"space-between"} alignItems={"center"} mb={"9px"}>
        <Text
          color={"#fff"}
          fontSize={"24px"}
          fontWeight={700}
          lineHeight={"21px"}
        >
          Claim schedule
        </Text>
        <Flex>
          <Button
            bg={"transparent"}
            _focus={{ bg: "transparent" }}
            _hover={{
              bg: "transparent",
              border: "1px solid #0070ED",
              color: "#0070ED",
            }}
            w={"70px"}
            h={"32px"}
            _active={{ bg: "transparent" }}
            border={
              chartState === "table" ? "1px solid #0070ED" : "1px solid #353535"
            }
            borderLeftRadius={"16px"}
            onClick={() => {
              setChartState("table");
            }}
            color={chartState === "table" ? "#0070ED" : "#fff"}
            padding={"0px"}
            fontSize={"15px"}
            fontWeight={500}
            borderRightRadius={"0px"}
          >
            Table
          </Button>
          <Button
            bg={"transparent"}
            _focus={{ bg: "transparent" }}
            _hover={{
              bg: "transparent",
              border: "1px solid #0070ED",
              color: "#0070ED",
            }}
            w={"70px"}
            h={"32px"}
            fontSize={"15px"}
            fontWeight={500}
            color={chartState === "chart" ? "#0070ED" : "#fff"}
            padding={"0px"}
            _active={{ bg: "transparent" }}
            border={
              chartState === "chart" ? "1px solid #0070ED" : "1px solid #353535"
            }
            borderRightRadius={"16px"}
            onClick={() => {
              setChartState("chart");
            }}
            borderLeftRadius={"0px"}
          >
            Chart
          </Button>
        </Flex>
      </Flex>
      <Text
        color={"#9D9EA5"}
        fontSize={"15px"}
        fontWeight={500}
        lineHeight={"20px"}
      >
        Project tokens are designed to be claimed in seven rounds by default. To
        see the specific schedule, click Chart tab.
      </Text>
      <ClaimTable />
    </Flex>
  );
};

export default ClaimScheduleChart;
