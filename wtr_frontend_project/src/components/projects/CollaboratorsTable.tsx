"use client";
import CollaboratorListData from "@/types/CollaboratorListData";
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
    Box,
} from "@chakra-ui/react";
import { useEffect } from "react";

export default function CollaboratorsTable({ collaboratorList }: any) {

    const deleteIcon = (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
        </svg>)



    const tableHeaderRow = ['NOME', 'CPF', 'EMAIL', 'FUNÇÃO', 'HORAS/SEMANA', 'EXCLUIR']

    useEffect(() => {

    }, [])

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr >
                        {tableHeaderRow.map((header) => {
                            return (<Th key={header} bg="#4D47C3" color="white">{header}</Th>)
                        })}
                    </Tr>
                </Thead>
                <Tbody>
                    {collaboratorList ?
                        collaboratorList.map((collaborator: CollaboratorListData) => {
                            return (
                                <Tr key={collaborator.user.user_id}>
                                    <Td>{collaborator.user.full_name}</Td>
                                    <Td>{collaborator.user.cpf}</Td>
                                    <Td>{collaborator.user.email}</Td>
                                    <Td>{collaborator.role}</Td>
                                    <Td>{collaborator.hours_per_week}</Td>
                                    <Td><Button colorScheme="red">{deleteIcon}</Button></Td>
                                </Tr>
                            )
                        }) :
                        <></>
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}