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
  Textarea,
  Table,
  Th,
  Thead,
  Td,
  Tr,
  Tbody
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ProjectService from "@/services/ProjectService";
import { useToast } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import UserService from "@/services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faRemove } from "@fortawesome/free-solid-svg-icons";

export default function ProjectInfo({ params }: any) {
  const MAX_USERS_PER_PAGE = 10;
  const projectService = new ProjectService()
  const userService = new UserService()
  const urlParameters = useParams()
  const projectIdString = urlParameters.projectId.toString()
  const toast = useToast();
  const router = useRouter();
  const [collaborators, setCollaborators] = useState(new Set());
  const [full_name, setFullName] = useState('');
  const [usersSearch, setUsersSearch] = useState([]);
  const [pageSearch, setPageSearch] = useState(0);
  const [addUser, setAddUser] = useState({
    userId: 0,
    userRole: 'USER',
    userEmail: '',
    userHoursPerWeek: 0
  })
  const null_user = {
    email : '',
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

  const updateSearch = async (
    full_name: string
  ) => {
    setFullName(full_name);
    if(full_name.length == 0){
      setUsersSearch([]);
      return;
    }
    try {
      const users = await userService.getUsersByName(full_name);
      console.log(users);
      setUsersSearch(users.filter((user : any) => !collaborators.has(user.user_id)));
      setPageSearch(0);
    }catch(e){

      toast({
        title: 'Erro!\n'+e,
        description: "",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right"
      })
    }
  };

  useEffect(() => {
    projectService.getProjectUsers(parseInt(projectIdString))
      .then((response) => {
        setCollaborators(new Set(response.map(projectUser => projectUser.user.user_id)))
      })
      .catch((error) => {
        console.error(error);
      })

  }, []);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={'100%'}
    >
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / Adicionar Colaborador</>} />
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
            value={full_name}
            onChange={(e) => updateSearch(e.target.value)}
          />
        </InputGroup>
        <Box>
                    {(usersSearch.length > 0) ? (
                    [(<Table margin="0" padding="0" variant="simple" key="page1">
                      <Thead><Tr bg="#4D47C3"><Th color="white">Nome</Th><Th color="white">EMAIL</Th><Th color="white">CPF</Th><Th color="white">SELECIONAR</Th></Tr></Thead>
                      <Tbody>
                        {usersSearch.slice(pageSearch*MAX_USERS_PER_PAGE, pageSearch*MAX_USERS_PER_PAGE+MAX_USERS_PER_PAGE).map((user : any, index) => {
                          return (<Tr key={"usersearch_"+index} bg={"#F0EFFF"}>
                            <Td>{user.full_name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.cpf.slice(0,3)}.{user.cpf.slice(3,6)}.{user.cpf.slice(6,9)}-{user.cpf.slice(9)}</Td>
                            <Td>
                              <Button size="sm" ml={2} colorScheme={"green"} onClick={() => {
                              setSelectedUser(user);}}>
                                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                                  Selecionar
                              </Button>
                              </Td>
                          </Tr>)}
                        )}
                      </Tbody>
                    </Table>), (usersSearch.length <= MAX_USERS_PER_PAGE) ? '' : (<Box display="flex" marginTop="10px">
                      <Button onClick={() => setPageSearch(Math.max(0, pageSearch-1))} visibility={pageSearch<=0?  'hidden' : 'unset'}>Pagina Anterior</Button>
                      <Box flex="1" textAlign={"center"} display={'flex'} flexDirection={'column'} justifyContent={'center'}>Página {pageSearch+1} / {Math.ceil(usersSearch.length/MAX_USERS_PER_PAGE)}</Box>
                      <Button onClick={() => setPageSearch(Math.min(Math.ceil(usersSearch.length/MAX_USERS_PER_PAGE)-1, pageSearch+1))}  visibility={pageSearch>=Math.ceil(usersSearch.length/MAX_USERS_PER_PAGE)-1? 'hidden' : 'unset'}>Proxima Pagina</Button>
                    </Box>)]) : 'Nenhum usuário encontrado'}
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
            setSelectedUser(null_user);}}>
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
