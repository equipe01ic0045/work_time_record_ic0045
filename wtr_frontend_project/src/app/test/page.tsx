'use client';
import CollaboratorsTable from "@/components/projects/CollaboratorsTable";
import { Box } from "@chakra-ui/react";

export default function TestComponent() {

 return (
    <Box
    width={"100%"}
    height={"100%"}
    padding={"2em"}
    >
        <CollaboratorsTable />
    </Box>
 )

}