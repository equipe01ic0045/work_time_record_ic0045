'use client';
import RecordCard from "@/components/time-records/recordCardComponent";
import { CalendarIcon, Icon } from "@chakra-ui/icons";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function Page({ params }: any) {

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            // justifyContent={"center"}
            width={"100%"}
            // padding={"2em"}
            gap={"2em"}
        >

            <Box backgroundColor="#F0EFFF" w="100%" noOfLines={1} padding="4em" fontWeight="light">
                <Heading textColor="#4D47C3" as="h1" size="2xl" >{params.projectUuid}</Heading>
            </Box>
            <Box 
            display={"flex"}
            flexDirection={"row"}
            gap={"1em"}
            alignItems={"center"}
            justifyContent={"start"}
            width={"100%"}
            padding={"1em"}
            >
                <CalendarIcon boxSize={12} />
                <Text fontSize={"4xl"}>
                    Nome do Projeto
                </Text>
            </Box>
            <RecordCard />

        </Box>
    )
}