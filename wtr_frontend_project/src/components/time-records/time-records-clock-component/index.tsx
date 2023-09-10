'use client';

import { Button, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function Clock(props: any) {

    const [date, setDate] = useState("")

    function showTime() {
        setInterval(() => {
            setDate(new Date().toLocaleTimeString())
            if (props.onDateChange) {
                props.onDateChange(date)
            }
        }, 500)

    }

    useEffect(() => {
        showTime();
    },[])

    return (
        <Box>
            <Text
                textColor={"white"}
                fontSize={"2xl"}
            >
                {date ?? ""}
            </Text>
        </Box>
    );
}