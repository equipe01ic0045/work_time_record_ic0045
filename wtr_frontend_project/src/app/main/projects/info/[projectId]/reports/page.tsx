"use client";
import HeaderBox from "@/components/global/HeaderBox";
import ReportsTableRow from "@/components/projects/ReportsTableRow";
import TimeRecordService from "@/services/TimeRecordService";
import TimeRecord from "@/types/TimeRecord";
import { CalendarIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

import  {BsFileEarmarkArrowUpFill} from "react-icons/bs"

export default function Page({ params }: any) {
  const timeRecordService = new TimeRecordService();
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [fromDate, setFromDate] = useState<string>(
    dayjs().startOf("month").format("YYYY-MM-DD")
  );
  const [toDate, setToDate] = useState<string>(
    dayjs().endOf("month").format("YYYY-MM-DD")
  );
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await timeRecordService.getTimeRecords(params.projectUuid);

      setTimeRecords(data.results);
    };

    fetchData();
  }, [params.projectUuid]);

  const filterByDate = async () => {
    setIsLoadingSearch(true);

    const data = await timeRecordService.getTimeRecords(
      params.projectUuid,
      // fromDate,
      // toDate
    );

    setTimeRecords(data.results);
    setIsLoadingSearch(false);
  };

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
      gap={"5em"}
    >
      <HeaderBox title="Projetos / {projeto} / Relatórios" />

      <TableContainer>
        <Flex marginY="30px" minWidth="fit-content" alignItems="center" gap="2">
          <HStack>
            <CalendarIcon boxSize={8} />
            <Heading as="h2">Lista de Relatórios</Heading>
          </HStack>
          <Spacer />
          <HStack spacing={4}>
            <HStack bg="#F0EFFF" rounded="md" padding={3} spacing={1}>
              <Input
                bg="white"
                type="date"
                width="min-content"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
              <Input
                bg="white"
                type="date"
                width="min-content"
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
                onClick={filterByDate}
              />
            </HStack>
            <Button
              size="md"
              fontSize="xs"
              bg="#4D47C3"
              colorScheme="#4D47C3"
              textTransform={"uppercase"}
              gap={"1em"}
            >
              Gerar Relatório do Projeto<BsFileEarmarkArrowUpFill size={20}/>
            </Button>
          </HStack>
        </Flex>

        <Table>
          <Thead bg={"#4D47C3"}>
            <Tr>
              <Th textColor={"white"}>Colaborador</Th>
              <Th textColor={"white"}>Diferencial de tempo</Th>
              <Th textColor={"white"}>Email</Th>
              <Th textColor={"white"}>Gerar relatório de usuário</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(timeRecords) &&
              timeRecords.map((record) => (
                <ReportsTableRow key={record.time_record_id} record={record} />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
