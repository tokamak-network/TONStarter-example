import { Flex, Text } from "@chakra-ui/react";
import "font-proxima-nova/style.css";
import BlueTick from "../assets/icons/TickBlue.svg";

const Circle = (props: {
  status: string;
  index: number;
  prevStatus: string;
}) => {
  const { status, index, prevStatus } = props;
  return (
    <Flex>
      <Flex
        borderRadius={"50%"}
        height={"30px"}
        w={"30px"}
        bg={status === "ongoing" ? "#0070ED" : "transparent"}
        border={
          status === "ongoing"
            ? ""
            : status === "upcoming" && prevStatus === "ongoing"
            ? "1px solid #fff"
            : "1px solid #373737"
        }
        alignItems={"center"}
        justifyContent={"center"}
      >
        {status === "finished" ? <BlueTick /> : <Text>{index}</Text>}
      </Flex>
    </Flex>
  );
};

function TimelineComponent(props: { project: any }) {
  const { project } = props;
  const now = Math.floor(Date.now() / 1000);
  const timelineSteps = [
    {
      stepName: "Snapshot",
      time: project.snapshot * 1000,
      completed: now > project.snapshot * 1000 ? "finished" : "upcoming",
    },
    {
      stepName: "Whitelist",
      time: project.endAddWhiteTime * 1000,
      completed: now > project.endAddWhiteTime * 1000 ? "finished" : "upcoming",
    },
    {
      stepName: "Public 1",
      time: project.endExclusiveTime * 1000,
      completed:
        now > project.endExclusiveTime * 1000 + 100000000000
          ? "finished"
          : now > project.startExclusiveTime * 1000 &&
            now < project.endExclusiveTime * 1000 + 100000000000
          ? "ongoing"
          : "upcoming",
    },
    {
      stepName: "Public 2",
      time: project.endDepositTime * 1000,
      completed:
        now > project.endDepositTime * 1000 + 100000000000
          ? "finished"
          : now > project.startDepositTime * 1000 + 100000000000 &&
            now < project.endDepositTime * 1000 + 100000000000
          ? "ongoing"
          : "upcoming",
    },
  ];

  return (
    <Flex mt={"90px"} fontFamily={"Proxima Nova Rg"} flexDir={"column"}>
      <Text
        color={"#fff"}
        fontSize={"24px"}
        fontWeight={700}
        lineHeight={"21px"}
      >
        Timeline
      </Text>
      <Flex flexDir={"column"} mt={"45px"} ml={"10px"}>
        {timelineSteps.map((step: any, index: number) => {
          return (
            <Flex key={index}>
              <Flex mr={"18px"} flexDir={"column"} alignItems={"center"}>
                <Circle
                  status={step.completed}
                  index={index + 1}
                  prevStatus={
                    index !== 0
                      ? timelineSteps[index - 1].completed
                      : "finished"
                  }
                />
                {index !== 3 && (
                  <Flex flexDir={"column"} rowGap={"6px"} my={"14px"}>
                    <Flex
                      borderRadius={"50%"}
                      height={"2px"}
                      width={"2px"}
                      bg={step.completed === "finished" ? "#0070ED" : "#fff"}
                    ></Flex>
                    <Flex
                      borderRadius={"50%"}
                      height={"2px"}
                      width={"2px"}
                      bg={step.completed === "finished" ? "#0070ED" : "#fff"}
                    ></Flex>
                    <Flex
                      borderRadius={"50%"}
                      height={"2px"}
                      width={"2px"}
                      bg={step.completed === "finished" ? "#0070ED" : "#fff"}
                    ></Flex>
                  </Flex>
                )}
              </Flex>
              <Flex flexDir={"column"} mt={"4px"}>
                <Text
                  color={
                    step.completed === "finished"
                      ? "#0070ED"
                      : step.completed === "ongoing"
                      ? "#fff"
                      : "#9D9EA5"
                  }
                  fontSize={"18px"}
                  fontWeight={600}
                >
                  {step.stepName}
                </Text>
                <Text
                  mt={"6px"}
                  color={"#9D9EA5"}
                  fontSize={"12px"}
                  fontWeight={500}
                >
                  2023-07-11 09:00 (UTC+9)
                </Text>
              </Flex>
            </Flex>
          );
        })}
        <Flex ml={"48px"} mt={"33px"} flexDir={"column"} rowGap={"6px"}>
          <Text fontSize={"18px"} fontWeight={600} color={"#9D9EA5"}>
            Fly
          </Text>
          <Text fontSize={"12px"} fontWeight={400} color={"#9D9EA5"}>
            2023-07-11 09:00 (UTC+9)
          </Text>
          <Text
            fontSize={"12px"}
            fontWeight={400}
            color={"#9D9EA5"}
            w={"200px"}
            whiteSpace={"normal"}
          >
            You can see how far along this project is in development after
            launch.
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default TimelineComponent;
