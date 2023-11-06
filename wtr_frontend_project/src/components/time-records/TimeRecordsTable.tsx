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

export default function TimeRecordsTable({ projectList }: any) {
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
          {projectList.map((project: any) => {
            return (
              <Tr key={project.id}>
                <Td>
                  {project.projectName}
                </Td>
                <Td>{project.owner}</Td>
                <Td>
                  <Link href={`time-records/project/register/${project.id}`}>
                    <Button>
                      <Icon width={"2em"} height={"2em"} as={FiClock} />
                    </Button>
                  </Link>
                </Td>
                <Td>
                  <Link href={`time-records/project/${project.id}/info`}>
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
