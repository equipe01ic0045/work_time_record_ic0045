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
  Link,
} from "@chakra-ui/react";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export default function CollaboratorsTable({
  collaboratorList,
  projectId,
}: {
  collaboratorList: CollaboratorListData[];
  projectId: number;
}) {
  const { user } = useAuth();
  const [userIsManager, setUserIsManager] = useState<boolean>(false);
  const toast = useToast();
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
      await projectService.deleteUserInProject(projectId, userId);
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

  function checkIfuserIsManager() {
    for (let collaborator of collaboratorList) {
      if (collaborator.user.user_id == user?.userId) {
        if (collaborator.role !== "USER") {
          return true;
        }
        break;
      }
    }
    return false;
  }

  useEffect(() => {
    setUserIsManager(checkIfuserIsManager());
  }, [collaboratorList]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableHeaderRow.map((header) => {
              if (header !== "EXCLUIR" || userIsManager) {
                return (
                  <Th key={header} bg="#4D47C3" color="white">
                    {header}
                  </Th>
                );
              }
            })}
          </Tr>
        </Thead>
        <Tbody>
          {collaboratorList ? (
            collaboratorList.map((collaborator: CollaboratorListData) => {
              return (
                <Tr key={collaborator.user.user_id}>
                  <Td>
                    <Link href={"/main/profile/" + collaborator.user.user_id}>
                      {collaborator.user.full_name}
                    </Link>
                  </Td>
                  <Td>{collaborator.user.cpf}</Td>
                  <Td>{collaborator.user.email}</Td>
                  <Td>{collaborator.role}</Td>
                  <Td>{collaborator.hours_per_week}</Td>
                  {userIsManager ? (
                    <Td>
                      <IconButton
                        aria-label="Remove user from project"
                        colorScheme="red"
                        size={"lg"}
                        onClick={() => {
                          deleteUserInProject(collaborator.user.user_id ?? 0);
                        }}
                        icon={<DeleteIcon />}
                      ></IconButton>
                    </Td>
                  ) : null}
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
