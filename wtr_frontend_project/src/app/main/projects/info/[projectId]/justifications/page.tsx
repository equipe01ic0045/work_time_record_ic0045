"use client";
import HeaderBox from "@/components/global/HeaderBox";
import JustificationListTable from "@/components/time-records/JustificationsList";
import JustificationService from "@/services/JustificationService";
import { JustificationInfoManager, status } from "@/types/TimeRecordInfoData";
import { Box, Select, Text } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function TimeRecords() {
  const params = useParams();
  const [justifications, setJustifications] = useState<
    JustificationInfoManager[]
  >([]);

  const [selectedStatus, setSelectedStatus] = useState<status>("PENDING");

  useEffect(() => {
    JustificationService.getJustificationListData(
      Number(params.projectId),
      selectedStatus
    ).then((justificationList) => {
      setJustifications(justificationList);
    });
  }, [selectedStatus]);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox title={"Justificativas"} />

      <Box padding={"2em"}>
        <Box
          width={200}
          marginBottom={5}
          display={"flex"}
          flexDirection={"column"}
        >
          <Text fontWeight={"bold"} marginBottom={2}>
            Status das Justificativas
          </Text>
          <Select
            size="lg"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as status)}
          >
            <option value="PENDING">PENDENTE</option>
            <option value="APPROVED">APROVADO</option>
            <option value="DENIED">NEGADO</option>
          </Select>
        </Box>

        <JustificationListTable justificationsList={justifications} />
      </Box>
    </Box>
  );
}
