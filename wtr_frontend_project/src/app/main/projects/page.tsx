"use client";

import ProjectsTable from "@/components/projects/ProjectsTable";
import HeaderBox from "@/components/global/HeaderBox";
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
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox title={`Projetos`} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        padding={"2em"}
        gap={"2em"}
        alignItems={"start"}
      >
        <Button size={"lg"}>+ Novo Projeto</Button>
        <ProjectsTable projectList={mockDataList} />
      </Box>
    </Box>
  );
}
