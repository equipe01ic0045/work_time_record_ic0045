'use client';

import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import Link from "next/link";

export default function TimeRecordsTableComponent({projectList}:any){

    return (
        <TableContainer>
            <Table
                variant='simple'
                background={"gray.200"}
            >
                <TableCaption>Projects List</TableCaption>
                <Thead bg={"blueviolet"}>
                    <Tr>
                        <Th textColor={"white"}>PROJECT NAME</Th>
                        <Th textColor={"white"}>MANAGER</Th>
                        <Th textColor={"white"}>COMPANY</Th>
                        <Th textColor={"white"}>INFO</Th>
                        <Th textColor={"white"}>RECORD TIME</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {projectList.map((project: any) => {
                        return (
                            <Tr key={project.id}>
                                <Td><Button>{project.projectName}</Button></Td>
                                <Td>{project.manager}</Td>
                                <Td>{project.company}</Td>
                                <Td><Button>info</Button></Td>
                                <Td><Link href={`/time-records/project/${project.id}`}><Button>record time</Button></Link></Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}