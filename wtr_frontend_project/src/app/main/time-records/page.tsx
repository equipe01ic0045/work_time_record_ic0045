"use client";
import HeaderBox from "@/components/global/HeaderBox";
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
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox title={`Projetos`} />
      <Box padding={"2em"}>
        <TimeRecordsTable projectList={mockDataList} />
      </Box>
    </Box>
  );
}
