'use client';
import { Box, Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function SideMenuComponent() {
    const pages = [
        {
            id: 1,
            name: "Projects",
            link: "projects"
        }, {
            id: 2,
            name: "Time Records",
            link: "time-records"
        }, {
            id: 3,
            name: "Justifications",
            link: "justifications"
        }
    ]
    return (
        <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"start"}
            gap={"0.5em"}
            bg={"blueviolet"}
            padding={"0.5em"}
            width={"20%"}
        >
            {pages.map((item) => {
                return <Link
                    key={item.id}
                    href={`/${item.link}`}
                >
                    <Button
                        bg={"white"}
                        borderRadius={"5px"}
                        padding={"1em"}
                        width={"100px"}
                    >
                        {item.name}
                    </Button>
                </Link>
            })}
        </Box>
    );
}
