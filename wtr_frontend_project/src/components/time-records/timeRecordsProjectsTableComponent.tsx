'use client';
import { Icon } from "@chakra-ui/react";
import { FiClock } from 'react-icons/fi';
import { FiFileText } from 'react-icons/fi';
import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";

export default function TimeRecordsProjectsTable({ projectList }: any) {

    return (
        <TableContainer
            width={"100%"}
        >
            <Table
                variant='simple'
                background={"gray.200"}
            >
                <Thead bg={"blueviolet"}>
                    <Tr>
                        <Th textColor={"white"}>PROJECT NAME</Th>
                        <Th textColor={"white"}>MANAGER</Th>
                        <Th textColor={"white"}>COMPANY</Th>
                        <Th textColor={"white"}>TIME RECORD</Th>
                        <Th textColor={"white"}>INFO</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {projectList.map((project: any) => {
                        return (
                            <Tr key={project.id}>
                                <Td><Button>{project.projectName}</Button></Td>
                                <Td>{project.manager}</Td>
                                <Td>{project.company}</Td>
                                <Td>
                                    <Link href={`time-records/project/register/${project.id}`}>
                                        <Button>
                                            <Icon width={"2em"} height={"2em"} as={FiClock} />
                                        </Button>
                                    </Link>
                                </Td>
                                <Td>
                                    <Link href={`time-records/project/info/${project.id}`}>
                                        <Button>
                                            <Icon width={"2em"} height={"2em"} as={FiFileText} />
                                        </Button>
                                    </Link>
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}