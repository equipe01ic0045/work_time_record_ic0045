import React from 'react';
import {  Box, Button, Center, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr, Text } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faFileContract, faBriefcase  } from '@fortawesome/free-solid-svg-icons';

export default function RelatorioColaborador() {
  return (
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

        {/* Box no canto esquerdo */}
        <Box
            width="25vh"
            height="100%" 
            bg="#A7A3FF"
            p={4}
            position="absolute"
            top={0} 
            left={0} 
            zIndex={1}
        >
            {/* Botão Projects */}
            <Box mt={4}>
                <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3" marginBottom={2} width="90%">
                    <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                        Projects
                </Button>
            </Box>

            { /* Botão Time Records */}
            <Box>
                <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3" marginBottom={2} width="90%">
                    <FontAwesomeIcon icon={faClock} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                        Time Records
                </Button>
            </Box>
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
                            <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                            </Button>
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
  );
}
