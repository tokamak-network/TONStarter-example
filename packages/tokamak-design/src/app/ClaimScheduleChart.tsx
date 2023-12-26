import { Button, Flex, Text } from "@chakra-ui/react";
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
      </Flex>
      <Text
        color={"#9D9EA5"}
        fontSize={"15px"}
        fontWeight={500}
        lineHeight={"20px"}
      >
        Project tokens are designed to be claimed in seven rounds by default.
      </Text>
      <ClaimTable />
    </Flex>
  );
};

export default ClaimScheduleChart;
