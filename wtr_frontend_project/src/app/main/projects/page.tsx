"use client";

import ProjectsTable from "@/components/projects/ProjectsTable";
import HeaderBox from "@/components/global/HeaderBox";
import ProjectService from "@/services/ProjectService";
import { Box, Button, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProjectListData from "@/types/ProjectListData";

export default function Projects() {
  const projectService = new ProjectService();
  const [projects, setProjects] = useState<ProjectListData[]>([]);

  async function getProjects() {
    const projectsData = await projectService.getUserProjects();
    setProjects(projectsData);
  }

  useEffect(() => {
    getProjects();
  }, []);

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
        <Link
          href={`/main/projects/new-project`}
        >
          <Button size={"lg"}>+ Novo Projeto</Button>
        </Link>

        <ProjectsTable projectsList={projects} />
      </Box>
    </Box>
  );
}
