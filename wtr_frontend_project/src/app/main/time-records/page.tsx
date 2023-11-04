"use client";
import HeaderBox from "@/components/global/HeaderBox";
import TimeRecordsTable from "@/components/time-records/TimeRecordsTable";
import ProjectService from "@/services/ProjectService";
import ProjectListData from "@/types/ProjectListData";
import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function TimeRecords() {
  const [projects, setProjects] = useState<ProjectListData[]>([]);

  useEffect(() => {
    new ProjectService().getUserProjects()
      .then((projectsList) => setProjects(projectsList));
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox title={`Registros`} />
      <Box padding={"2em"}>
        <TimeRecordsTable projectsList={projects} />
      </Box>
    </Box>
  );
}
