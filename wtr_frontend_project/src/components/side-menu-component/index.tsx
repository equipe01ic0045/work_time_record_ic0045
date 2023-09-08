import { Box, Button } from "@chakra-ui/react";
import React from "react";

export default function SideMenuComponent() {
    const pages = ["projects", "timeRecords", "justifications"]
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            bg={"blueviolet"}
        >
            {pages.map((item) => {
                return <Button
                bg={"white"}
                borderRadius={"5px"}
                padding={"0.5em"}
                >{item}</Button>
            })}
        </Box>
    );
}
