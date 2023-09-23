'use client';

import { Button, Box, Text, useToast } from "@chakra-ui/react";
import Clock from "./clockComponent";
import { useState } from "react";

export default function RecordCard() {

    const  iconUser = (<svg xmlns="http://www.w3.org/2000/svg" height="150" viewBox="0 -960 960 960" width="150"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z"/></svg>);
    const toast = useToast();

    const [newRecord, setRecord] = useState<any>({
        time:'',
        date:''
    })
    function newRecordHandler() {
        setRecord({
            time : new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
        })
        toast({
            title: 'registro de horario efetuado',
            description: "",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top-right"
          })
    }

    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            width={"30%"}
            height={"50%"}
            // background={"blueviolet"}
            borderRadius={"1em"}
            gap={"2em"}
        >
            {iconUser}
            <Clock />
            <Button 
            onClick={newRecordHandler}
            minHeight={"50px"}
            background={"blueviolet"}
            color={"white"}
            >
                Registro de Tempo
            </Button>
            <Text fontSize={"md"}>
                {newRecord.time ? newRecord.time + "  " + newRecord.date  : ""}
            </Text>
        </Box>
    );
}