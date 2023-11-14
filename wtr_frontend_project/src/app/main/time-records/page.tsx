"use client";
import HeaderBox from "@/components/global/HeaderBox";
import TimeRecordsTable from "@/components/time-records/TimeRecordsTable";
import TimeRecordService from "@/services/TimeRecordService";
import { TimeRecordListData } from "@/types/ProjectListData";
import { Box, Link } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function TimeRecords() {
  const [projects, setProjects] = useState<TimeRecordListData[]>([]);

  useEffect(() => {
    new TimeRecordService()
      .getUserProjectTimeRecordsInfo()
      .then((projectsList) => {
        setProjects(projectsList);
      });
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox title={<Link href={`/main/time-records`}>Registros</Link>} />
      <Box padding={"2em"}>
        <TimeRecordsTable projectsList={projects} />
      </Box>
    </Box>
  );
}
