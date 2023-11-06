'use client'

import { Box, Button, Center, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr, VStack, Text, Link, useToast, Img} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faProjectDiagram, faBriefcase  } from '@fortawesome/free-solid-svg-icons';
//import Modal from "@/components/modalAddUser/modalAddUser"
import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input} from '@chakra-ui/react';
import ProjectService from "@/services/ProjectService";
import ProjectUsers from '@/types/ProjectUsers';
import HeaderBox from '@/components/global/HeaderBox';
import ProjectInfo from '@/types/ProjectInfo';

export default function GerenciarColaborador({params}:any) {

  const projectService = new ProjectService();

  const [users, setUsers] = useState<ProjectUsers[]>([]);
  const toast = useToast();
  const [editModal, setEditModal] = useState(false);
  
  const [fullName, setFullName] = useState('');
  const [usersSearch, setUsersSearch] = useState<any[]>([]);
  const [pageSearch, setPageSearch] = useState<number>(0);
  const MAX_USERS_PER_PAGE = 5;

  const updateSearch = (
    full_name: string
  ) => {
    setFullName(full_name);

    fetch('http://localhost:5000/profiles/allByName',{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({full_name})
    })
    .then(response => response.json())
    .then(response => {
        if(!response.success){
            throw new Error(response.message);
        }
        // if(fullName == full_name){
        setUsersSearch(response.profiles);
        setPageSearch(0);
        // }
    })
    .catch((error)=>{
        console.log(error.status)
        toast({
            title: 'Erro!\n'+error,
            description: "",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: "top-right"
        })
    });
  };
  async function getUsers() {
    const usersData = await projectService.getProjectUsers(params.projectId);
    setUsers(usersData);
  }

  useEffect(() => {
    getUsers();
    updateSearch("");
  }, []);

  const project = 
  {
    id: 1,
    projectName: "Projeto 01",
    manager: "Luiz Silva",
    company: "LATAM",
    users: 58234
  }

  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    role: 'User',
    horas: '',
    email: '',
  });

  function toggleModal(edit : Boolean){
    if(edit){
      setEditModal(true)
    }else{
      setEditModal(false)
    }
    setIsOpen(!isOpen);
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      role: value,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    if(!editModal)
      projectService.postProjectUsers(params.projectId,formData.email,formData.role.toUpperCase(),parseInt(formData.horas))
    else
      projectService.putProjectUsers(params.projectId,formData.email,formData.role.toUpperCase(),parseInt(formData.horas))
  
    setIsOpen(false);
  };

  const [projectInfo, setProjectInfo] = useState<ProjectInfo>();

  async function getProjectInfo() {
    const projectInfoData = await projectService.getProjectInfo(
      params.projectId
    );
    setProjectInfo(projectInfoData);
  }

  useEffect(() => {
    getProjectInfo();
  }, []);

  const svgCreate = (
    <svg 
      width="88" 
      height="88" 
      viewBox="0 0 88 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_253_177)">
        <rect x="4" width="80" height="80" rx="40" fill="#F0EFFF"/>
        <path 
          d="M40.6992 43.3008H19.4891V36.6993H40.6992V15.442H47.3007V36.6993H68.558V43.3008H47.3007V64.5109H40.6992V43.3008Z" 
          fill="#4D47C3"
        />
      </g>
      <defs>
        <filter id="filter0_d_253_177" x="0" y="0" width="88" height="88" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dy="4"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_253_177"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_253_177" result="shape"/>
        </filter>
      </defs>
    </svg>
  );

 return (
  <>
    {/* <GerenciarColaborador project={project}/> */}
    <ChakraProvider>
        <Box display={"flex"} flexDirection={"column"} width={'100%'}>
          {/* Box no topo da página */}
          <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / {projectInfo? <Link href={`/main/projects/info/`+ params.projectId.toString()}>{projectInfo.project_name}</Link> : "...loading"} / <Link href={`/main/projects/info/`+ params.projectId.toString()+"/manageColaborator"}>Colaboradores</Link></>} />

          {/* Box no meio da página */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            p={4}
            bg="white" 
            marginLeft="5vh" 
            zIndex={0} 
            width="100%"
          >   
              <Box my={8} style={{ justifyContent: 'flex-start' }}>
                <Button 
                  gap={"10px"} 
                  textColor={"#4D47C3"}
                  fontSize={"2em"}
                  onClick={()=>toggleModal(false)}>{svgCreate} NOVO COLABORADOR
                </Button>       
              </Box>

              {/* Tabela */}
          
              <Box maxW="800px" width="100%" borderWidth="1px" bg="#F0EFFF">
                  <Table variant="simple" >
                      <Thead>
                      <Tr>
                          <Th
                          bg="#4D47C3" 
                          color="white" 
                          >
                              COLABORADOR
                          </Th>
                          <Th
                          bg="#4D47C3" 
                          color="white" 
                          >
                              EMAIL
                          </Th>
                          <Th
                              bg="#4D47C3" 
                              color="white"
                              >
                                  FUNÇÃO
                              </Th>
                          <Th
                              bg="#4D47C3" 
                              color="white" 
                              >
                                  HORAS
                              </Th>
                          <Th
                              bg="#4D47C3" 
                              color="white" 
                              >
                                  GERENCIAR
                              </Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                        {/* Linhas da tabela */}
                        {users.map((user: ProjectUsers) => {
                          return (
                            <Tr key={user.user.user_id}>
                              <Td>
                                  <Link 
                                      width={"30%"} 
                                      href={`/main/projects/info/${project.id}/manageColaborator/reportColaborator`}>
                                          {user.user.full_name}
                                  </Link>
                              </Td>
                              <Td>{user.user.email}</Td>
                              <Td>{user.role}</Td>
                              <Td>{user.hours_per_week}</Td>
                              <Td>
                                  <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3" onClick={() => toggleModal(true)}>
                                      <FontAwesomeIcon icon={faEdit} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                                          Editar
                                  </Button>
                                  <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                      <FontAwesomeIcon icon={faTrash} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                                          Excluir
                                  </Button>
                              </Td>   
                            </Tr>
                          );
                        })}
                  
                      </Tbody>
                  </Table>
              </Box>
          
            
          </Box>
        </Box>
      </ChakraProvider>

      <Modal isOpen={isOpen} onClose={() => toggleModal(true)}>
        <ModalOverlay />
        <ModalContent maxW="1300px">
          {/* <ModalHeader>Criar Novo Usuário</ModalHeader> */}
          <ModalCloseButton />
          <ModalBody>
            <Table >
              <Tbody>
                <Tr>
                  <Td>Role:</Td>
                  <Td>
                    <Select
                      name="role"
                      value={formData.role}
                      onChange={handleSelectChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="MANAGER">MANAGER</option>
                      <option value="Colaborator">Colaborator</option>
                    </Select>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Horas:</Td>
                  <Td>
                    <Input
                      type="number"
                      name="horas"
                      value={formData.horas}
                      onChange={handleChange}
                    />
                  </Td>
                </Tr>
                {/* <Tr>
                  <Td>Email:</Td>
                  <Td>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Td>
                </Tr> */}<Tr>
                  <Td>Nome:</Td>
                  <Td>
                    <Input
                      type="full_name"
                      name="full_name"
                      value={fullName}
                      onChange={(e) => updateSearch(e.target.value)}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td colSpan={2}><Box marginBottom="10px">Selecionar Colaborador</Box>
                    {(usersSearch.length > 0) ? (
                    [(<Table margin="0" padding="0" variant="simple" key="page1">
                      <Thead><Tr bg="#4D47C3"><Th color="white"></Th><Th color="white">Nome</Th><Th color="white">EMAIL</Th><Th color="white">CPF</Th><Th color="white">SELECIONAR</Th></Tr></Thead>
                      <Tbody>
                        {usersSearch.slice(pageSearch*MAX_USERS_PER_PAGE, pageSearch*MAX_USERS_PER_PAGE+MAX_USERS_PER_PAGE).map((user, index) => {
                          return (<Tr key={"usersearch_"+index} bg={user.email == formData.email ? "#bbedbb" : "#F0EFFF"}>
                            <Td><Img backgroundColor="white" width="50px" height="50px" borderRadius={"50%"} border="1px solid #000" src={user.picture_url ?? 'https://icons.veryicon.com/png/o/miscellaneous/wizhion/person-20.png'} /></Td>
                            <Td>{user.full_name}</Td>
                            <Td>{user.email}</Td>
                            <Td>{user.cpf.slice(0,3)}.{user.cpf.slice(3,6)}.{user.cpf.slice(6,9)}-{user.cpf.slice(9)}</Td>
                            <Td>
                              <Button minW="110px" size="sm" ml={2} colorScheme={user.email == formData.email ? "red" : "green"} onClick={() => {
                              setFormData({
                                ...formData,
                                email: user.email == formData.email ? '' : user.email,
                              });}}>
                                  <FontAwesomeIcon icon={faEdit} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                                  {user.email == formData.email ? "Excluir" : "Selecionar"}
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
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </ModalBody>

          <ModalFooter>
            <Box textAlign="center" width="100%">
              <Button
                colorScheme="green"
                color="white"
                onClick={handleConfirm}
              >
                Confirmar
              </Button>
            </Box>
          </ModalFooter>
        </ModalContent>
      </Modal>

  </>
 )
}
