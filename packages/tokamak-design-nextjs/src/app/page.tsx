import { Flex, Text } from "@chakra-ui/react";
import "font-proxima-nova/style.css";
import ProjectCard from "./ProjectCard";
import TimelineComponent from "./TimelineComponent";
import TokenEconomyComponent from "./TokenEconomyComponent";
import ClaimScheduleChart from "./ClaimScheduleChart";
// import TimelineComponent from "@/components/participate/TimelineComponent";
// import TokenEconomyComponent from "@/components/participate/TokenEconomyComponent";
// import ClaimScheduleChart from "@/components/participate/ClaimScheduleChart";
// import TokenClaim from "@/components/participate/TokenClaim";
// import TierContainer from "@/components/participate/TierContainer";
// import Mockdata from "@/components/participate/MOCK_TABLE.json";

const saleInfo = {
  chainId: 1,
  name: "Dragons of Midgard",
  description:
    "Playable NFT Collectible PVP game set in the medieval era in the kingdom of midgard. Dragons of midgard is crypto collectible P2E game which will allow users to play and earn in unique pvp battles with 30 species and 8 dragon territories to make the perfect gaming experience for the players. While dragon holders will be able to earn by playing dragons of midgard game.",
  image: "",
  adminAddress: "DOM-TEST",
  website: "https://dragonsofmidgard.com/",
  telegram: "https://t.me/DragonsofMidgardOfficialKR",
  medium: "",
  twitter: "https://twitter.com/dragons_midgard",
  discord: "",
  tokenName: "Aura",
  tokenAddress: "0xaEC59E5b4f8DbF513e260500eA96EbA173F74149",
  tokenSymbol: "AURA",
  tokenSymbolImage:
    "https://tonstarter-symbols.s3.ap-northeast-2.amazonaws.com/aura-logo-black-big.png",
  tokenAllocationAmount: "12000000",
  tokenFundRaisingTargetAmount: "12000",
  tokenFundingRecipient: "DOM-TEST",
  projectFundingTokenRatio: 632,
  projectTokenRatio: 20,
  saleContractAddress: "0x3B75d3f628C29d357b484EA7d091faEd63419267",
  snapshot: 1639468740,
  startAddWhiteTime: 1639468800,
  endAddWhiteTime: 1639641599,
  startExclusiveTime: 1639641600,
  endExclusiveTime: 1639814399,
  startDepositTime: 1639814400,
  endDepositTime: 1640159999,
  startClaimTime: 1640160000,
  claimInterval: 2592000,
  claimPeriod: 6,
  position: "active",
  production: "production",
  del: false,
  fundingTokenType: "TON",
  claimFirst: 50,
};

const isSocial = true;

export default function Home() {
  return (
    <Flex
      mt={"60px"}
      mb={"121px"}
      flexDir={"column"}
      color={"white"}
      alignItems={"center"}
      lineHeight={"normal"}
      style={{ flex: 1 }}
      fontFamily={"Proxima Nova Rg"}
      bg={"black"}
    >
      <Flex w={"1200px"} flexDir={"column"}>
        <ProjectCard project={saleInfo} isSocial={isSocial} />
        <Flex mt={"45px"} columnGap={"70px"}>
          <Flex>
            <Text
              color={"#9D9EA5"}
              fontSize={"15px"}
              fontWeight={600}
              mr="30px"
            >
              Token Offered (public)
            </Text>
            <Text color={"#fff"} fontSize={"15px"} fontWeight={700}>
              25,000,000 DOC
            </Text>
          </Flex>
          <Flex mr={"40px"}>
            <Text
              color={"#9D9EA5"}
              mr="30px"
              fontSize={"15px"}
              fontWeight={600}
            >
              Total Raise
            </Text>
            <Text color={"#fff"} fontSize={"15px"} fontWeight={700}>
              421,427.26 TON
            </Text>
          </Flex>
          <Flex mr={"40px"}>
            <Text
              color={"#9D9EA5"}
              fontSize={"15px"}
              mr="30px"
              fontWeight={600}
            >
              Sale Price
            </Text>
            <Text color={"#fff"} fontSize={"15px"} fontWeight={700}>
              1 DOC = 0.245 TOS
            </Text>
          </Flex>
          <Flex mr={"40px"}>
            <Text
              color={"#9D9EA5"}
              fontSize={"15px"}
              mr="30px"
              fontWeight={600}
            >
              Participants
            </Text>
            <Text color={"#fff"} fontSize={"15px"} fontWeight={700}>
              7
            </Text>
          </Flex>
        </Flex>
        <Flex flexDir={"column"}>
          <Flex>
            {/* <TimelineComponent project={saleInfo} />
            <TokenEconomyComponent project={saleInfo} /> */}
          </Flex>

          <ClaimScheduleChart />
          {/* <TokenClaim project={saleInfo} />
          <TierContainer tierInfo={Mockdata.vaults[0].stosTier} /> */}
        </Flex>
      </Flex>
    </Flex>
  );
}
