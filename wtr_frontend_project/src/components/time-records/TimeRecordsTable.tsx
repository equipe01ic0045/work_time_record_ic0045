"use client";
import { HStack, Icon, IconButton, Tooltip, useToast } from "@chakra-ui/react";
import { FiClock, FiEdit, FiFileText } from "react-icons/fi";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { TimeRecordListData } from "@/types/ProjectListData";
import { useEffect, useState } from "react";
import TimeRecordService from "@/services/TimeRecordService";
import { SimpleTimeRecordData } from "@/types/TimeRecordData";
import { formatDate } from "@/utils/date_utils";

function ProjectRow({ projectData }: { projectData: TimeRecordListData }) {
  const [hasOpenCheckIn, setHasOpenCheckIn] = useState<boolean>(
    projectData.open_check_in
  );
  const [recordNextAction, setRecordNextAction] = useState<string | null>();
  
  const [checkin,setCheckin] = useState<Date|string| null>(projectData.project.time_records[0].check_in_timestamp)
  const [checkout,setCheckout] = useState<Date|string| null>(projectData.project.time_records[0].check_out_timestamp)
  
  const toast = useToast();

  useEffect(() => {
    if (hasOpenCheckIn) {
      setRecordNextAction("Check-out");
    } else {
      setRecordNextAction("Check-in");
    }
  }, [hasOpenCheckIn]);

  async function simpleCheckInCheckOut(project_id: number) {
    const timeRecordService = new TimeRecordService();
    try {
      const simpleTimeRecord: SimpleTimeRecordData = {
        project_id,
        timestamp: new Date(),
        location: projectData.project.location,
      };

      if (hasOpenCheckIn) {
        await timeRecordService.simpleCheckOut(simpleTimeRecord);
        setCheckout(simpleTimeRecord.timestamp)
      } else {
        await timeRecordService.simpleCheckIn(simpleTimeRecord);
        setCheckin(simpleTimeRecord.timestamp)
        setCheckout(null)
      }

      setHasOpenCheckIn(!hasOpenCheckIn);
      toast({
        title: "Registro feito com sucesso!",
        status: "success",
        duration: 2000,
        position: "top-right",
      });
    } catch (e) {
      toast({
        title: "Erro ao fazer registro",
        description: e instanceof Error ? e.message : "",
        status: "error",
        duration: 2000,
        position: "top-right",
      });
    }
  }

  return (
    <Tr
      key={projectData.project.project_id}
      borderBottom="2px"
      borderColor="gray.300"
    >
      <Td>{projectData.project.project_name}</Td>
      <Td>
        <Link href={"/main/profile/" + projectData.project.owner.user_id}>
          {projectData.project.owner.full_name}
        </Link>
      </Td>

      {checkin ? (
        <Td>{formatDate(checkin)}</Td>
      ) : (
        <Td>--</Td>
      )}

      {checkout ? (
        <Td>{formatDate(checkout)}</Td>
      ) : (
        <Td>--</Td>
      )}

      <Td>
        <HStack gap={2}>
          <Tooltip label={`${recordNextAction} rápido`}>
            <IconButton
              aria-label="Fazer registro"
              icon={<Icon boxSize="2em" as={FiClock} />}
              p={3}
              color={hasOpenCheckIn ? "orange" : "black"}
              onClick={() =>
                simpleCheckInCheckOut(projectData.project.project_id)
              }
            />
          </Tooltip>
          <Link
            href={{
              pathname: `time-records/project/${projectData.project.project_id}/register`,
              query: { hasOpenCheckIn: hasOpenCheckIn || "" },
            }}
          >
            <Tooltip label={`${recordNextAction} detalhado`}>
              <IconButton
                aria-label="Fazer registro"
                icon={<Icon boxSize="2em" as={FiEdit} />}
                p={3}
              />
            </Tooltip>
          </Link>
        </HStack>
      </Td>
      <Td>
        <Link
          href={`time-records/project/${projectData.project.project_id}/info`}
        >
          <IconButton
            aria-label="Ver registros"
            icon={<Icon boxSize="2em" as={FiFileText} />}
            p={3}
          />
        </Link>
      </Td>
    </Tr>
  );
}

export default function TimeRecordsTable({
  projectsList,
}: {
  projectsList: TimeRecordListData[];
}) {
  return (
    <TableContainer width={"100%"}>
      <Table variant="simple" background={"#F0EFFF"}>
        <Thead bg={"#4D47C3"}>
          <Tr>
            <Th textColor={"white"}>NOME DO PROJETO</Th>
            <Th textColor={"white"}>PROPRIETÁRIO</Th>
            <Th textColor={"white"}>ÚLTIMO CHECKIN</Th>
            <Th textColor={"white"}>ÚLTIMO CHECKOUT</Th>
            <Th textColor={"white"}>REGISTRAR</Th>
            <Th textColor={"white"}>HISTÓRICO DE REGISTROS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectsList.map((projectData, i) => {
            return <ProjectRow key={i} projectData={projectData} />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
