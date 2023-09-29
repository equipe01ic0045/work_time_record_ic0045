'use client';

import ProjectsTableComponent from "@/components/projects/projects-table-component";
import { Box, Button } from "@chakra-ui/react";

// `app/page.tsx` is the UI for the `/` URL
export default function Page() {

  const mockDataList = [
    {
      id: 1,
      projectName: "Projeto 01",
      manager: "Luiz Silva",
      company: "LATAM",
      users: 58234
    },
    {
      id: 2,
      projectName: "Projeto 02",
      manager: "Carla Silva",
      company: "IFood",
      users: 128
    },
    {
      id: 3,
      projectName: "Projeto 03",
      manager: "Fabio Silva",
      company: "Casas Bahia",
      users: 128
    },
    {
      id: 4,
      projectName: "Projeto 04",
      manager: "Ana Silva",
      company: "Redemix",
      users: 128
    }
  ]
  mockDataList.forEach(project => project.admin = true);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      justifyContent={"center"}
      width={"100%"}
      padding={"1em"}
      gap={"10em"}
    >
      <Button> 
        + NEW PROJECT
        </Button>
      <ProjectsTableComponent projectList={mockDataList}></ProjectsTableComponent>
    </Box>
  )
}