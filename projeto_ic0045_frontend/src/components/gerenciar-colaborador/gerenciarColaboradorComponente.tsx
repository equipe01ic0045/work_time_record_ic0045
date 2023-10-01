import React from 'react';
import {
  Box,
  Button,
  Center,
  ChakraProvider,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faProjectDiagram, faBriefcase  } from '@fortawesome/free-solid-svg-icons';

export default function GerenciarColaborador() {
  return (
    <ChakraProvider>
      <Box display="flex" flexDirection="column" height="100vh" position="relative">
        {/* Box no topo da página */}
        <Box bg="#F0EFFF" p={4} height="20vh" width="144%">
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
            <Box mt={4} style={{ justifyContent: 'flex-start' }}>
                <Button size="sm" bg="#FFFFFF" color="#4D47C3" fontSize="xl" marginBottom={2}>USER +</Button>
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
                        <Td>Maria da Silva</Td>
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
  );
}
