'use client';

import { Button, Box, Text } from "@chakra-ui/react";
import Clock from "../time-records-clock-component";
import { useState } from "react";

export default function RecordCard() {

    const [newRecord, setRecord] = useState("")
    function newRecordHandler() {
        setRecord(new Date().toLocaleTimeString())
    }

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"30%"}
            height={"50%"}
            background={"blueviolet"}
            borderRadius={"1em"}
            gap={"2em"}
        >
            <Box
                borderRadius={"50%"}
                background={"white"}
                width={"100px"}
                height={"100px"}
            >

            </Box>
            <Clock />
            <Button onClick={newRecordHandler}>
                Record Time
            </Button>
            <Text fontSize={"xl"}>
                {newRecord ?? ""}
            </Text>
        </Box>
    );
}