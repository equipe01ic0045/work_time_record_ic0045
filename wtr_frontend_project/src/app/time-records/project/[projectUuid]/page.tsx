'use client';
import RecordCard from "@/components/time-records/time-records-record-card-component";
import { Box, Text } from "@chakra-ui/react";

// `app/page.tsx` is the UI for the `/` URL
export default function Page({ params }: any) {
    const mockDataCollaborator = {
        
    } 
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"100%"}
            padding={"1em"}
            gap={"10em"}
        >
            <Text fontSize={"6xl"} >
                Project {params.projectUuid}
            </Text>
            <RecordCard></RecordCard>
        </Box>
    )
}