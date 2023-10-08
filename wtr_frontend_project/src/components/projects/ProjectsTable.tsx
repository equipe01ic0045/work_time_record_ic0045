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

// Note: o Owner é simplesmente o primeiro admin do projeto no banco
export default function ProjectsTable({
  projectList,
}: {
  projectList: ProjectListData[];
}) {
  const iconUser = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
    >
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
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
    <TableContainer width={"100%"}>
      <Table variant="simple" background={"gray.200"}>
        <Thead bg={"blueviolet"}>
          <Tr>
            <Th textColor={"white"}>NOME DO PROJETO</Th>
            <Th textColor={"white"}>PROPRIETÁRIO</Th>
            <Th textColor={"white"}>HORÁRIO COMERCIAL</Th>
            <Th textColor={"white"}>USUÁRIOS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectList.map((project: ProjectListData) => {
            let commercialTimeFormat: string = "";
            if (project.commercial_time_start!=undefined  && project.commercial_time_end!=undefined) { // 0 is false, but 0 is 12:00 AM. 
              commercialTimeFormat = `${getFormattedCommercialTime(
                project.commercial_time_start
              )} - ${getFormattedCommercialTime(
                project.commercial_time_end
              )} (${project.timezone})`;
            }

            return (
              <Tr key={project.project_id}>
                <Td>
                  <Link href={`/main/projects/info/${project.project_id}`}>
                    <Button>{project.project_name}</Button>
                  </Link>
                </Td>
                <Td>{project.owner.email}</Td>
                <Td>{commercialTimeFormat}</Td>
                <Td>
                  <Button
                    width={"auto"}
                    minWidth={"100px"}
                    display="flex"
                    flexDirection={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    {project.users_count}
                    {iconUser}
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
