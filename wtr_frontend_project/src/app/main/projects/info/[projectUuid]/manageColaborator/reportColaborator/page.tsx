'use client'

import {  Box, Button, Center, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr, Text, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faFileContract, faBriefcase  } from '@fortawesome/free-solid-svg-icons';

export default function RelatorioColaborador() {

    const project = 
    {
      id: 1,
      projectName: "Projeto 01",
      manager: "Luiz Silva",
      company: "LATAM",
      users: 58234
    }

 return (
  <>
    {/* <RelatorioColaborador project={mockDataList}/> */}
      <ChakraProvider>
        <Box display="flex" flexDirection="column" height="100vh" position="relative">
          {/* Box no topo da página */}
          <Box bg="#F0EFFF" p={4} height="20vh" width="149%">
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
            marginLeft="55vh" 
            zIndex={0} 
            width="80%"
          >   
              <Text mt={2} fontSize={'3xl'} color="#4D47C3">
                  MARIA DA SILVA
              </Text>

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
                              DATE
                          </Th>
                          <Th
                              bg="#4D47C3" 
                              color="white" 
                              >
                                  TIME RECORD
                              </Th>
                          <Th
                              bg="#4D47C3" 
                              color="white"
                              >
                                  JUSTIFICATION
                              </Th>
                          <Th
                              bg="#4D47C3" 
                              color="white" 
                              >
                                  DOCUMENTS
                              </Th>
                          </Tr>
                      </Thead>
                      <Tbody>
                      {/* Linhas da tabela */}
                      <Tr>
                          <Td>27/08/2023</Td>
                          <Td>08:00 HOURS</Td>
                          <Td>YES</Td>
                          <Td>
                              <Link 
                                  width={"30%"} 
                                  href={`/main/projects/info/${project.id}/manageColaborator/reportColaborator/justifyColaborator`}>
                                <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                    <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                                </Button>
                              </Link>
                          </Td>   
                      </Tr>
                      <Tr>
                          <Td>20/08/2023</Td>
                          <Td>07:50 HOURS</Td>
                          <Td>YES</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                          </Td>
                      </Tr>
                      <Tr>
                          <Td>30/08/2023 Luiz</Td>
                          <Td>09:22 HOURS</Td>
                          <Td>NO</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                          </Td>
                      </Tr>
                      <Tr>
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>Correct</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>   
                          </Td>
                      </Tr>
                      <Tr>
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>Correct</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>   
                          </Td>
                      </Tr>
                      <Tr>
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>Correct</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>   
                          </Td>
                      </Tr>
                      </Tbody>
                  </Table>
              </Box>
          
            
          </Box>
        </Box>
      </ChakraProvider>
  </>
 )
}