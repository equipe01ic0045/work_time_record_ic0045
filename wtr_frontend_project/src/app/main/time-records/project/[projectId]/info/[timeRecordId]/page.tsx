"use client";

import HeaderBox from "@/components/global/HeaderBox";
import JustificationStatusIcon from "@/components/time-records/JustificationStatusIcon";
import ProjectService from "@/services/ProjectService";
import TimeRecordService from "@/services/TimeRecordService";
import ProjectInfo from "@/types/ProjectInfo";
import TimeRecord, { Justification } from "@/types/TimeRecord";
import { DownloadIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Card, CardBody, CardFooter, CardHeader, Divider, HStack, Heading, Link, SimpleGrid, Text, Tooltip, VStack, useToast } from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from 'dayjs/plugin/duration';
import { useEffect, useState } from "react";

dayjs.extend(duration);

const JustificationItem = ({ justification }: { justification: Justification }) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: "lavanda.100" }}>
          <HStack as="span" flex={1} textAlign="left">
            <Text>
              Justificativa de {justification.type} - {
                dayjs(justification.datetime).format('DD/MM/YYYY HH:mm')
              }
            </Text>
            <JustificationStatusIcon justification={justification} />
          </HStack>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg="lavanda.100">
        <Text>{justification.description}</Text>
        <Divider my={4} color="white" opacity="100%" />
        {/* TODO: adicionar download de documentos */}
        <Tooltip isDisabled={!!justification.file} label="Nenhum documento fornecido">
          <Button isDisabled={!justification.file} colorScheme="gray" rightIcon={<DownloadIcon />}>
            Baixar documento
          </Button>
        </Tooltip>
      </AccordionPanel>
    </AccordionItem>
  );
};

type TimeRecordInfoPageProps = {
  params: { projectId: number, timeRecordId: number }
};

export default function Page(props: TimeRecordInfoPageProps) {
  const toast = useToast();

  const [timeRecord, setTimeRecord] = useState<TimeRecord>();

  const [checkInDate, setCheckInDate] = useState<dayjs.Dayjs>();
  const [checkOutDate, setCheckOutDate] = useState<dayjs.Dayjs>(dayjs());

  const projectService = new ProjectService();
  const [project, setProject] = useState<ProjectInfo>();

  useEffect(() => {
    projectService.getProjectInfo(props.params.projectId)
      .then(setProject);
  }, [props.params.projectId]);

  useEffect(() => {
    new TimeRecordService().getTimeRecord(props.params.timeRecordId)
      .then((timeRecord) => {
        setTimeRecord(timeRecord);
        setCheckInDate(dayjs(timeRecord.check_in_timestamp));

        if (timeRecord.check_out_timestamp) {
          setCheckOutDate(dayjs(timeRecord.check_out_timestamp));
        }
      })
      .catch((error) => {
        console.error(error);
        toast({
          title: "Erro ao carregar registro",
          description: "Não foi possível carregar o registro.",
          duration: 3000,
          status: "error",
          isClosable: true,
          position: "top-right",
        });
      })
  }, [props.params.timeRecordId, toast]);

  return (
    <Box w="100%">
      <HeaderBox
        title={<>
          <Link href={`/main/time-records`}>Registros</Link> / {' '}
          {project
            ? <Link href={'/main/time-records/project/' + props.params.projectId.toString() + '/info/'}>{project.project_name}</Link>
            : "...loading"} / {' '}
          Registro {props.params.timeRecordId}
        </>}
      />

      <VStack w="2xl" mx="auto" gap={10} my={10}>
        <Box w="100%">
          <Heading mb={3} color="lavanda.300">Informações</Heading>
          <Card>
            <CardBody>
              <SimpleGrid w="xs" columns={2} spacing={2}>
                <Text fontWeight="bold">Data de início:</Text>
                <Text>{checkInDate?.format('DD/MM/YYYY HH:mm')}</Text>
                <Text fontWeight="bold">Data de fim:</Text>
                <Text>{checkOutDate?.format('DD/MM/YYYY HH:mm')}</Text>
                <Text fontWeight="bold">Duração:</Text>
                <Text>{dayjs
                  .duration(checkOutDate.diff(checkInDate))
                  .format('HH[h] mm[min]')}</Text>
              </SimpleGrid>
            </CardBody>
            <CardFooter>
              <Box>
                <Text fontWeight="bold">Mensagem do usuário:</Text>
                <Text>{timeRecord?.user_message}</Text>
              </Box>
            </CardFooter>
          </Card>
        </Box>

        <Box w="100%">
          <Heading mb={3} color="lavanda.300">Histórico de justificativas</Heading>
          <Accordion mx="auto" allowToggle>
            {timeRecord?.justifications && (
              timeRecord.justifications.map((justification, i) => (
                <JustificationItem key={i} justification={justification} />
              ))
            )}
          </Accordion>
        </Box>
      </VStack>
    </Box>
  )
}