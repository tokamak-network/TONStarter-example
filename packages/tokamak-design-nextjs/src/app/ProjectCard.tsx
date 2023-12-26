import { Box, Flex, Progress, Text, Link } from "@chakra-ui/react";
import Image from "next/image";
import DooropenLogo from "../assets/images/DOOROPEN.svg";
import TOSLogo from "../assets/images/TOS.svg";
import Web from "../assets/icons/ParticipateWeb.svg";
import Telegram from "../assets/icons/ParticipateTelegram.svg";
import Medium from "../assets/icons/ParticipateMedium.svg";
import Twitter from "../assets/icons/ParticipateTwitter.svg";
import Discord from "../assets/icons/ParticipateDiscord.svg";

const removeHTMLTags = (str: string) => {
  if (str === null || str === "") return false;
  else str = str.toString();

  return str.replace(/(<([^>]+)>)/gi, "");
};
const myLoader = ({ src }: any) => {
  return `${src}`;
};

const ImageContainer = (props: { imageSrc: string }) => {
  const { imageSrc } = props;
  return (
    <Flex
      height={"270px"}
      w={"384px"}
      p={"9px"}
      flexDir={"column"}
      alignItems={"center"}
      borderRadius={"10px"}
      border={"1px solid #373737"}
      justifyContent={"center"}
    >
      <Flex
        justifyContent={"space-between"}
        height={"27px"}
        w={"100%"}
        position={"relative"}
        top={"-96px"}
      >
        <Flex columnGap={"9px"} fontSize={"15px"}>
          <Text
            width={"80px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"5px"}
            bg={"black"}
            textAlign={"center"}
            color={"#9D9EA5"}
            fontWeight={600}
          >
            Finished
          </Text>
          <Text
            width={"80px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"5px"}
            bg={"black"}
            textAlign={"center"}
            color={"#D0D0DA"}
            fontWeight={600}
          >
            Timeline
          </Text>
        </Flex>
      </Flex>
      <Image src={DooropenLogo} alt="imageSrc" />
    </Flex>
  );
};

const DescriptionContainer = (props: { project: any; isSocial: boolean }) => {
  const { project, isSocial } = props;

  const socialList = [
    { name: "Website", image: Web, link: project.website },
    { name: "Telegram", image: Telegram, link: project.telegram },
    { name: "Medium", image: Medium, link: project.medium },
    { name: "Twitter", image: Twitter, link: project.twitter },
    { name: "Discord", image: Discord, link: project.discord },
  ];
  const progress = 80;

  return (
    <Flex flexDir={"column"} lineHeight={"normal"}>
      <Text fontSize={"24px"} fontWeight={700}>
        {project.name}
      </Text>
      <Text
        fontSize={"15px"}
        fontWeight={500}
        lineHeight={"normal"}
        color={"#9D9EA5"}
        mt={"15px"}
        w={"771px"}
        whiteSpace={!isSocial ? "nowrap" : "normal"}
        overflow={"hidden"}
        textOverflow={isSocial ? "" : "ellipsis"}
      >
        {removeHTMLTags(project.description)}
      </Text>
      {!isSocial && (
        <Flex flexDir={"column"}>
          <Flex mt={"33px"}>
            <Flex mr={"40px"}>
              <Text
                color={"#9D9EA5"}
                fontSize={"15px"}
                fontWeight={600}
                w={"193px"}
              >
                Token Offered (public)
              </Text>
              <Text
                color={"#fff"}
                fontSize={"15px"}
                fontWeight={700}
                w={"163px"}
              >
                25,000,000 DOC
              </Text>
            </Flex>
            <Flex>
              <Text
                color={"#9D9EA5"}
                fontSize={"15px"}
                fontWeight={600}
                w={"193px"}
              >
                Total Raise
              </Text>
              <Text
                color={"#fff"}
                fontSize={"15px"}
                fontWeight={700}
                w={"163px"}
              >
                421,427.26 TON
              </Text>
            </Flex>
          </Flex>
          <Flex mt={"15px"}>
            <Flex mr={"40px"}>
              <Text
                color={"#9D9EA5"}
                fontSize={"15px"}
                fontWeight={600}
                w={"193px"}
              >
                Sale Price
              </Text>
              <Text
                color={"#fff"}
                fontSize={"15px"}
                fontWeight={700}
                w={"163px"}
              >
                1 DOC = 0.245 TOS
              </Text>
            </Flex>
            <Flex>
              <Text
                color={"#9D9EA5"}
                fontSize={"15px"}
                fontWeight={600}
                w={"193px"}
              >
                Participants
              </Text>
              <Text
                color={"#fff"}
                fontSize={"15px"}
                fontWeight={700}
                w={"143px"}
              >
                7
              </Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {isSocial && (
        <Flex mt={"30px"} columnGap={"30px"}>
          <Flex columnGap={"30px"}>
            {socialList.map((social: any, index: number) => {
              if (social.link !== "") {
                return (
                  <Flex key={index}>
                    <Flex>
                      <Link
                        display={"flex"}
                        lineHeight={"20px"}
                        target="_blank"
                        href={social.link}
                        _hover={{ textDecor: "none" }}
                        textDecor={"none"}
                      >
                        <Image src={social.image} alt="socialIcon" />
                        <Text
                          ml={"6px"}
                          color={"#D0D0DA"}
                          fontSize={"15px"}
                          fontWeight={500}
                        >
                          {social.name}
                        </Text>{" "}
                      </Link>
                    </Flex>
                  </Flex>
                );
              }
            })}
          </Flex>
        </Flex>
      )}
      <Flex w={"100%"} mt={isSocial ? "36px" : "54px"}>
        <Flex flexDir={"column"} width={"50%"}>
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            mb={"10px"}
            w={"330px"}
          >
            <Flex alignItems="center">
              <Text
                color={"#fff"}
                fontSize={"13px"}
                lineHeight={"normal"}
                letterSpacing={"0.65px"}
                mr={"6px"}
                fontWeight={600}
              >
                Public Sale
              </Text>
              <Box
                w={"12px"}
                h={"3px"}
                bg={"black"}
                borderRadius={10}
                mr={"25px"}
              ></Box>
              <Text
                color={"#fff"}
                fontSize={"13px"}
                lineHeight={"normal"}
                mr={"6px"}
                letterSpacing={"0.65px"}
                fontWeight={600}
              >
                current
              </Text>
              <Box
                w={"12px"}
                h={"3px"}
                bg={"#2bb415"}
                borderRadius={10}
                mr={"20px"}
              ></Box>
            </Flex>
            <Flex>
              <Text
                color={"#fff"}
                fontSize={"13px"}
                lineHeight={"normal"}
                letterSpacing={"0.65px"}
                fontWeight={600}
              >
                {progress === undefined ? "XXX %" : progress + " %"}
              </Text>
            </Flex>
          </Box>
          <Box w={"330px"}>
            <Progress
              value={progress ? (100 - progress < 0 ? 0 : 100 - progress) : 50}
              borderRadius={10}
              h={"6px"}
              bg={"#2bb415"}
            ></Progress>
          </Box>
        </Flex>
        <Flex width={"50%"} pl={"10px"} alignItems={"center"}>
          <Text
            color={"#9D9EA5"}
            fontSize={"13px"}
            mr={"30px"}
            fontWeight={600}
          >
            Liquidity Pool
          </Text>
          <Text color={"#FFF"} fontSize={"15px"} mr={"30px"} fontWeight={600}>
            TOS - {project.tokenSymbol}
          </Text>
          <Flex
            mr={"3px"}
            borderRadius={"50%"}
            border={"1px solid #313442"}
            height={"30px"}
            width={"30px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image src={TOSLogo} alt="tosLogo" />
          </Flex>
          <Flex
            borderRadius={"50%"}
            border={"1px solid #313442"}
            height={"30px"}
            width={"30px"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Image
              style={{ objectFit: "initial", borderRadius: "50%" }}
              loader={myLoader}
              src={project.tokenSymbolImage}
              alt="tosLogo"
              width={28}
              height={28}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

function ProjectCard(props: { project: any; isSocial: boolean }) {
  const { project } = props;

  return (
    <Flex w={"100%"} columnGap={"45px"} alignItems={"center"}>
      <Flex>
        <ImageContainer imageSrc="" />
      </Flex>
      <DescriptionContainer {...props} />
    </Flex>
  );
}

export default ProjectCard;
