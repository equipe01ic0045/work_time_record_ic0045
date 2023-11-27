"use client";
import { formatCpf } from "@/utils/formatting_utils";
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from "@chakra-ui/react";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CollaboratorFullList({
  collaboratorFullList,
  setSelectedUser,
}: any) {
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr bg="#4D47C3">
            <Th color="white">Nome</Th>
            <Th color="white">EMAIL</Th>
            <Th color="white">CPF</Th>
            <Th color="white">SELECIONAR</Th>
          </Tr>
        </Thead>
        <Tbody>
          {collaboratorFullList
            ? collaboratorFullList.map((collaborator: any) => {
                return (
                  <Tr>
                    <Td>
                      <Link href={"/main/profile/" + collaborator.user_id}>
                        {collaborator.full_name}
                      </Link>
                    </Td>
                    <Td>{collaborator.email}</Td>
                    <Td>{formatCpf(collaborator.cpf)}</Td>
                    <Td>
                      <Button
                        size="sm"
                        ml={2}
                        colorScheme={"green"}
                        onClick={() => {
                          setSelectedUser(collaborator);
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          style={{ marginRight: "4px", color: "#F0EFFF" }}
                        />
                        Selecionar
                      </Button>
                    </Td>
                  </Tr>
                );
              })
            : ""}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
