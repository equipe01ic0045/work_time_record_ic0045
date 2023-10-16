'use client'

import {  Box, Button, Center, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr, Text, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faFileContract, faBriefcase, faBan, faCircleCheck      } from '@fortawesome/free-solid-svg-icons';

export default function ActionJustify() {

    const project = 
    {
      id: 1,
      projectName: "Projeto 01",
      manager: "Luiz Silva",
      company: "LATAM",
      users: 58234
    }

    const lista = ["DATE","TIME RECORD", "ACTION"]

 return (
  <>
    {/* <RelatorioColaborador project={mockDataList}/> */}
      <ChakraProvider>
        <Box display="flex" flexDirection="column" height="100vh" position="relative">
          {/* Box no topo da página */}
          <Box bg="#F0EFFF" p={4} height="20vh" width="186%">
            <Center>
              {/* Título */}
              <Text fontSize="xl" fontWeight="bold" color="#4D47C3" fontFamily="">
                  JUSTIFICATION
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
              <Text mt={2} fontSize={'3xl'} color="#4D47C3">
                  MARIA DA SILVA
              </Text>

              <Box mt={4}></Box>

              {/* Tabela */}
          
              <Box maxW="800px" width="100%" borderWidth="1px" borderRadius="lg" p={4} bg="#F0EFFF">
                  <Table variant="striped" >
                      <Thead>
                        <Tr>                            
                            {lista.map((item : any)=>{return <Th bg="#4D47C3" 
                            color="white" > 
                            {item} </Th>})}
                        </Tr>
                      </Thead>
                      <Tbody>
                      {/* Linhas da tabela */}
                      <Tr>
                          <Td>27/08/2023</Td>
                          <Td>08:00 HOURS</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="green" bgColor="green">
                                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                              <Button size="sm" ml={2} colorScheme="red" bgColor="red">
                                  <FontAwesomeIcon icon={faBan} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>  

                          </Td>
                            
                      </Tr>
                      <Tr>
                          <Td>20/08/2023</Td>
                          <Td>07:50 HOURS</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="green" bgColor="green">
                                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                              <Button size="sm" ml={2} colorScheme="red" bgColor="red">
                                  <FontAwesomeIcon icon={faBan} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>  

                          </Td>
      
                      </Tr>
                      <Tr>
                          <Td>30/08/2023 Luiz</Td>
                          <Td>09:22 HOURS</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="green" bgColor="green">
                                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                              <Button size="sm" ml={2} colorScheme="red" bgColor="red">
                                  <FontAwesomeIcon icon={faBan} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>  


                          </Td>
                          
                      </Tr>
                      <Tr>
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="green" bgColor="green">
                                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                              <Button size="sm" ml={2} colorScheme="red" bgColor="red">
                                  <FontAwesomeIcon icon={faBan} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>  
                          </Td>
                          
                      </Tr>
                      <Tr>
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="green" bgColor="green">
                                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                              <Button size="sm" ml={2} colorScheme="red" bgColor="red">
                                  <FontAwesomeIcon icon={faBan} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button> 

                          </Td>
                          
                      </Tr>
                      <Tr>
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="green" bgColor="green">
                                  <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                              <Button size="sm" ml={2} colorScheme="red" bgColor="red">
                                  <FontAwesomeIcon icon={faBan} style={{ marginRight: '4px', color: '#F0EFFF' }} />
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