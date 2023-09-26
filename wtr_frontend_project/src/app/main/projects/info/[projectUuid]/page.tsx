'use client';

import ProjectInfo from "@/components/projects/projectInfoComponent";
import ProjectsTableComponent from "@/components/projects/projectsTableComponent";
import { Box, Button, Heading } from "@chakra-ui/react";

// `app/page.tsx` is the UI for the `/` URL
export default function Info({ params }: any) {

    const mockDataList =
    {
        id: 1,
        projectName: "Projeto 01",
        manager: "Luiz Silva",
        company: "LATAM",
        users: 58234
    }

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
        >
            <Box backgroundColor="#F0EFFF" w="100%" noOfLines={1} padding="4em" fontWeight="light">
                <Heading textColor="#4D47C3" as="h1" size="2xl" >{params.projectUuid}</Heading>
            </Box>
            <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"start"}
                justifyContent={"center"}
                width={"100%"}
                padding={"1em"}
                gap={"10em"}
            >
                <ProjectInfo project={mockDataList} />
            </Box>
        </Box>
    )
}