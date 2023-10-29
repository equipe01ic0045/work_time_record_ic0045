"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectInfoBox from "@/components/projects/ProjectInfoBox";
import ProjectCreateBox from "@/components/projects/ProjectCreateBox";
import ProjectService from "@/services/ProjectService";
import ProjectInfo from "@/types/ProjectInfo";
import { Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ProjectUpdate({ params }: any) {
  const projectService = new ProjectService();
  const [projectInfo, setProjectInfo] = useState<any>();

  async function getProjectInfo() {

    function formatToTwoDigits(num: number): string {
      let integerStr = num.toString();
      while (integerStr.length < 2) {
        integerStr = "0" + integerStr;
      }
      return integerStr;
    }
  
    function getFormattedCommercialTime(commercialTime: number): string {
      const hour = Math.floor(commercialTime / 60); // result without floor is float
      const minute = commercialTime % 60;
      return `${formatToTwoDigits(hour)}:${formatToTwoDigits(minute)}`;
    }
  
    const projectInfoDataR = await fetch('http://localhost:5000/projects/'+params.projectId, {
      method: "GET",
      credentials: 'include',
    });
    
    const projectInfoDataJSON = await projectInfoDataR.json();
    const projectInfoData = projectInfoDataJSON.data;

    ['commercial_time_start', 'commercial_time_end'].forEach((key) => projectInfoData[key] = getFormattedCommercialTime(projectInfoData[key]));

    setProjectInfo({...projectInfoData, edit: true});
  }
  
  useEffect(() => {
    getProjectInfo();
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={'100%'}>
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / {projectInfo? <Link href={`/main/projects/info/`+ params.projectId.toString()}>{projectInfo.project_name}</Link> : "...loading"} / Editar</>} />
      <Box padding={"1em"}>
        {projectInfo ? <ProjectCreateBox project={projectInfo} /> : 'Loading...'}
      </Box>
    </Box>
  );
}
