"use client";

import { Box, Button, Text, Input } from "@chakra-ui/react";
export default function AddProjectBox() {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={"0.5em"}
      padding={"0.5em"}
      width={"100%"}
    >
      <Text fontSize={"6xl"}>pontocerto.ic</Text>
      <Text fontSize={"2xl"}>Adicione o Projeto</Text>

      <Box display={"flex"} flexDirection={"column"} gap={"1em"}>
        <Input placeholder="Nome do Projeto" type="projeto" name="projeto" />
        <Button background={"blueviolet"} textColor={"white"}>
          Adicionar Projeto
        </Button>
        <Box display={"flex"} flexDirection={"row"} gap={"1em"}></Box>
      </Box>
    </Box>
  );
}
