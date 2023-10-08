"use client";
import { Icon, IconButton, useToast } from "@chakra-ui/react";
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
import { useRouter } from "next/navigation";

export default function TimeRecordsTable({ projectList }: any) {
  const toast = useToast();
  const router = useRouter();

  const checkInProject = async (projectId: string) => {
    // TODO: Do check-in
    router.refresh();
    toast({
      title: "Check-in realizado",
      description: "Check-in realizado com sucesso!",
      duration: 2000,
      status: "success",
      isClosable: true,
      position: "top-right",
    });
  };

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
          {projectList.map((project: any) => {
            return (
              <Tr key={project.id}>
                <Td>
                  <Button>{project.projectName}</Button>
                </Td>
                <Td>{project.owner}</Td>
                <Td>
                  <Link href={`time-records/project/register/${project.id}`}>
                    <IconButton
                      aria-label="Fazer registro"
                      icon={<Icon boxSize="2em" as={FiClock} />}
                      p={3}
                    />
                  </Link>
                </Td>
                <Td>
                  <Link href={`time-records/project/${project.id}/info`}>
                    <IconButton
                      aria-label="Ver registros"
                      icon={<Icon boxSize="2em" as={FiFileText} />}
                      p={3}
                    />
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
