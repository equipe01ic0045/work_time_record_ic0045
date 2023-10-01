"use client";

import { Box, Heading } from "@chakra-ui/react";

interface HeaderBoxProps {
  title: string;
}

export default function HeaderBox({ title }: HeaderBoxProps) {
  return (
    <Box
      backgroundColor="#F0EFFF"
      w="100%"
      noOfLines={1}
      padding="4em"
      fontWeight="light"
    >
      <Heading textColor="#4D47C3" as="h1" size="2xl">
        {title}
      </Heading>
    </Box>
  );
}
