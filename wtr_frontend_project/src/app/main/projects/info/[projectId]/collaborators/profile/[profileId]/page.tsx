"use client";

import HeaderBox from "@/components/global/HeaderBox";
import {
  Box,
  Link,
  Button,
  FormLabel,
  Input,
  InputGroup,
  useToast,
  Checkbox,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProjectService from "@/services/ProjectService";
import { EditIcon } from "@chakra-ui/icons";

export default function UserUpdate({ params }: any) {

  const projectService = new ProjectService()
  const router = useRouter()
  const toast = useToast()
  const projectId = params.projectId
  const profileId = params.profileId
  const [checkboxList, setCheckboxList] = useState({
    admin: false,
    user: false
  })
  const [updateInfo, setUpdateInfo] = useState({
    role: "",
    hoursPerWeek: 0
  })
  const [staticInfo, setStaticInfo] = useState({
    fullName: "",
    email: "",
    cpf: ""
  })

  function checkboxHandler(event: any) {
    const { name, checked } = event.target
    if (name === "admin" && checked === true) {
      setUpdateInfo({ ...updateInfo, role: "ADMIN" })
      setCheckboxList({ admin: true, user: false })
    }
    if (name === "user" && checked === true) {
      setUpdateInfo({ ...updateInfo, role: "USER" })
      setCheckboxList({ admin: false, user: true })
    }
  }

  function inputHandler(event: any) {
    const { name, value } = event.target
    setUpdateInfo({ ...updateInfo, hoursPerWeek: value })
  }


  function cpfHandler(value: string) {
    return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9)}`
  }
  const fetchData = async () => {
    try {
      const projectUsersList = await projectService.getProjectUsers(projectId)
      const userRole: any = projectUsersList.filter((collaborator) => {
        return collaborator.user_id === Number(profileId)
      })
      setStaticInfo({
        fullName: userRole[0].user.full_name,
        email: userRole[0].user.email,
        cpf: userRole[0].user.cpf
      });
      setUpdateInfo({
        role: userRole[0].role,
        hoursPerWeek: userRole[0].hours_per_week.toString()
      })
      if (userRole[0].role === "ADMIN") {
        setCheckboxList({ ...checkboxList, admin: true })
      }
      if (userRole[0].role === "USER") {
        setCheckboxList({ ...checkboxList, user: true })
      }

    }
    catch(error : any) {
      toast({
        title: "Erro ao Carregar Dados",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }

  }

  async function updateUserAtProject() {
    const updateUserAtProjectData: any = {
      projectId: projectId,
      user_email: staticInfo.email,
      user_role: updateInfo.role,
      user_hours_per_week: Number(updateInfo.hoursPerWeek)
    }
    console.log(updateUserAtProjectData)
    try {
      const response = await projectService.putProjectUsers(
        updateUserAtProjectData.projectId,
        updateUserAtProjectData.user_email,
        updateUserAtProjectData.user_role,
        updateUserAtProjectData.user_hours_per_week
      )
      toast({
        title: "Usuário Atualizado",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
    catch (error: any) {
      toast({
        title: "Erro ao Atualizar",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }

  }

  useEffect(() => {
    fetchData();
  }, [])



  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={"100%"}
    >
      <HeaderBox
        title={
          <>
            <Link href={`/main/projects/info/${projectId}/collaborators`}>Projeto</Link>
          </>
        }
      />
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={"0.5em"}
        padding={"0.5em"}
      >

        <InputGroup
          display="flex"
          flexDirection="column"
          gap="0.5em">
          <FormLabel>Nome Completo</FormLabel>
          <Input
            value={staticInfo.fullName}
            disabled
            type="text"
            bgColor="Lavender"
            color="black"
          />
        </InputGroup>
        <InputGroup
          display="flex"
          flexDirection="column"
          gap="0.5em">
          <FormLabel>Email</FormLabel>
          <Input
            value={staticInfo.email}
            disabled
            type="text"
            bgColor="Lavender"
            color="black"
          />
        </InputGroup>
        <InputGroup
          display="flex"
          flexDirection="column"
          gap="0.5em">
          <FormLabel>CPF</FormLabel>
          <Input
            value={cpfHandler(staticInfo.cpf)}
            disabled
            type="text"
            bgColor="Lavender"
            color="black"
          />
        </InputGroup>
        <InputGroup
          display="flex"
          flexDirection="column"
          gap="0.5em">
          <FormLabel >{''}</FormLabel>
          <Checkbox
            name="admin"
            isChecked={checkboxList.admin}
            onChange={checkboxHandler}

          >
            ADMIN
          </Checkbox>
          <Checkbox
            name="user"
            isChecked={checkboxList.user}
            onChange={checkboxHandler}
          >
            USER
          </Checkbox>
        </InputGroup>
        <InputGroup
          display="flex"
          flexDirection="column"
          gap="0.5em">
          <FormLabel>HORAS POR SEMANA</FormLabel>
          <Input
            value={updateInfo.hoursPerWeek}
            name="hoursPerWeek"
            onChange={inputHandler}
            type="text"
            bgColor="Lavender"
            color="black"
          />
        </InputGroup>

        <Button
          leftIcon={<EditIcon />}
          colorScheme="orange"
          onClick={updateUserAtProject}
        >

          Editar Usuário
        </Button>
      </Box>
    </Box>
  )
}
