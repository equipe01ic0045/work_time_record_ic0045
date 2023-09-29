"use client";

import ProjectsTable from "@/components/projects/ProjectsTable";
import { Box, Button } from "@chakra-ui/react";

export default function Projects() {
  const mockDataList = [
    {
      id: 1,
      projectName: "projeto-legal-01",
      owner: "infra@latam.com.br",
      users: 58,
    },
    {
      id: 2,
      projectName: "projeto-legal-02",
      owner: "projetos@ifood.com",
      users: 128,
    },
    {
      id: 3,
      projectName: "projeto-legal-03",
      owner: "infra@casasbahia.com.br",
      users: 128,
    },
    {
      id: 4,
      projectName: "projeto-legal-04",
      owner: "admin@redemix.com.br",
      users: 128,
    },
  ];

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      justifyContent={"center"}
      width={"100%"}
      padding={"2em"}
      gap={"10em"}
    >
      <Button size={"lg"}>+ Novo Projeto</Button>
      <ProjectsTable projectList={mockDataList} />
    </Box>
  );
}
