"use client";

import HeaderBox from "@/components/global/HeaderBox";
import JustificationStatusIcon from "@/components/time-records/JustificationStatusIcon";
import JustificationService from "@/services/JustificationService";
import TimeRecordService from "@/services/TimeRecordService";
import { Justification, TimeRecordInfo } from "@/types/TimeRecordInfoData";
import { DownloadIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  HStack,
  Heading,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";

dayjs.extend(duration);

const JustificationItem = ({
  justification,
}: {
  justification: Justification;
}) => {
  const [documentBlob, setdocumentBlob] = useState<Blob>();

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setdocumentBlob(
          await JustificationService.getDocument(
            justification.project_id,
            justification.justification_id
          )
        );
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchDocument();
  }, []);

  function downloadDocument() {
    if (documentBlob) {
      const fileName = `documento_registro_${justification.time_record_id}_justificativa_${justification.justification_id}.pdf`;

      const url = URL.createObjectURL(documentBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  return (
    <AccordionItem>
      <h2>
        <AccordionButton _expanded={{ bg: "lavanda.100" }}>
          <HStack as="span" flex={1} textAlign="left">
            <Text>Justificativa de {justification.justification_type}</Text>
            <JustificationStatusIcon status={justification.status} />
          </HStack>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4} bg="lavanda.100">
        <Text>Mensagem de justificativa:</Text>
        <br />
        <Text>{justification.user_message}</Text>

        {justification.reviewer ? (
          <>
            <Divider my={4} color="white" opacity="100%" />
            <Text>
              Revisor: {justification.reviewer.full_name} ({" "}
              {justification.reviewer.email} )
            </Text>
            <br />
            <Text>{justification.reviewer_message}</Text>
          </>
        ) : (
          <Text></Text>
        )}

        <Divider my={4} color="white" opacity="100%" />
        <Tooltip isDisabled={!!documentBlob} label="Nenhum documento fornecido">
          <Button
            isDisabled={!documentBlob}
            colorScheme="gray"
            rightIcon={<DownloadIcon />}
            onClick={downloadDocument}
          >
            Baixar documento
          </Button>
        </Tooltip>
      </AccordionPanel>
    </AccordionItem>
  );
};

type TimeRecordInfoPageProps = {
  params: { projectId: number; timeRecordId: number };
};

export default function TimeRecordInfoPage(props: TimeRecordInfoPageProps) {
  const toast = useToast();

  const [timeRecord, setTimeRecord] = useState<TimeRecordInfo>();

  const [checkInDate, setCheckInDate] = useState<dayjs.Dayjs>();
  const [checkOutDate, setCheckOutDate] = useState<dayjs.Dayjs>(dayjs());

  useEffect(() => {
    new TimeRecordService()
      .getTimeRecordInfo(props.params.timeRecordId)
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
      });
  }, [props.params.timeRecordId, toast]);

  return (
    <Box w="100%">
      <HeaderBox title={`Registro ${props.params.timeRecordId}`} />

      <VStack w="2xl" mx="auto" gap={10} my={10}>
        <Box w="100%">
          <Heading mb={3} color="lavanda.300">
            Informações
          </Heading>
          <Card>
            <CardBody>
              <SimpleGrid w="xs" columns={2} spacing={2}>
                <Text fontWeight="bold">Data de início:</Text>
                <Text>{checkInDate?.format("DD/MM/YYYY HH:mm")}</Text>
                <Text fontWeight="bold">Data de fim:</Text>
                <Text>
                  {timeRecord && timeRecord.check_out_timestamp
                    ? checkOutDate.format("DD/MM/YYYY HH:mm")
                    : null}
                </Text>
                <Text fontWeight="bold">Duração:</Text>
                <Text>
                  {dayjs
                    .duration(checkOutDate.diff(checkInDate))
                    .format("HH[h] mm[min]")}
                </Text>
              </SimpleGrid>
            </CardBody>
            <CardFooter>
              <Box>
                <Text fontWeight="bold">Descrição:</Text>
                <Text>{timeRecord?.user_message}</Text>
              </Box>
            </CardFooter>
          </Card>
        </Box>

        <Box w="100%">
          <Heading mb={3} color="lavanda.300">
            Justificativas
          </Heading>
          <Accordion mx="auto" allowToggle>
            {timeRecord?.time_record_justification &&
              timeRecord.time_record_justification.map((justification, i) => (
                <JustificationItem key={i} justification={justification} />
              ))}
          </Accordion>
        </Box>
      </VStack>
    </Box>
  );
}
