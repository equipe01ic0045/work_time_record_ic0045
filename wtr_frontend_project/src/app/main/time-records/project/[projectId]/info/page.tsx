'use client';
import HeaderBox from "@/components/global/HeaderBox";
import TimeRecordRow from "@/components/time-records/TimeRecordRow";
import TimeRecordService from "@/services/TimeRecordService";
import TimeRecord from "@/types/TimeRecord";
import { Icon, Search2Icon } from "@chakra-ui/icons";
import { Box, Button, Flex, HStack, Heading, IconButton, Input, Table, TableContainer, Tbody, Th, Thead, Tr, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";

export default function Page({ params }: any) {
  const [timeRecords, setTimeRecords] = useState<TimeRecord[]>([]);
  const [fromDate, setFromDate] = useState<string>(dayjs().startOf('month').format('YYYY-MM-DD'));
  const [toDate, setToDate] = useState<string>(dayjs().endOf('month').format('YYYY-MM-DD'));
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
  const toast = useToast();
  const timeRecordService = useMemo(() => new TimeRecordService(), []);

  useEffect(() => {
    console.warn('loading');

    const fetchData = async () => {
      try {
        const data = await timeRecordService.getTimeRecords(params.projectId);
        setTimeRecords(data.results);
      } catch (e) {
        console.warn(e);
        toast({
          title: "Erro ao carregar registros",
          description: "Não foi possível carregar os registros do projeto.",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      }

    };

    fetchData();
  }, [params.projectId, timeRecordService, toast]);

  const filterByDate = async () => {
    setIsLoadingSearch(true);

    // TODO: implementar filtro por data
    // const data = await timeRecordService.getTimeRecords(params.projectId, fromDate, toDate);

    // setTimeRecords(data.results);
    setIsLoadingSearch(false);
  }

  return (
    <Box w={"100%"}>
      <HeaderBox title={`Registros / Projeto ${params.projectId}`} />

      <Box
        display={"flex"}
        flexDir={"column"}
        width={"90%"}
        mx={"auto"}
        gap={"2em"}
      >
        <TableContainer>
          <Flex marginY={10} minWidth="fit-content" alignItems="center" gap="2" justifyContent={"space-between"}>
            <HStack bg="#F0EFFF" rounded="md" padding={3} spacing={2}>
              <Input
                bg="white"
                type="date"
                width="min-content"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)} />
              <Input
                bg="white"
                type="date"
                width="min-content"
                value={toDate}
                onChange={e => setToDate(e.target.value)} />
              <IconButton
                bg="#4D47C3"
                colorScheme="#4D47C3"
                aria-label="Search"
                icon={<Search2Icon />}
                size="md"
                isLoading={isLoadingSearch}
                onClick={filterByDate} />
            </HStack>
            <Button
              size="lg"
              fontSize="xs"
              bg="#4D47C3"
              colorScheme="#4D47C3"
              textTransform={"uppercase"}
            >
              Gerar Relatório
            </Button>
          </Flex>

          <Table>
            <Thead bg={"#4D47C3"}>
              <Tr>
                <Th textColor={"white"}>Check-in</Th>
                <Th textColor={"white"}>Check-out</Th>
                <Th textColor={"white"}>Status</Th>
                <Th textColor={"white"}>Documentos</Th>
              </Tr>
            </Thead>
            <Tbody>
              {timeRecords.map((record) => (
                <TimeRecordRow key={record.time_record_id} projectId={params.projectId} record={record} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}