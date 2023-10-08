"use client";
import { Icon, IconButton } from "@chakra-ui/react";
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
            <Th textColor={"white"}>REGISTRAR</Th>
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
                    <IconButton
                      aria-label="Fazer registro"
                      icon={<Icon boxSize="2em" as={FiClock} />}
                      p={3}
                      color={projectData.open_check_in ? "orange" : "black"}
                    />
                  </Link>
                </Td>
                <Td>
                  <Link
                    href={`time-records/project/${projectData.project.project_id}/info`}
                  >
                    <IconButton
                      aria-label="Ver registros"
                      icon={<Icon boxSize="2em" as={FiFileText} />}
                      p={3}
                    />
                  </Link>
                </Td>
              </Tr >
            );
          })}
        </Tbody >
      </Table >
    </TableContainer >
  );
}
