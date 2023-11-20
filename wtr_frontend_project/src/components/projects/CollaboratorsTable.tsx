"use client";
import ProjectService from "@/services/ProjectService";
import CollaboratorListData from "@/types/CollaboratorListData";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  useToast,
  IconButton,
} from "@chakra-ui/react";

export default function CollaboratorsTable({
  collaboratorList,
  projectId,
}: {
  collaboratorList: CollaboratorListData[];
  projectId: number;
}) {
  const toast = useToast();
  const projectIdNumber = projectId;
  const projectService = new ProjectService();
  const tableHeaderRow = [
    "NOME",
    "CPF",
    "EMAIL",
    "FUNÇÃO",
    "HORAS/SEMANA",
    "EXCLUIR",
  ];

  const deleteUserInProject = async (userId: number) => {
    try {
      await projectService.deleteUserInProject(projectIdNumber, userId);
      toast({
        title: "Usuario Deletado",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error) {
      toast({
        title: "Falha ao Deletar Usuario",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableHeaderRow.map((header) => {
              return (
                <Th key={header} bg="#4D47C3" color="white">
                  {header}
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {collaboratorList ? (
            collaboratorList.map((collaborator: CollaboratorListData) => {
              return (
                <Tr key={collaborator.user.user_id}>
                  <Td>{collaborator.user.full_name}</Td>
                  <Td>{collaborator.user.cpf}</Td>
                  <Td>{collaborator.user.email}</Td>
                  <Td>{collaborator.role}</Td>
                  <Td>{collaborator.hours_per_week}</Td>
                  <Td>
                    <IconButton
                      aria-label='Remove user from project'
                      colorScheme="red"
                      size={"lg"}
                      onClick={() => {
                        deleteUserInProject(collaborator.user.user_id ?? 0);
                      }}
                      icon={<DeleteIcon/>}
                    >
                    </IconButton>
                  </Td>
                </Tr>
              );
            })
          ) : (
            <></>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
