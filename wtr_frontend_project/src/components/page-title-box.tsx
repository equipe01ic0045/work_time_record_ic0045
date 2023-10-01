import { Box, Heading } from "@chakra-ui/react";

export default function PageTitleBox({ title }: { title: string }) {
  return (
    <Box backgroundColor="#F0EFFF" w="100%" noOfLines={1} padding="4em" fontWeight="light">
      <Heading textColor="#4D47C3" as="h1" size="2xl" >{title}</Heading>
    </Box>
  )
}