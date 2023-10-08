'use client';
import HeaderBox from "@/components/global/HeaderBox";
import RecordCard from "@/components/time-records/RecordCard";
import { CalendarIcon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Page({ params }: any) {
  return (
    <Box w={"100%"}>
      <HeaderBox title={`Registro / nome projeto`} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        width={"100%"}
        gap={"2em"}
      >
        <RecordCard projectId={params.projectId} />
      </Box>
    </Box>
  )
}