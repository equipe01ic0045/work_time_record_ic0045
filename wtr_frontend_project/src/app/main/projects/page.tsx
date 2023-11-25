"use client";

import ProjectsTable from "@/components/projects/ProjectsTable";
import HeaderBox from "@/components/global/HeaderBox";
import ProjectService from "@/services/ProjectService";
import { Box, Button, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProjectListData from "@/types/ProjectListData";

import { useRouter } from "next/navigation";
export default function Projects() {
  const router = useRouter();
  const projectService = new ProjectService();
  const [projects, setProjects] = useState<ProjectListData[]>([]);

  async function getProjects() {
    const projectsData = await projectService.getUserProjects();
    setProjects(projectsData);
  }

  useEffect(() => {
    getProjects();
  }, []);

  const svgCreate = (
    <svg
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_253_177)">
        <rect x="4" width="80" height="80" rx="40" fill="#F0EFFF" />
        <path
          d="M40.6992 43.3008H19.4891V36.6993H40.6992V15.442H47.3007V36.6993H68.558V43.3008H47.3007V64.5109H40.6992V43.3008Z"
          fill="#4D47C3"
        />
      </g>
      <defs>
        <filter id="filter0_d_253_177" x="0" y="0" width="88" height="88" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_253_177" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_253_177" result="shape" />
        </filter>
      </defs>
    </svg>
  );

  return (
    <Box display={"flex"} flexDirection={"column"} width={['100%']}>
      <HeaderBox title={<Link href={`/main/projects`}>Projetos</Link>} />
      <Box
        display={"flex"}
        flexDirection={"column"}
        marginLeft="3vh"
        padding={"2em"}
        gap={"2em"}
        alignItems={"start"}
        my={4}
      >
        <Button colorScheme="purple" bgColor="#4D47C3"
          gap={"10px"}
          textColor={"#FFFFFF"}
          fontSize={"2em"}
          onClick={() => router.push("/main/projects/create")}
          _hover={{
            transition: '0.5s',
            transform:'scale(1.05)'
          }}
        >
          {svgCreate} NOVO PROJETO
        </Button>
        <ProjectsTable projectsList={projects} />
      </Box>
    </Box>
  );
}
