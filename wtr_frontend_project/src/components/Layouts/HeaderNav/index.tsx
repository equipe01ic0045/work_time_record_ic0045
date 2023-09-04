import { Flex, Link } from "@chakra-ui/react";
import React from "react";

export default function HeaderMenu() {
  return (
    <Flex className="navbar" gap={"16px"} fontSize={"18px"}>
      <Flex className="navLink">
        <Link href="/">Inicío</Link>
      </Flex>

      <Flex className="navLink">
        <Link href="/">Sobre</Link>
      </Flex>

      <Flex className="navLink">
        <Link href="/">Contato</Link>
      </Flex>

      <Flex className="navLink">
        <Link href="/">Login</Link>
      </Flex>
    </Flex>
  );
}
