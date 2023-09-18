'use client';

import ProjectsUIComponent from "@/components/projects/project-ui-component";
import { Box, Button } from "@chakra-ui/react";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {

  const mockDataList = 
    {
      id: 1,
      projectName: "Projeto 01",
      manager: "Luiz Silva",
      company: "LATAM",
      users: 58234
    }
  

  return (
      <ProjectsUIComponent project={mockDataList}></ProjectsUIComponent>
  )
}