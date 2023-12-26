import { Flex, Text, Tooltip, Input, Button } from "@chakra-ui/react";
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TokenClaim = (props: { project: any }) => {
  const { project } = props;
  console.log("project", project);
  const progress = 33;
  return (
    <Flex mt={"90px"} flexDir={"column"}>
      <Text
        color={"#fff"}
        fontSize={"24px"}
        fontWeight={700}
        lineHeight={"21px"}
      >
        Token claim{" "}
        <span
          style={{
            marginLeft: "4px",
            color: "#9D9EA5",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          (if you are a participant)
        </span>
      </Text>
      <Flex columnGap={"60px"} mt={"30px"}>
        <Flex flexDir={"column"}>
          <Flex alignItems={"center"}>
            <Text
              color={"#D0D0DA"}
              fontSize={"18px"}
              fontWeight={600}
              mr={"9px"}
            >
              Available to claim
            </Text>
            <Text
              color={"#0070ED"}
              fontSize={"18px"}
              fontWeight={600}
              mr={"3px"}
            >
              Import Token
            </Text>
            <Tooltip
              label={
                <>
                  <div>Import token to Metamask</div>
                </>
              }
              fontSize="12px"
              bg={"#1F2128"}
              color={"#777777"}
              fontWeight={400}
            >
              <QuestionOutlineIcon />
            </Tooltip>
          </Flex>
          <Flex mt={"15px"} columnGap={"10px"} alignItems={"center"}>
            <Input
              w={"230px"}
              h={"42px"}
              mb={"3px"}
              bg={"#252525"}
              borderRadius={0}
              _focusVisible={{
                borderBottom: "1px solid #0070ED !important",
              }}
              textAlign={"right"}
              _hover={{
                borderBottom: "1px solid #0070ED !important",
              }}
              placeholder={`0.00${project.tokenSymbol}`}
              outline={"none"}
              fontSize={"13px"}
              fontWeight={600}
              border={"transparent"}
              pl={"20px"}
              _placeholder={{
                opacity: 1,
                color: "#818181",
                fontsize: "15px",
                fontWeight: 600,
                lineHeight: "normal",
              }}
            />
            <Button
              w="120px"
              h="40px"
              borderRadius={"20px"}
              fontSize={"15px"}
              border={"2px solid #353535"}
              bg={"transparent"}
              color={"#838383"}
              fontWeight={600}
              _hover={{ bg: "transparent", border: "2px solid #8A8A98" }}
            >
              Claim
            </Button>
          </Flex>
        </Flex>
        <Flex flexDir={"column"} ml={"6px"}>
          <Text color={"#D0D0DA"} fontSize={"18px"} fontWeight={600} mr={"9px"}>
            Claim Details
          </Text>
          <Flex mb={"9px"} columnGap={"30px"} mt={"15px"}>
            <Flex columnGap={"21px"} fontSize={"15px"} lineHeight={"normal"}>
              <Text color={"#9D9EA5"} fontWeight={600}>
                Public Round 1
              </Text>
              <Text color={"#fff"} fontWeight={500}>
                25,000,000 DOC
              </Text>
            </Flex>
            <Flex columnGap={"21px"} fontSize={"15px"} lineHeight={"normal"}>
              <Text color={"#9D9EA5"} fontWeight={600} w={"126px"}>
                Withdraw Claims
              </Text>
              <Text color={"#fff"} fontWeight={500}>
                3/6
              </Text>
            </Flex>
          </Flex>
          <Flex mb={"9px"} columnGap={"30px"}>
            <Flex columnGap={"21px"} fontSize={"15px"} lineHeight={"normal"}>
              <Text color={"#9D9EA5"} fontWeight={600}>
                Public Round 2
              </Text>
              <Text color={"#fff"} fontWeight={500}>
                25,000,000 DOC
              </Text>
            </Flex>
            <Flex columnGap={"21px"} fontSize={"15px"} lineHeight={"normal"}>
              <Text color={"#9D9EA5"} fontWeight={600} w={"126px"}>
                Remained Amount
              </Text>
              <Text color={"#fff"} fontWeight={500}>
                25,000,000 DOC
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex mt={"37px"}>
          <Flex style={{ width: "45px", height: "45px" }}>
            <CircularProgressbar
              value={progress}
              strokeWidth={50}
              styles={buildStyles({
                strokeLinecap: "butt",
                pathColor: "#0070ED",
                trailColor: "#373737",
              })}
            />
          </Flex>
          <Flex
            flexDir={"column"}
            ml={"21px"}
            height={"45px"}
            justifyContent={"center"}
          >
            <Flex alignItems={"center"}>
              <Flex
                h={"9px"}
                w="9px"
                borderRadius={"50%"}
                bg={"#0070ED"}
                mr="9px"
              ></Flex>
              <Text
                fontSize={"13px"}
                fontWeight={400}
                color={"#fff"}
                lineHeight={"21px"}
                mr={"12px"}
              >
                Claimed
              </Text>
              <Text color={"#9D9EA5"}>{progress}%</Text>
            </Flex>
            <Flex alignItems={"center"}>
              <Flex
                h={"9px"}
                w="9px"
                borderRadius={"50%"}
                bg={"#373737"}
                mr="9px"
              ></Flex>
              <Text
                fontSize={"13px"}
                fontWeight={400}
                color={"#fff"}
                lineHeight={"21px"}
                mr={"12px"}
              >
                Claimed
              </Text>
              <Text color={"#9D9EA5"}>{100 - progress}%</Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default TokenClaim;
