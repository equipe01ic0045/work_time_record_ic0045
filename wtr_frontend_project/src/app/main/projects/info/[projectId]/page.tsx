"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectInfoBox from "@/components/projects/ProjectInfoBox";
import ProjectService from "@/services/ProjectService";
import ProjectInfo from "@/types/ProjectInfo";
import { Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ProjectInfo({ params }: any) {
  const loadingData = {
    project_name: "...loading",
    project_description: "...loading",
    owner: {
      email: "...loading"
    },    
    location: "...loading",
    commercial_time_start: "...loading",
    commercial_time_end: "...loading",
    created_at: "...loading",
    timezone: "...loading",
    users_count: 0 
  };

  const projectService = new ProjectService();
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>();

  async function getProjectInfo() {
    const projectInfoData = await projectService.getProjectInfo(
      params.projectId
    );
    setProjectInfo(projectInfoData);
  }

  useEffect(() => {
    getProjectInfo();
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={'100%'}>
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / {projectInfo? <Link href={`/main/projects/info/`+ params.projectId.toString()}>{projectInfo.project_name}</Link> : "...loading"}</>} />
      <Box padding={"1em"}>
        <ProjectInfoBox project={projectInfo? projectInfo: loadingData} />
      </Box>
    </Box>
  );
}
