"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectInfoBox from "@/components/projects/ProjectInfoBox";
import ProjectCreateBox from "@/components/projects/ProjectCreateBox";
import ProjectService from "@/services/ProjectService";
import ProjectInfo from "@/types/ProjectInfo";
import { Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProfileBox from "@/components/profiles/ProfileBox";

export default function ProjectUpdate({ params }: any) {
  const [projectInfo, setProjectInfo] = useState<any>();

  async function getProjectInfo() {
  
    const projectInfoDataR = await fetch('http://localhost:5000/profiles/'+params.profileId, {
      method: "GET",
      credentials: 'include',
    });
    
    const projectInfoDataJSON = await projectInfoDataR.json();
    const projectInfoData = projectInfoDataJSON.profile;
    const info ={...projectInfoData, edit: true};
    info.password = "";
    setProjectInfo(info);
    
  }
  
  useEffect(() => {
    getProjectInfo();
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={'100%'}>
      <HeaderBox title={<><Link href={`/main/projects`}>Perfil</Link> / {params.profileId} / Editar</>} />
      <Box padding={"1em"}>
        {projectInfo ? <ProfileBox project={projectInfo} /> : 'Loading...'}
      </Box>
      
    </Box>
  );
}
