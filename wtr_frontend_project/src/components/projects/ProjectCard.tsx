"use client";

import LocationService from "@/services/LocationService";
import { Project, ProjectError, TimezoneOption } from "@/types/ProjectCreate";
import {
  getFormatedNumberTime,
  getFormattedCommercialTime,
} from "@/utils/date_utils";
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
  FormControl,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

import moment from "moment-timezone";
import { useEffect, useState } from "react";

type ProjectCardProps<T> = {
  project: T;
  setProject: (record: T) => void;
  onSubmit: (record: T) => Promise<ProjectError>;
  requireName?: boolean;
  errors: ProjectError;
  setErrors: (e: ProjectError) => void;
};

export default function ProjectCard(props: ProjectCardProps<Project>) {
  const [timezones, setTimezones] = useState<TimezoneOption[]>([]);
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const brazilTimezones = moment.tz.zonesForCountry("BR").map((tz) => ({
      label: tz,
      value: tz,
    }));

    setTimezones(brazilTimezones);

    LocationService.getCities().then((locations) => {
      setLocations(locations);
    });
  }, []);

  function inputHandler(event: any) {
    const { name, value } = event.target;
    props.setProject({ ...props.project, [name]: value });
  }

  function timeHandler(event: any) {
    const { name, value } = event.target;
    props.setProject({
      ...props.project,
      [name]: getFormatedNumberTime(value),
    });
  }

  function textAreaHandler(event: any) {
    const { value } = event.target;
    props.setProject({ ...props.project, project_description: value });
  }

  return (
    <Box display="flex" flexDirection="column" gap="1em" padding="1em">
      <FormControl isInvalid={props.errors.project_name ? true : false}>
        <InputGroup display="flex" flexDirection="column" gap="0.5em">
          {props.requireName
            ? [
                <FormLabel key="0">Nome do Projeto</FormLabel>,
                <Input
                  key="1"
                  placeholder="Nome do Projeto"
                  type="text"
                  name="project_name"
                  bgColor="Lavender"
                  color="blueviolet"
                  value={props.project.project_name}
                  onChange={inputHandler}
                />,
              ]
            : ""}
        </InputGroup>
        <FormErrorMessage>{props.errors.project_name}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={props.errors.timezone ? true : false}>
        <InputGroup display="flex" flexDirection="column" gap="0.5em">
          <FormLabel>Fuso Horário</FormLabel>

          <Select
            name="timezone"
            bgColor="Lavender"
            color="blueviolet"
            placeholder="Selecione um Fuso Horário"
            value={props.project.timezone}
            onChange={inputHandler}
          >
            {timezones.map((timezone) => (
              <option key={timezone.value} value={timezone.value}>
                {timezone.label}
              </option>
            ))}
          </Select>

          <FormErrorMessage>{props.errors.timezone}</FormErrorMessage>
        </InputGroup>
      </FormControl>

      <FormControl isInvalid={props.errors.location ? true : false}>
        <InputGroup display="flex" flexDirection="column" gap="0.5em">
          <FormLabel>Localização</FormLabel>

          <Select
            name="location"
            bgColor="Lavender"
            color="blueviolet"
            value={props.project.location}
            placeholder="Selecione uma Cidade"
            onChange={inputHandler}
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </Select>

          <FormErrorMessage>{props.errors.location}</FormErrorMessage>
        </InputGroup>
      </FormControl>

      <FormControl
        isInvalid={props.errors.commercial_time_start ? true : false}
      >
        <InputGroup display="flex" flexDirection="column" gap="0.5em">
          <FormLabel>Horário Comercial ( Inicio )</FormLabel>
          <Input
            placeholder="08:00"
            type="time"
            name="commercial_time_start"
            bgColor="Lavender"
            color="blueviolet"
            value={getFormattedCommercialTime(
              props.project.commercial_time_start
            )}
            onChange={timeHandler}
          />
          <FormErrorMessage>
            {props.errors.commercial_time_start}
          </FormErrorMessage>
        </InputGroup>
      </FormControl>

      <FormControl isInvalid={props.errors.commercial_time_end ? true : false}>
        <InputGroup display="flex" flexDirection="column" gap="0.5em">
          <FormLabel>Horário Comercial ( Final )</FormLabel>
          <Input
            placeholder="17:00"
            type="time"
            name="commercial_time_end"
            bgColor="Lavender"
            color="blueviolet"
            value={getFormattedCommercialTime(
              props.project.commercial_time_end
            )}
            onChange={timeHandler}
          />
          <FormErrorMessage>
            {props.errors.commercial_time_end}
          </FormErrorMessage>
        </InputGroup>
      </FormControl>

      <FormControl isInvalid={props.errors.project_description ? true : false}>
        <FormLabel>Descrição do Projeto</FormLabel>
        <Textarea
          value={props.project.project_description}
          onChange={textAreaHandler}
          placeholder="Coloque alguma descrição do projeto"
          size="sm"
        />

        <FormErrorMessage>{props.errors.project_description}</FormErrorMessage>
      </FormControl>
      {props.requireName ? (
        <Button
          mt={4}
          colorScheme="blue"
          isLoading={false}
          type="submit"
          onClick={async () =>
            props.setErrors(await props.onSubmit(props.project))
          }
        >
          Registrar Projeto
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}
