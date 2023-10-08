"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectCreateBox from "@/components/projects/ProjectCreateBox";

import ProjectInfo from "@/types/ProjectInfo";
import { Box } from "@chakra-ui/react";

export default function ProjectInfo({ params }: any) {
  const loadingData = {
    project_name: "Nome do Projeto",
    project_description: "Descrição do Projeto",
    location: "Localização",
    commercial_time_start: "00:00",
    commercial_time_end: "05:00",
    timezone: "America/Bahia",
    location_required : false,
    commercial_time_required: false,
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={'100%'}>
      <HeaderBox title={`Projeto / Criar Projeto`} />
      <Box padding={"1em"}>
        <ProjectCreateBox project={loadingData} />
      </Box>
    </Box>
  );
}
