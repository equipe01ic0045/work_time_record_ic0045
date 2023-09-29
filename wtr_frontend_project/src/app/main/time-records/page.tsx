"use client";
import TimeRecordsTable from "@/components/time-records/TimeRecordsTable";
import { Box } from "@chakra-ui/react";

export default function TimeRecords() {
  const mockDataList = [
    {
      id: 1,
      projectName: "projeto-legal-01",
      owner: "infra@latam.com.br",
      users: 58,
    },
    {
      id: 2,
      projectName: "projeto-legal-02",
      owner: "projetos@ifood.com",
      users: 128,
    },
    {
      id: 3,
      projectName: "projeto-legal-03",
      owner: "infra@casasbahia.com.br",
      users: 128,
    },
    {
      id: 4,
      projectName: "projeto-legal-04",
      owner: "admin@redemix.com.br",
      users: 128,
    },
  ];
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      justifyContent={"center"}
      width={"100%"}
      padding={"1em"}
      gap={"10em"}
    >
      <TimeRecordsTable projectList={mockDataList} />
    </Box>
  );
}
