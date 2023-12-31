"use client";
import ProjectService from "@/services/ProjectService";
import ProjectUsers from "@/types/ProjectUsers";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { useAuth } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { secondsToHoursMinutes } from "@/utils/date_utils";
import { useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";
import { formatCpf } from "@/utils/formatting_utils";

export default function CollaboratorsTable({
  collaboratorList,
  setCollaboratorList,
  projectId,
  tableRows,
}: {
  collaboratorList: ProjectUsers[];
  setCollaboratorList: (v: ProjectUsers[]) => void;
  projectId: number;
  tableRows: string[];
}) {
  const { user } = useAuth();
  const [userIsManager, setUserIsManager] = useState<boolean>(false);
  const toast = useToast();
  const router = useRouter();
  const projectService = new ProjectService();

  const tableHeaderRow = [...tableRows, "ATUALIZAR", "EXCLUIR"];

  let managerColumns: string[] = [
    "EXCLUIR",
    "ATUALIZAR",
    "HORAS PENDENTES",
    "HORAS REGISTRADAS",
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
      setCollaboratorList(
        collaboratorList.filter((user) => user.user_id != userId)
      );
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

  const updateUserInProject = async (userId: number) => {
    router.push(
      `/main/projects/info/${projectId}/collaborators/profile/${userId}`
    );
    try {
    } catch {}
  };

  function checkIfuserIsManager() {
    if (collaboratorList) {
      for (let collaborator of collaboratorList) {
        if (collaborator.user.user_id == user?.userId) {
          if (collaborator.role !== "USER") {
            return true;
          }
          break;
        }
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
              if (
                userIsManager ||
                managerColumns.every((column) => header !== column)
              ) {
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
            collaboratorList.map((collaborator: ProjectUsers) => {
              return (
                <Tr key={collaborator.user.user_id}>
                  <Td>
                    <Link href={"/main/profile/" + collaborator.user.user_id}>
                      {collaborator.user.full_name}
                    </Link>
                  </Td>
                  <Td>{formatCpf(collaborator.user.cpf)}</Td>
                  <Td>{collaborator.user.email}</Td>
                  <Td>{collaborator.role}</Td>
                  <Td>{collaborator.hours_per_week}</Td>

                  {userIsManager ? (
                    <>
                      <Td>
                        {secondsToHoursMinutes(collaborator.elapsed_time_sum)}
                      </Td>
                      <Td>
                        {secondsToHoursMinutes(
                          4 * collaborator.hours_per_week * 60 * 60 -
                            collaborator.elapsed_time_sum
                        )}
                      </Td>

                      {collaborator.user_id !== user?.userId ? (
                        <>
                          <Td>
                            <IconButton
                              aria-label="Remove user from project"
                              colorScheme="orange"
                              size={"lg"}
                              onClick={() => {
                                updateUserInProject(
                                  collaborator.user.user_id ?? 0
                                );
                              }}
                              icon={<EditIcon />}
                            ></IconButton>
                          </Td>

                          <Td>
                            <IconButton
                              aria-label="Remove user from project"
                              colorScheme="red"
                              size={"lg"}
                              onClick={() => {
                                deleteUserInProject(
                                  collaborator.user.user_id ?? 0
                                );
                              }}
                              icon={<DeleteIcon />}
                            ></IconButton>
                          </Td>
                        </>
                      ) : null}
                    </>
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
