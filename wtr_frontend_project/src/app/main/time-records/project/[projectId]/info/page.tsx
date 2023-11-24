"use client";
import HeaderBox from "@/components/global/HeaderBox";
import TimeRecordRow from "@/components/time-records/TimeRecordRow";
import ProjectService from "@/services/ProjectService";
import TimeRecordService from "@/services/TimeRecordService";
import ProjectInfo from "@/types/ProjectInfo";
import { TimeRecord } from "@/types/TimeRecordInfoData";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Input,
  Link,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function TimeRecordsHistory({ params }: any) {
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [fromDate, setFromDate] = useState<string>(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState<string>(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const toast = useToast();

  const fetchData = async () => {
    setIsLoadingSearch(true);
    try {
      const data = await TimeRecordService.getTimeRecords(
        params.projectId,
        fromDate,
        toDate
      );
      setTimeRecords(data.results);
    } catch (e) {
      toast({
        title: "Erro ao carregar registros",
        description: "Não foi possível carregar os registros do projeto.",
        duration: 3000,
        status: "error",
        isClosable: true,
        position: "top-right",
      });
    }
    setIsLoadingSearch(false);

  };

  useEffect(() => {
    fetchData();
  }, [params.projectId]);

  const projectService = new ProjectService();
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>();

  async function getProjectInfo() {
    const projectInfoData = await projectService.getProjectInfo(
      params.projectId
    );
    setProjectInfo(projectInfoData);
  }

  useEffect(() => {
    getProjectInfo();
  }, []);

  return (
    <Box w={"100%"}>
      <HeaderBox
        title={
          <>
            <Link href={`/main/time-records`}>Registros</Link>/{" "}
            {projectInfo ? (
              <Link
                href={
                  "/main/time-records/project/" +
                  params.projectId.toString() +
                  "/info/"
                }
              >
                {projectInfo.project_name}
              </Link>
            ) : (
              "...loading"
            )}
          </>
        }
      />

      <Box
        display={"flex"}
        flexDir={"column"}
        width={"90%"}
        mx={"auto"}
        gap={"2em"}
      >
        <TableContainer>
          <Flex
            marginY={10}
            minWidth="fit-content"
            alignItems="center"
            gap="2"
            justifyContent={"space-between"}
          >
            <HStack bg="#F0EFFF" rounded="md" padding={3} spacing={2}>
              <Input
                bg="white"
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />

              <Input
                bg="white"
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
              <IconButton
                bg="#4D47C3"
                colorScheme="#4D47C3"
                aria-label="Search"
                icon={<Search2Icon />}
                size="md"
                isLoading={isLoadingSearch}
                onClick={fetchData}
              />
            </HStack>
          </Flex>

          <Table marginBottom={10}>
            <Thead bg={"#4D47C3"}>
              <Tr>
                <Th textColor={"white"}>ID</Th>
                <Th textColor={"white"}>Check-in</Th>
                <Th textColor={"white"}>Check-out</Th>
                <Th textColor={"white"}>Duração</Th>
                <Th textColor={"white"}>Detalhes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {timeRecords.map((record) => (
                <TimeRecordRow
                  key={record.time_record_id}
                  projectId={params.projectId}
                  record={record}
                />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
