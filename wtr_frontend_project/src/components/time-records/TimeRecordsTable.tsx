"use client";
import { Icon, useToast } from "@chakra-ui/react";
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
            <Th textColor={"white"}>REGISTROS</Th>
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
                  <Button onClick={(e) => checkInProject(project.id)}>
                    {/* TODO: condition to choose FiClock or FiCheckCircle based in project info */}
                    <Icon width={"2em"} height={"2em"} as={FiClock} />
                  </Button>
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
