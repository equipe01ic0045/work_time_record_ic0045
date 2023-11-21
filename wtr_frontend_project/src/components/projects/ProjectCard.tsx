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
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";

export type Project = {
    project_name: string;
    project_description: string;
    locationRequired: boolean;
    commercialTimeRequired: boolean;
    timezone: string;
    location: string;
    commercial_time_start: number;
    commercial_time_end: number;
};
export type ProjectError = {
    project_name: string,
    location_required: string,
    commercial_time_required: string,
    timezone: string,
    location: string,
    commercial_time_start: string,
    commercial_time_end: string,
    project_description: string,
};

type RecordCardProps<T> = {
    project: T;
    setRecord: (record: T) => void;
    onSubmit: (record: T) => Promise<ProjectError>;
    requireName?: boolean;
    errors: ProjectError,
    setErrors: (e : ProjectError) => void;
  };
export default function ProjectCard(
  props: RecordCardProps<Project>
) {
  const [requireUserMessage, setRequireUserMessage] = useState(
    props.requireName || false
  );


  const onDateChange = () => setRequireUserMessage(true);

  function locationRequiredCheckboxHandler(event: any) {
    const { value } = event.target
    props.setRecord({ ...props.project, locationRequired: !value })
  }

  function commercialTimeRequiredCheckboxHandler(event: any) {
    const { value } = event.target
    props.setRecord({ ...props.project, commercialTimeRequired: !value })
  }

  function inputHandler(event: any) {
    const { name, value } = event.target;
    props.setRecord({ ...props.project, [name]: value });
  }

  function formatToTwoDigits(num: number): string {
    let integerStr = num.toString();
    while (integerStr.length < 2) {
      integerStr = "0" + integerStr;
    }
    return integerStr;
  }

  function getFormattedCommercialTime(commercialTime: number): string {
    const hour = Math.floor(commercialTime / 60); // result without floor is float
    const minute = commercialTime % 60;
    return `${formatToTwoDigits(hour)}:${formatToTwoDigits(minute)}`;
  }
  function getFormatedNumberTime(commercialTime: string) {
    return commercialTime.split(":").map((n: string) => parseInt(n)).reduce((p: number, c: number) => c + p * 60);
  }

  function timeHandler(event: any) {
    const { name, value } = event.target;
    props.setRecord({ ...props.project, [name]: getFormatedNumberTime(value) });
  }

  function textAreaHandler(event: any) {
    const { value } = event.target
    props.setRecord({ ...props.project, project_description: value })
  }

  
  return (
    
    <Box
    display="flex"
    flexDirection="column"
    gap="1em"
    padding='1em'
  >
    <FormControl isInvalid={props.errors.project_name ? true : false}>
      <InputGroup
        display='flex'
        flexDirection='column'
        gap='0.5em'
      >
        {props.requireName ? [(<FormLabel key="0">Nome do Projeto</FormLabel>),
        (<Input key="1"
          placeholder="Nome do Projeto"
          type="text"
          name="project_name"
          bgColor="Lavender"
          color="blueviolet"
          value={props.project.project_name}
          onChange={inputHandler}
        />)] : ''}
      </InputGroup>
      <FormErrorMessage>{props.errors.project_name}</FormErrorMessage>
    </FormControl>

    {/* <Checkbox>
      Precisa de Localização
    </Checkbox>
    <Checkbox>
      Precisa de Tempo Comercial
    </Checkbox> */}
    <FormControl isInvalid={props.errors.timezone ? true : false}>
      <InputGroup
        display='flex'
        flexDirection='column'
        gap='0.5em'
      >
        <FormLabel>Fuso Horário</FormLabel>
        <Input
          placeholder="America/Bahia"
          type="text"
          name="timezone"
          bgColor="Lavender"
          color="blueviolet"
          value={props.project.timezone}
          onChange={inputHandler}
        />
        <FormErrorMessage>{props.errors.timezone}</FormErrorMessage>
      </InputGroup>
    </FormControl>

    <FormControl isInvalid={props.errors.location ? true : false}>
      <InputGroup
        display='flex'
        flexDirection='column'
        gap='0.5em'
      >
        <FormLabel>Localização</FormLabel>
        <Input
          placeholder="BA"
          type="text"
          name="location"
          bgColor="Lavender"
          color="blueviolet"
          value={props.project.location}
          onChange={inputHandler}
        />
        <FormErrorMessage>{props.errors.location}</FormErrorMessage>
      </InputGroup></FormControl>


    <FormControl isInvalid={props.errors.commercial_time_start ? true : false}>
      <InputGroup
        display='flex'
        flexDirection='column'
        gap='0.5em'
      >
        <FormLabel>Tempo Comercial ( Inicio )</FormLabel>
        <Input
          placeholder="08:00"
          type="time"
          name="commercial_time_start"
          bgColor="Lavender"
          color="blueviolet"
          value={getFormattedCommercialTime(props.project.commercial_time_start)}
          onChange={timeHandler}
        />
        <FormErrorMessage>{props.errors.commercial_time_start}</FormErrorMessage>
      </InputGroup>
    </FormControl>

    <FormControl isInvalid={props.errors.commercial_time_end ? true : false}>
      <InputGroup
        display='flex'
        flexDirection='column'
        gap='0.5em'
      >
        <FormLabel>Tempo Comercial ( Final )</FormLabel>
        <Input
          placeholder="17:00"
          type="time"
          name="commercial_time_end"
          bgColor="Lavender"
          color="blueviolet"
          value={getFormattedCommercialTime(props.project.commercial_time_end)}
          onChange={timeHandler}
        />
        <FormErrorMessage>{props.errors.commercial_time_end}</FormErrorMessage>
      </InputGroup></FormControl>

    <FormControl isInvalid={props.errors.project_description ? true : false}>
      <FormLabel>Descrição do Projeto</FormLabel>
      <Textarea
        value={props.project.project_description}
        onChange={textAreaHandler}
        placeholder='Coloque alguma descrição do projeto'
        size='sm'
      />

      <FormErrorMessage>{props.errors.project_description}</FormErrorMessage>
    </FormControl>
    {props.requireName ? <Button
      mt={4}
      colorScheme='blue'
      isLoading={false}
      type='submit'
      onClick={async () => props.setErrors(await props.onSubmit(props.project))}
    >
      Registrar Projeto
    </Button> : ''}
  </Box>
  );
}
