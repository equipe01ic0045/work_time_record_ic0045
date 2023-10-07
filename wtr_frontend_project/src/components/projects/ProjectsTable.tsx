"use client";
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
export default function ProjectsTable({ projectList }: any) {
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

  return (
    <TableContainer width={"100%"}>
      <Table variant="simple" background={"gray.200"}>
        <Thead bg={"blueviolet"}>
          <Tr>
            <Th textColor={"white"}>NOME DO PROJETO</Th>
            <Th textColor={"white"}>PROPRIETÁRIO</Th>
            <Th textColor={"white"}>USUÁRIOS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectList.map((project: any) => {
            return (
              <Tr key={project.id}>
                <Td>
                  <Link href={`/main/projects/info/${project.id}`}>
                    <Button>{project.projectName}</Button>
                  </Link>
                </Td>
                <Td>{project.owner}</Td>
                <Td>
                  <Link href={`/main/projects/info/${project.id}/manageColaborator`}>
                    <Button
                      width={"auto"}
                      minWidth={"100px"}
                      display="flex"
                      flexDirection={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      {project.users}
                      {iconUser}
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
