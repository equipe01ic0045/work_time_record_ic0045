'use client'

import { Box, Button, Center, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr, VStack, Text, Link} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faProjectDiagram, faBriefcase  } from '@fortawesome/free-solid-svg-icons';
//import Modal from "@/components/modalAddUser/modalAddUser"
import { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input} from '@chakra-ui/react';
import ProjectService from "@/services/ProjectService";
import ProjectUsers from '@/types/ProjectUsers';
import HeaderBox from '@/components/global/HeaderBox';

export default function GerenciarColaborador({params}:any) {

  const projectService = new ProjectService();

  const [users, setUsers] = useState<ProjectUsers[]>([]);

  async function getUsers() {
    const usersData = await projectService.getProjectUsers(params.projectId);
    setUsers(usersData);
  }

  useEffect(() => {
    getUsers();
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
  
    const toggleModal = () => {
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
      projectService.postProjectUsers(params.projectId,formData.email,formData.role.toUpperCase(),parseInt(formData.horas))
    
      setIsOpen(false);
    };

 return (
  <>
    {/* <GerenciarColaborador project={project}/> */}
    <ChakraProvider>
        <Box display={"flex"} flexDirection={"column"} width={'100%'}>
          {/* Box no topo da página */}
          <HeaderBox title={`Projeto / ${params.projectInfo? params.projectInfo.project_name : "...loading"}`} />

          {/* Box no meio da página */}
          <Box
            flex={1}
            display="flex"
            flexDirection="column"
            p={4}
            bg="white" 
            marginLeft="20vh" 
            zIndex={0} 
            width="100%"
          >   
              <Box mt={4} style={{ justifyContent: 'flex-start' }}>
                  <Button size="sm" bg="#FFFFFF" color="#4D47C3" fontSize="xl" marginBottom={2} onClick={toggleModal}>USER +</Button>           

              </Box>

              <Box mt={4}></Box>

              {/* Tabela */}
          
              <Box maxW="800px" width="100%" borderWidth="1px" borderRadius="lg" p={4} bg="#F0EFFF">
                  <Table variant="striped" >
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
                                  TIME DEBT
                              </Th>
                          {/* <Th
                              bg="#4D47C3" 
                              color="white"
                              >
                                  EMAIL
                              </Th> */}
                          <Th
                              bg="#4D47C3" 
                              color="white" 
                              >
                                  MANAGER
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
                              {/* <Td>-01:00 HOURS</Td> */}
                              <Td>{user.user.email}</Td>
                              <Td>
                                  <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
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
      {/* <Modal isOpen={isOpen} onClose={toggleModal} handleChange={handleChange} handleConfirm={handleConfirm} handleSelectChange={handleSelectChange}/> */}

      <Modal isOpen={isOpen} onClose={toggleModal}>
        <ModalOverlay />
        <ModalContent>
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
                <Tr>
                  <Td>Email:</Td>
                  <Td>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
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
