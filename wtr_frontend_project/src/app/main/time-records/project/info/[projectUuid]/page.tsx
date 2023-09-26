'use client';
import TimeRecordRow from "@/components/time-records/timeRecordRowComponent";
import timeRecordsProvider, { TimeRecord } from "@/providers/timeRecordsProvider";
import { CalendarIcon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Heading, IconButton, Input, Spacer, Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function Page({ params }: any) {
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [fromDate, setFromDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState<string>(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await timeRecordsProvider.getTimeRecords(params.projectUuid);

      setTimeRecords(data.results);
    };

    fetchData();
  }, [params.projectUuid]);

  const filterByDate = async () => {
    setIsLoadingSearch(true);

    const data = await timeRecordsProvider.getTimeRecords(params.projectUuid, fromDate, toDate);

    setTimeRecords(data.results);
    setIsLoadingSearch(false);
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      // justifyContent={"center"}
      width={"100%"}
      // padding={"2em"}
      gap={"5em"}
    >

    <Box backgroundColor="#F0EFFF" w="100%" noOfLines={1} padding="4em" fontWeight="light">
      <Heading textColor="#4D47C3" as="h1" size="2xl" >{params.projectUuid}</Heading>
    </Box>
  
      <TableContainer>
        <Flex marginY="30px" minWidth="fit-content" alignItems="center" gap="2">
          <HStack>
            <CalendarIcon boxSize={8} />
            <Heading as="h2">Lista de Registros</Heading>
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
                onChange={e => setToDate(e.target.value)}
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
            <Button size="md" fontSize="xs" bg="#4D47C3" colorScheme="#4D47C3" textTransform={"uppercase"}>Gerar Relatório</Button>
          </HStack>
        </Flex>

        <Table>
          <Thead bg={"#4D47C3"}>
            <Tr>
              <Th textColor={"white"}>Check-in</Th>
              <Th textColor={"white"}>Check-out</Th>
              <Th textColor={"white"}>Documentos</Th>
              <Th textColor={"white"}>Descrição</Th>
              <Th textColor={"white"}>Tempo registrado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Array.isArray(timeRecords) && timeRecords.map((record) => <TimeRecordRow key={record.time_record_id} record={record} />)}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}