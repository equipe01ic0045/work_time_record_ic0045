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
import { useEffect, useState } from "react";
import ProjectService from "@/services/ProjectService";
import { useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import UserService from "@/services/UserService";

export default function ProjectInfo({ params }: any) {
  const projectService = new ProjectService()
  const userService = new UserService()
  const urlParameters = useParams()
  const projectIdString = urlParameters.projectId.toString()
  const toast = useToast();
  const router = useRouter();

  const [addUser, setAddUser] = useState({
    userId: 0,
    userEmail: '',
    userRole: 'USER',
    userHoursPerWeek: 0
  })

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setAddUser({ ...addUser, [name]: value });
  }

  const addUserHandler = async () => {
    const userEmail = addUser.userEmail

    try {
      const response = await userService.getUserByEmail(userEmail)
      setAddUser({ ...addUser, userId: response.user_id })
      await projectService.postProjectUsers(projectIdString, addUser)
      toast({
        title: "Usuario Adicionado",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      router.push(`/main/projects/info/${projectIdString}/collaborators`)
    }
    catch (error) {
      toast({
        title: "Erro ao Adicionar Usuario",
        description: "",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }

  }


  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={'100%'}
    >
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / Adicionar Colaborador</>} />
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
          <FormLabel>Email do Usuário</FormLabel>
          <Input
            placeholder="usuario@mail.com"
            type="email"
            name="userEmail"
            bgColor="Lavender"
            color="blueviolet"
            value={addUser.userEmail}
            onChange={inputHandler}
          />
        </InputGroup>
        <Checkbox>ADMIN</Checkbox>
        <Checkbox isChecked>USER</Checkbox>
        <InputGroup
          display='flex'
          flexDirection='column'
          gap='0.5em'
        >
          <FormLabel>HORAS / SEMANA</FormLabel>
          <Input
            placeholder="17"
            type="number"
            name="userHoursPerWeek"
            bgColor="Lavender"
            color="blueviolet"
            value={addUser.userHoursPerWeek}
            onChange={inputHandler}
          />
        </InputGroup>

        <Button
          mt={4}
          colorScheme='blue'
          isLoading={false}
          type='submit'
          onClick={addUserHandler}
        >
          Registrar Colaborador
        </Button>
      </Box>
    </Box >
  );
}
