'use client';

import { Card, Icon, CardBody, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Alert, AlertIcon, Box, Button, Text, Collapse } from "@chakra-ui/react";
import Clock from "./Clock";
import { PiUserFocusFill } from "react-icons/pi";
import JustifyCardBody from "./JustifyCardBody";
import { useState } from "react";
import TimeRecordData, { JustificationData } from "@/types/TimeRecordData";

type RecordCardProps = {
  projectId: number,
  record: TimeRecordData | JustificationData,
  setRecord: (record: TimeRecordData | JustificationData) => void,
};

export default function RecordCard(props: RecordCardProps) {
  const [requireDescription, setRequireDescription] = useState(false);

  const onDateChange = () => setRequireDescription(true);

  return (
    <Card variant={"filled"} size="lg" w="500px">
      <CardBody display="flex" gap="2em" flexDir="column" alignItems="center">
        {/* <Icon as={PiUserFocusFill} boxSize="3xs" /> */}

        <Clock onDateChange={onDateChange} />

        <Collapse in={requireDescription} transition={{ enter: { duration: 0.3 } }}>
          <Alert status='warning'>
            <AlertIcon />
            <Text>Ao alterar o horário do registro,
              você <strong>deve</strong> enviar sua justificativa.</Text>
          </Alert>
        </Collapse>

        <Accordion w={"100%"} allowToggle variant={"outline"}>
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex='1' textAlign='left'>
                  Descrição / Justificativa
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
          background={"#4D47C3"}
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