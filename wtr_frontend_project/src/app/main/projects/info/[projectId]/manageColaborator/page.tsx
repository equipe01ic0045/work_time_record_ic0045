'use client'

import { Box, Button, Center, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr, VStack, Text, Link} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faProjectDiagram, faBriefcase  } from '@fortawesome/free-solid-svg-icons';
//import Modal from "@/components/modalAddUser/modalAddUser"
import { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Select, Input} from '@chakra-ui/react';

export default function GerenciarColaborador() {

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
      
      console.log(formData);
    
      setIsOpen(false);
    };

 return (
  <>
    {/* <GerenciarColaborador project={project}/> */}
    <ChakraProvider>
        <Box display="flex" flexDirection="column" height="100vh" position="relative">
          {/* Box no topo da página */}
          <Box bg="#F0EFFF" p={4} height="20vh" width="132%">
            <Center>
              {/* Título */}
              <Text fontSize="xl" fontWeight="bold" color="#4D47C3" fontFamily="">
                  PROJECTS / PROJECT p_0012 / COLABORADORES
              </Text>
            </Center>
          </Box>

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
                                  MANAGER
                              </Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                      {/* Linhas da tabela */}
                      <Tr>
                          <Td>
                              <Link 
                                  width={"30%"} 
                                  href={`/main/projects/info/${project.id}/manageColaborator/reportColaborator`}>
                                      Maria da Silva
                              </Link>
                          </Td>
                          <Td>-01:00 HOURS</Td>
                          <Td>email@example.com</Td>
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
                      <Tr>
                          <Td>Pedro Antônio</Td>
                          <Td>+01:00 HOURS</Td>
                          <Td>pedro@mail.com</Td>
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
                      <Tr>
                          <Td>Gustavo Luiz</Td>
                          <Td>-00:23 HOURS</Td>
                          <Td>gustavo@mail.com</Td>
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
                      <Tr>
                          <Td>Lara Carvalho</Td>
                          <Td>00:00 HOURS</Td>
                          <Td>lara@mail.com</Td>
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
