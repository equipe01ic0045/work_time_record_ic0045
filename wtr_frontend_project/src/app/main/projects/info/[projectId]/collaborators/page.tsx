"use client";
import { Box, Button, HStack, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProjectService from "@/services/ProjectService";
import HeaderBox from "@/components/global/HeaderBox";
import ProjectInfo from "@/types/ProjectInfo";
import CollaboratorsTable from "@/components/projects/CollaboratorsTable";
import { useParams } from "next/navigation";
import ProjectUsers from "@/types/ProjectUsers";

import jsPDF from "jspdf";
import "jspdf-autotable";
import { currentMonthYear, secondsToHoursMinutes } from "@/utils/date_utils";

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export default function CollaboratosPage({ params }: any) {
  const projectService = new ProjectService();
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>();
  const [collaboratorList, setCollaboratorList] = useState<ProjectUsers[]>([]);
  const urlParameters = useParams();
  const projectId = Number(urlParameters.projectId);
  const projectIdString = urlParameters.projectId;
  
  useEffect(() => {
    projectService
      .getProjectInfo(params.projectId)
      .then((response) => {
        setProjectInfo(response);
      })
      .catch((error) => {});

    projectService
      .getProjectUsers(projectId)
      .then((response) => {
        setCollaboratorList(response);
      })
      .catch((error) => {});
  }, []);

  const plusIcon = (
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
      <defs></defs>
    </svg>
  );

  const tableHeaderRow = [
    "NOME",
    "CPF",
    "EMAIL",
    "FUNÇÃO",
    "HORAS/SEMANA",
    "HORAS REGISTRADAS",
    "HORAS PENDENTES "
  ];


  function PDFReport() {
    const reportTitle = `${projectInfo?.project_name} ${currentMonthYear()}`
    const doc = new jsPDF();

    doc.text(`Relatório de horas ${reportTitle}`, 10, 10);
    doc.autoTable({
      head: [tableHeaderRow],
      body: collaboratorList.map((row) => [
        row.user.full_name,
        row.user.cpf,
        row.user.email,
        row.role,
        row.hours_per_week,
        secondsToHoursMinutes(row.elapsed_time_sum),
        secondsToHoursMinutes(
          4 * row.hours_per_week * 60 * 60 - row.elapsed_time_sum
        ),
      ]),
    });

    // Save the PDF
    doc.save(`${reportTitle}.pdf`);
  }

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} width={"100%"}>
        <HeaderBox
          title={
            <>
              <Link href={`/main/projects`}>Projetos</Link> /{" "}
              {projectInfo ? (
                <Link
                  href={`/main/projects/info/` + params.projectId.toString()}
                >
                  {projectInfo.project_name}
                </Link>
              ) : (
                "...loading"
              )}{" "}
              /{" "}
              <Link
                href={
                  `/main/projects/info/` +
                  params.projectId.toString() +
                  "/collaborators"
                }
              >
                Colaboradores
              </Link>
            </>
          }
        />
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          p={4}
          bg="white"
          marginLeft="5vh"
          zIndex={0}
          width="85%"
        >
          <HStack justifyContent={"space-between"}>
            <Link
              my={8}
              style={{ justifyContent: "flex-start" }}
              href={`/main/projects/add-collaborator/project/${projectIdString}`}
            >
              <Button
                gap={"10px"}
                fontSize={"2em"}
                textColor={"#FFFFFF"}
                colorScheme="purple"
                bgColor="#4D47C3"
              >
                {plusIcon}
                NOVO COLABORADOR
              </Button>
            </Link>

            <Button
              textColor={"#FFFFFF"}
              colorScheme="purple"
              bgColor="#4D47C3"
              onClick={PDFReport}
            >
              Gerar relatório
            </Button>
          </HStack>

          <Box width="100%" borderWidth="1px" bg="#F0EFFF">
            <CollaboratorsTable
              projectId={projectId}
              collaboratorList={collaboratorList}
              tableRows={tableHeaderRow}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
