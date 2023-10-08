"use client";
import { Icon } from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import ProjectListData from "@/types/ProjectListData";

export default function TimeRecordsTable({ projectsList }: any) {
  return (
    <TableContainer width={"100%"}>
      <Table variant="simple" background={"gray.200"}>
        <Thead bg={"blueviolet"}>
          <Tr>
            <Th textColor={"white"}>NOME DO PROJETO</Th>
            <Th textColor={"white"}>PROPRIETÁRIO</Th>
            <Th textColor={"white"}>REGISTROS</Th>
            <Th textColor={"white"}>INFORMAÇÕES</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectsList.map((projectData: ProjectListData) => {
            return (
              <Tr key={projectData.project.project_id}>
                <Td>{projectData.project.project_name}</Td>
                <Td>{projectData.project.owner.email}</Td>
                <Td>
                  <Link
                    href={`time-records/project/register/${projectData.project.project_id}`}
                  >
                    <Button>
                      <Icon
                        width={"2em"}
                        height={"2em"}
                        as={FiClock}
                        color={projectData.open_check_in ? "orange" : "black"}
                      />
                    </Button>
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={`time-records/project/${projectData.project.project_id}/info`}
                  >
                    <Button>
                      <Icon width={"2em"} height={"2em"} as={FiFileText} />
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
