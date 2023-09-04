import Image from "next/image";
import { Inter } from "next/font/google";
import { Flex, Text } from "@chakra-ui/react";
import Header from "@/components/Layouts/Header";
import HeaderMenu from "@/components/Layouts/HeaderNav";

export default function Home() {
  return (
    <Flex flexDir={"column"}>
      <Header>
        <HeaderMenu />
      </Header>
      <Text>Olá mundo!</Text>
    </Flex>
  );
}
