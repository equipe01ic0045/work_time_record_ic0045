"use client";

import HeaderBox from "@/components/global/HeaderBox";

import ProjectInfo from "@/types/ProjectInfo";
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Checkbox,
  Textarea
} from "@chakra-ui/react";
import { useState } from "react";
import ProjectService from "@/services/ProjectService";

export default function ProjectInfo({ params }: any) {
  const projectService = new ProjectService()

  const [newProject, setNewProject] = useState({
    projectName: "",
    projectDescription: "",
    locationRequired: false,
    commercialTimeRequired: false,
    timezone: '',
    location: '',
    commercialTimeStart: 0,
    commercialTimeEnd: 0
  })

  function locationRequiredCheckboxHandler(event: any) {
    const { value } = event.target
    setNewProject({ ...newProject, locationRequired: !value })
  }

  function commercialTimeRequiredCheckboxHandler(event: any) {
    const { value } = event.target
    setNewProject({ ...newProject, commercialTimeRequired: !value })
  }

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setNewProject({ ...newProject, [name]: value });
  }

  function textAreaHandler(event: any) {
    const { value } = event.target
    setNewProject({ ...newProject, projectDescription: value })
  }

  function registerNewProject() {
    console.log(newProject)
    projectService.createNewProject(newProject)
      .then(() => {
        console.log('ok')
      })
      .catch(() => {
        console.log('error')
      })
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={'100%'}
    >
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / Criar Projeto</>} />
      <Box
        display="flex"
        flexDirection="column"
        gap="1em"
        padding='1em'
      >
        <InputGroup
          display='flex'
          flexDirection='column'
          gap='0.5em'
        >
          <FormLabel>Nome do Projeto</FormLabel>
          <Input
            placeholder="Nome do Projeto"
            type="text"
            name="projectName"
            bgColor="Lavender"
            color="blueviolet"
            value={newProject.projectName}
            onChange={inputHandler}
          />
        </InputGroup>


        <Checkbox>
          Precisa de Localização
        </Checkbox>
        <Checkbox>
          Precisa de Tempo Comercial
        </Checkbox>
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
            value={newProject.timezone}
            onChange={inputHandler}
          />
        </InputGroup>
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
            value={newProject.location}
            onChange={inputHandler}
          />
        </InputGroup>
        <InputGroup
          display='flex'
          flexDirection='column'
          gap='0.5em'
        >
          <FormLabel>Tempo Comercial ( Inicio )</FormLabel>
          <Input
            placeholder="08:00"
            type="number"
            name="commercialTimeStart"
            bgColor="Lavender"
            color="blueviolet"
            value={newProject.commercialTimeStart}
            onChange={inputHandler}
          />
        </InputGroup>
        <InputGroup
          display='flex'
          flexDirection='column'
          gap='0.5em'
        >
          <FormLabel>Tempo Comercial ( Final )</FormLabel>
          <Input
            placeholder="17:00"
            type="number"
            name="commercialTimeEnd"
            bgColor="Lavender"
            color="blueviolet"
            value={newProject.commercialTimeEnd}
            onChange={inputHandler}
          />
        </InputGroup>
        <FormLabel>Descrição do Projeto</FormLabel>
        <Textarea
          value={newProject.projectDescription}
          onChange={textAreaHandler}
          placeholder='Coloque alguma descrição do projeto'
          size='sm'
        />
        <Button
          mt={4}
          colorScheme='blue'
          isLoading={false}
          type='submit'
          onClick={registerNewProject}
        >
          Registrar Projeto
        </Button>
      </Box>
    </Box >
  );
}
