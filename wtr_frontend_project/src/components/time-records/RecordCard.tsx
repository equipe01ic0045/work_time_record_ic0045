'use client';

import { Card, Icon, CardBody } from "@chakra-ui/react";
import Clock from "./Clock";
import { PiUserFocusFill } from "react-icons/pi";

type RecordCardProps = { projectId: number, onDateChange: (date: Date) => void };

export default function RecordCard(props: RecordCardProps) {
  return (
    <Card variant={"filled"} size="lg" maxW="500px">
      <CardBody display="flex" gap="1em" flexDir="column" alignItems="center">
        <Icon as={PiUserFocusFill} boxSize="3xs" />

        <Clock onDateChange={props.onDateChange} />

      </CardBody>
    </Card>
  );
}