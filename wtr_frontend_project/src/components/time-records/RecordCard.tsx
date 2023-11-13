"use client";

import {
  Card,
  CardBody,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertIcon,
  Box,
  Button,
  Text,
  Collapse,
} from "@chakra-ui/react";
import Clock from "./Clock";
import JustifyCardBody from "./JustifyCardBody";
import { useState } from "react";
import { DetailedTimeRecordData } from "@/types/TimeRecordData";

type RecordCardProps<T> = {
  record: T;
  setRecord: (record: T) => void;
  requireUserMessage?: boolean;
};

export default function RecordCard(
  props: RecordCardProps<DetailedTimeRecordData>
) {
  const [requireUserMessage, setRequireUserMessage] = useState(
    props.requireUserMessage || false
  );

  const onDateChange = () => setRequireUserMessage(true);

  return (
    <Card variant={"filled"} size="lg" w="500px">
      <CardBody display="flex" gap="2em" flexDir="column" alignItems="center">
        <Clock
          onDateChange={onDateChange}
          defaultValue={props.record.timestamp}
        />

        <Collapse
          in={requireUserMessage}
          transition={{ enter: { duration: 0.3 } }}
        >
          <Alert status="warning">
            <AlertIcon />
            <Text>
              Ao alterar o horário do registro, você <strong>deve</strong>{" "}
              descrever sua justificativa.
            </Text>
          </Alert>
        </Collapse>

        <Accordion w={"100%"} allowToggle variant={"outline"}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  Descrição / Justificativa
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <JustifyCardBody
                requireUserMessage={requireUserMessage}
                record={props.record}
                setRecord={props.setRecord}
              />
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Button
          type="submit"
          minHeight={"50px"}
          bg="lavanda.300"
          color={"white"}
          colorScheme="blackAlpha"
          size={"lg"}
        >
          Enviar
        </Button>
      </CardBody>
    </Card>
  );
}
