"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectCreateBox from "@/components/projects/ProjectCreateBox";

import ProjectInfo from "@/types/ProjectInfo";
import { Box, Link } from "@chakra-ui/react";

export default function ProjectInfo({ params }: any) {
  const loadingData = {
    project_name: "",
    project_description: "",
    location: "",
    commercial_time_start: "00:00",
    commercial_time_end: "05:00",
    timezone: "America/Bahia",
    location_required : false,
    commercial_time_required: false,
  };

  return (
    <Box display={"flex"} flexDirection={"column"} width={'100%'}>
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / Criar Projeto</>} />
      <Box padding={"1em"}>
        <ProjectCreateBox project={loadingData} />
      </Box>
    </Box>
  );
}
