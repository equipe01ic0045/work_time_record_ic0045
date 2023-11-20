"use client";
import HeaderBox from "@/components/global/HeaderBox";
import JustificationListTable from "@/components/time-records/JustificationsList";
import JustificationService from "@/services/JustificationService";
import { JustificationInfoManager } from "@/types/TimeRecordInfoData";
import { Box } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TimeRecords() {
  const params = useParams();
  const [justifications, setJustifications] = useState<JustificationInfoManager[]>([]);

  useEffect(() => {
    JustificationService
      .getJustificationListData(Number(params.projectId))
      .then((justificationList) => {
        setJustifications(justificationList);
      });
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox title={'Justificativas'} />
      <Box padding={"2em"}>
        <JustificationListTable justificationsList={justifications} />
      </Box>
    </Box>
  );
}
