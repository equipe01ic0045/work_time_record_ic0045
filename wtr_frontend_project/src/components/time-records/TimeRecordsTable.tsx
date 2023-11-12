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
import ProjectListData from "@/types/ProjectListData";
import { useEffect, useState } from "react";
import TimeRecordService from "@/services/TimeRecordService";

function ProjectRow({ projectData }: { projectData: ProjectListData }) {
  const [hasOpenCheckIn, setHasOpenCheckIn] = useState<boolean>(projectData.open_check_in);
  const [recordNextAction, setRecordNextAction] = useState<string | null>();
  const toast = useToast();

  useEffect(() => {
    if (hasOpenCheckIn) {
      setRecordNextAction('Check-out');
    } else {
      setRecordNextAction('Check-in');
    }
  }, [hasOpenCheckIn]);

  async function quickRecord(projectId: number) {
    const timeRecordService = new TimeRecordService();

    try {
      if (hasOpenCheckIn) {
        await timeRecordService.checkOut({ projectId, date: new Date() });
      } else {
        await timeRecordService.checkIn({ projectId, date: new Date() });
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
        description: e instanceof Error ? e.message : '',
        status: "error",
        duration: 2000,
        position: "top-right",
      });
    }
  }

  return (
    <Tr key={projectData.project.project_id} borderBottom="2px" borderColor="gray.300">
      <Td>{projectData.project.project_name}</Td>
      <Td>{projectData.project.owner.full_name}</Td>
      <Td>--</Td>
      <Td>--</Td>
      <Td>
        <HStack gap={2}>
          <Tooltip label={`${recordNextAction} rápido`}>
            <IconButton
              aria-label="Fazer registro"
              icon={<Icon boxSize="2em" as={FiClock} />}
              p={3}
              color={hasOpenCheckIn ? "orange" : "lavanda.300"}
              onClick={() => quickRecord(projectData.project.project_id)}
            />
          </Tooltip>
          <Link
            href={{
              pathname: `time-records/project/${projectData.project.project_id}/register`,
              query: { hasOpenCheckIn: hasOpenCheckIn || '' },
            }}
          >
            <Tooltip label={`${recordNextAction} detalhado`}>
              <IconButton
                aria-label="Fazer registro"
                icon={<Icon boxSize="2em" as={FiEdit} />}
                color="lavanda.300"
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
            color="lavanda.300"
            p={3}
          />
        </Link>
      </Td>
    </Tr >
  );
}

export default function TimeRecordsTable({
  projectsList,
}: {
  projectsList: ProjectListData[],
}) {
  return (
    <TableContainer width={"100%"}>
      <Table variant="simple" background={"#F0EFFF"}>
        <Thead bg={"#4D47C3"}>
          <Tr>
            <Th textColor={"white"}>NOME DO PROJETO</Th>
            <Th textColor={"white"}>PROPRIETÁRIO</Th>
            <Th textColor={"white"}>ÚLTIMO CHECK-IN</Th>
            <Th textColor={"white"}>ÚLTIMO CHECK-OUT</Th>
            <Th textColor={"white"}>REGISTRAR</Th>
            <Th textColor={"white"}>REGISTROS FEITOS</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projectsList.map((projectData, i) => {
            return <ProjectRow key={i} projectData={projectData} />;
          })}
        </Tbody >
      </Table >
    </TableContainer >
  );
}
