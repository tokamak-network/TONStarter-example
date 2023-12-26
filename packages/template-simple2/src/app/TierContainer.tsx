import { Flex, Text } from "@chakra-ui/react";

const TierContainer = (props: { tierInfo: any }) => {
  const { tierInfo } = props;
  const tiers = [
    {
      title: "Tier 1",
      data: [
        {
          key: "Criteria",
          value: `600.00 sTOS`,
        },
        {
          key: "Allocation",
          value: `1,050,000.00`,
        },
        {
          key: "# of Members",
          value: `34`,
        },
        {
          key: "# of Whitelisted",
          value: `12`,
        },
        {
          key: "Expected Allocation",
          value: `36,205.90`,
        },
      ],
    },
    {
      title: "Tier 2",
      data: [
        {
          key: "Criteria",
          value: `600.00 sTOS`,
        },
        {
          key: "Allocation",
          value: `1,050,000.00`,
        },
        {
          key: "# of Members",
          value: `34`,
        },
        {
          key: "# of Whitelisted",
          value: `12`,
        },
        {
          key: "Expected Allocation",
          value: `36,205.90`,
        },
      ],
    },
    {
      title: "Tier 3",
      data: [
        {
          key: "Criteria",
          value: `600.00 sTOS`,
        },
        {
          key: "Allocation",
          value: `1,050,000.00`,
        },
        {
          key: "# of Members",
          value: `34`,
        },
        {
          key: "# of Whitelisted",
          value: `12`,
        },
        {
          key: "Expected Allocation",
          value: `36,205.90`,
        },
      ],
    },
    {
      title: "Tier 4",
      data: [
        {
          key: "Criteria",
          value: `600.00 sTOS`,
        },
        {
          key: "Allocation",
          value: `1,050,000.00`,
        },
        {
          key: "# of Members",
          value: `34`,
        },
        {
          key: "# of Whitelisted",
          value: `12`,
        },
        {
          key: "Expected Allocation",
          value: `36,205.90`,
        },
      ],
    },
  ];
  console.log("tiers", tiers);

  return (
    <Flex mt={"90px"} flexDir={"column"}>
      <Text
        color={"#fff"}
        fontSize={"24px"}
        fontWeight={700}
        lineHeight={"21px"}>
        Tier Details
        <span
          style={{
            marginLeft: "5px",
            color: "#9D9EA5",
            fontSize: "16px",
            fontWeight: 400,
          }}>
          Snapshot date 2021.10.25 16:59 (UTC+9)
        </span>
      </Text>
      <Flex mt={"30px"} columnGap={"30px"}>
        {tiers.map((tier: any, index: number) => {
          return (
            <Flex
              key={index}
              w="276px"
              borderRadius={"10px"}
              border={"1px solid #373737"}
              flexDir={"column"}>
              <Flex
                borderBottom={"1px solid #373737"}
                height={"60px"}
                justifyContent={"center"}
                alignItems={"center"}>
                <Text fontWeight={700} color={"#fff"} fontSize={"15px"}>
                  {tier.title}
                </Text>
              </Flex>
              {tier.data.map((tierData: any, index: number) => {
                console.log();
                
                return (
                  <Flex
                  px={'21px'}
                    key={index}
                    borderBottom={index !== tier.data.length-1? "1px solid #373737":''}
                    height={"60px"}
                    justifyContent={"space-between"}
                    alignItems={"center"}>
                    <Text fontWeight={700} color={"#9D9EA5"} fontSize={"15px"}>
                      {tierData.key}
                    </Text>
                    <Text fontWeight={600} color={"#fff"} fontSize={"13px"}>
                      {tierData.value}
                    </Text>
                  </Flex>
                );
              })}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default TierContainer;
