"use client";

import HeaderBox from "@/components/global/HeaderBox";

import ProjectInfo from "@/types/ProjectInfo";
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  Link,
  Checkbox,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProjectService from "@/services/ProjectService";
import { useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import UserService from "@/services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import CollaboratorFullList from "@/components/projects/CollaboratorFullList";

export default function ProjectInfo() {
  const projectService = new ProjectService()
  const userService = new UserService()
  const urlParameters = useParams()
  const projectIdString = urlParameters.projectId.toString()
  const toast = useToast();
  const router = useRouter();
  const [filter, setFilter] = useState('');
  const [filterList, setFilterList] = useState([]);
  const [usersFullList, setUsersFullList] = useState([])
  const [addUser, setAddUser] = useState({
    userId: 0,
    userRole: 'USER',
    userEmail: '',
    userHoursPerWeek: 0
  })
  const null_user = {
    email: '',
    full_name: '',
    id: -1,
  }
  const [selectedUser, setSelectedUser] = useState(null_user)

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setAddUser({ ...addUser, [name]: value });
  }

  const addUserHandler = async () => {
    try {
      const _add = { ...addUser, userId: selectedUser.id, userEmail: selectedUser.email }
      setAddUser(_add)
      await projectService.postProjectUsers(projectIdString, _add)
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



  function filterHandler(event: any) {
    const filterValue = event.target.value
    setFilter(filterValue)
  }

  async function searchHandler() {
    try {
      const userList = await userService.getUsersByName(filter)
      setFilterList(userList)
    }
    catch (error: any) {
      toast({
        title: "Colaborador Não Encontrado",
        description: "",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
    }
  }

  const fetchData = async () => {
    try {
      const usersList = await userService.getUsersAll()
      setUsersFullList(usersList)
    }
    catch (error: any) {
      toast({
        title: "Não foi Possivel Carregar",
        description: "",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
    }

  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={'100%'}
    >
      <HeaderBox
        title={<><Link href={`/main/projects`}>Projetos</Link> / Adicionar Colaborador</>}
      />
      {selectedUser.email == '' ? <Box
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
          <FormLabel>Nome do Usuário</FormLabel>
          <Input
            placeholder="Nome do Usuário"
            type="text"
            name="name"
            bgColor="Lavender"
            color="blueviolet"
            value={filter}
            onChange={filterHandler}
            onKeyUp={searchHandler}
          />
        </InputGroup>
        <Box>
          {
            filter.length >= 1 ?
              <CollaboratorFullList
                collaboratorFullList={filterList}
                setSelectedUser={setSelectedUser}
              /> :
              <CollaboratorFullList
                collaboratorFullList={usersFullList}
                setSelectedUser={setSelectedUser}
              />
          }

        </Box>
      </Box> : <Box
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
          <FormLabel>Nome do Usuário Selecionado</FormLabel>
          <Box display={"flex"}>

            <Input
              placeholder="usuario@mail.com"
              type="text"
              name="full_name"
              bgColor="Lavender"
              color="blueviolet"
              value={selectedUser.full_name}
              disabled={true}
              onChange={inputHandler}
            />
            <Button size="sm" ml={2} height="100%" aspectRatio="1/1" colorScheme={"red"} onClick={() => {
              setSelectedUser(null_user);
            }}>
              <FontAwesomeIcon icon={faRemove} style={{ marginRight: '4px', color: '#F0EFFF' }} />
            </Button>
          </Box>
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
      </Box>}
    </Box >
  );
}
