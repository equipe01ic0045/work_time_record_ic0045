import { Flex, Text } from "@chakra-ui/react";
import React from "react";

type HeaderProps = {
  children?: React.ReactNode;
};

export default function Header(props: HeaderProps) {
  const { children } = props;
  return (
    <Flex
      className="header-container"
      w="100%"
      alignItems={"center"}
      justifyContent={"center"}
      boxShadow={"0 0 10px rgba(0,0,0,0.1)"}
    >
      <Flex
        className="header-context"
        w="90%"
        maxWidth={"1920px"}
        p={"16px 0"}
        justifyContent={"space-between"}
      >
        <Flex className="header-logo">
          <Text fontSize={"24px"}>PontoCerto.io</Text>
        </Flex>
        <Flex className="header-top-items">{children ? children : ""}</Flex>
      </Flex>
    </Flex>
  );
}
