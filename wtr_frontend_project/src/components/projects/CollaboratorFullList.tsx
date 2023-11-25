"use client";
import {
    Box,
    Button,
    Text,
    Input,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Link
} from "@chakra-ui/react";

export default function CollaboratorFullList({ collaboratorFullList }: any) {

    function cpfHandler(cpf: string) {
        const cpfParsed = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`
        return cpfParsed
    }

    return (
        <TableContainer>
            <Table variant='simple'>
                <Thead>
                    <Tr bg="#4D47C3">
                        <Th color="white">Nome</Th>
                        <Th color="white">EMAIL</Th>
                        <Th color="white">CPF</Th>
                        <Th color="white">SELECIONAR</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        collaboratorFullList ?
                            collaboratorFullList.map((collaborator: any) => {
                                return (
                                    <Tr>
                                        <Td>
                                            <Link href={'/main/profile/' + collaborator.user_id}>{collaborator.full_name}</Link>
                                        </Td>
                                        <Td>{collaborator.email}</Td>
                                        <Td>{cpfHandler(collaborator.cpf)}</Td>
                                        <Td>{'something'}</Td>
                                    </Tr>
                                )
                            })
                            : ''
                    }
                </Tbody>
            </Table>
        </TableContainer>
    );
}