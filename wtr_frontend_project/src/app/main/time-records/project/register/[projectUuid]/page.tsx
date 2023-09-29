"use client";
import RecordCard from "@/components/time-records/RecordCard";
import HeaderBox from "@/components/global/HeaderBox";

import { CalendarIcon, Icon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function RegisterTimeRecord({ params }: any) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
      gap={"2em"}
    >
      <HeaderBox title="Registros / {usuario} / {projeto}" />

      <Box
        display={"flex"}
        flexDirection={"row"}
        gap={"1em"}
        alignItems={"center"}
        justifyContent={"start"}
        width={"100%"}
        padding={"1em"}
      >
        <CalendarIcon boxSize={12} />
        <Text fontSize={"4xl"}>Nome do Projeto</Text>
      </Box>
      <RecordCard />
    </Box>
  );
}
