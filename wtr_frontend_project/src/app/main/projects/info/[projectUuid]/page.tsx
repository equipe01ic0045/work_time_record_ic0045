"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectInfoBox from "@/components/projects/ProjectInfoBox";
import { Box } from "@chakra-ui/react";

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
      <HeaderBox title={`Projeto / ${params.projectUuid}`} />
      <Box padding={"1em"}>
        <ProjectInfoBox project={mockDataList} />
      </Box>
    </Box>
  );
}
