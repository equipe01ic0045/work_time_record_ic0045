"use client";
import ProjectListData from "@/types/ProjectListData";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Link,
} from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";

// Note: o Owner é simplesmente o primeiro admin do projeto no banco
export default function ProjectsTable({
  projectsList,
}: {
  projectsList: ProjectListData[];
}) {
  const iconUser = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
    >
      <path
        fill="#FFFFFF"
        d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"
      />
    </svg>
  );

  function formatToTwoDigits(num: number): string {
    let integerStr = num.toString();
    while (integerStr.length < 2) {
      integerStr = "0" + integerStr;
    }
    return integerStr;
  }

  function getFormattedCommercialTime(commercialTime: number): string {
    const hour = Math.floor(commercialTime / 60);
    const minute = commercialTime % 60;
    return `${formatToTwoDigits(hour)}:${formatToTwoDigits(minute)}`;
  }

  return (
    <TableContainer width={"100%"} borderRadius={3}>
      <Table variant="simple" background={"#F0EFFF"}>
        <Thead bg={"#4D47C3"}>
          <Tr>
            <Th textColor={"white"}>NOME DO PROJETO</Th>
            <Th textColor={"white"}>PROPRIETÁRIO</Th>
            <Th textColor={"white"}>HORÁRIO COMERCIAL</Th>
            <Th textColor={"white"}>COLABORADORES</Th>
            <Th textColor={"white"}>Justificativas</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectsList.map((projectData: ProjectListData) => {
            let commercialTimeFormat: string = "";
            if (
              projectData.project.commercial_time_start != undefined &&
              projectData.project.commercial_time_end != undefined
            ) {
              commercialTimeFormat = `${getFormattedCommercialTime(
                projectData.project.commercial_time_start
              )} - ${getFormattedCommercialTime(
                projectData.project.commercial_time_end
              )} (${projectData.project.timezone})`;
            }

            return (
              <Tr
                key={projectData.project.project_id}
                borderBottom="2px"
                borderColor="gray.300"
              >
                <Td>
                  <Link
                    href={`/main/projects/info/${projectData.project.project_id}`}
                  >
                    <Button
                      width="125px"
                      colorScheme="purple"
                      bgColor="#4D47C3"
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      padding="1em"
                    >
                      {projectData.project.project_name}
                    </Button>
                  </Link>
                </Td>
                <Td>{projectData.project.owner.full_name}</Td>
                <Td>{commercialTimeFormat}</Td>
                <Td>
                  <Link
                    href={`/main/projects/info/${projectData.project.project_id}/collaborators`}
                  >
                    <Button
                      width={"auto"}
                      minWidth={"100px"}
                      display="flex"
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      color={"#FFFFFF"}
                      colorScheme="purple"
                      bgColor="#4D47C3"
                    >
                      {iconUser}
                      {projectData.project.users_count}
                    </Button>
                  </Link>
                </Td>

                <Td>
                  <Link
                    href={`/main/projects/info/${projectData.project.project_id}/justifications`}
                  >
                    <Button
                      width={"auto"}
                      minWidth={"100px"}
                      display="flex"
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-around"}
                      color={"#FFFFFF"}
                      colorScheme="white"
                      bgColor="#fa7b05"
                    >
                      <EmailIcon boxSize={6} marginRight={3} /> 5 pendentes
                    </Button>
                  </Link>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
