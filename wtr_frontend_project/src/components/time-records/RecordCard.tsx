'use client';

import { Card, CardBody, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertIcon, Box, Button, Text, Collapse } from "@chakra-ui/react";
import Clock from "./Clock";
import JustifyCardBody from "./JustifyCardBody";
import { useState } from "react";
import { Justification } from "@/types/TimeRecordData";

type RecordCardProps<T> = {
  projectId: number,
  record: T,
  setRecord: (record: T) => void,
  requireDescription?: boolean,
  accordionExpanded?: boolean,
};

export default function RecordCard(
  props: RecordCardProps<Justification>
) {
  const [requireDescription, setRequireDescription] = useState(props.requireDescription || false);

  const onDateChange = () => setRequireDescription(true);

  return (
    <Card variant={"filled"} size="lg" w="500px">
      <CardBody display="flex" gap="2em" flexDir="column" alignItems="center">
        {/* <Icon as={PiUserFocusFill} boxSize="3xs" /> */}

        <Clock onDateChange={onDateChange} defaultValue={props.record.date} />

        <Collapse in={requireDescription} transition={{ enter: { duration: 0.3 } }}>
          <Alert status='warning'>
            <AlertIcon />
            <Text>Ao alterar o horário do registro,
              você <strong>deve</strong> descrever sua justificativa.</Text>
          </Alert>
        </Collapse>

        <Accordion w={"100%"} allowToggle variant={"outline"} defaultIndex={props.accordionExpanded ? 0 : undefined}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Justificativa
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <JustifyCardBody
                requireDescription={requireDescription}
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