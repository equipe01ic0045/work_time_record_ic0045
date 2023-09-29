"use client";

import ProjectInfoBox from "@/components/projects/ProjectInfoBox";
import { Box, Heading } from "@chakra-ui/react";

export default function ProjectInfo({ params }: any) {
  const mockDataList = {
    id: 1,
    projectName: "Projeto 01",
    owner: "Latam Linhas Aéreas S.A.",
    location: "Salvador, Bahia",
    commercial_time: "08:00 - 17:00 UTC",
  };

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Box
        backgroundColor="#F0EFFF"
        w="100%"
        noOfLines={1}
        padding="4em"
        fontWeight="light"
      >
        <Heading textColor="#4D47C3" as="h1" size="2xl">
          Projeto / {params.projectUuid}
        </Heading>
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        justifyContent={"center"}
        width={"100%"}
        padding={"1em"}
        gap={"10em"}
      >
        <ProjectInfoBox project={mockDataList} />
      </Box>
    </Box>
  );
}
