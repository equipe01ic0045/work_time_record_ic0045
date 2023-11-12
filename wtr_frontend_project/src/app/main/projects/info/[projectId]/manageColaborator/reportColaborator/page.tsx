'use client'

import {  Box, Button, Center, ChakraProvider, Table, Tbody, Td, Th, Thead, Tr, Text, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faClock, faFileContract, faBriefcase,  faBan, faCircleCheck  } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import ProjectInfo from '@/types/ProjectInfo';
import HeaderBox from '@/components/global/HeaderBox';
import ProjectService from '@/services/ProjectService';

export default function RelatorioColaborador({ params }: any) {

    const project = 
    {
      id: 1,
      projectName: "Projeto 01",
      manager: "Luiz Silva",
      company: "LATAM",
      users: 58234
    }

    const lista = ["DATA","TEMPO GRAVADO", "AÇÃO", "JUSTIFICATIVA"]

    const [projectInfo, setProjectInfo] = useState<ProjectInfo>();

    const projectService = new ProjectService();
    async function getProjectInfo() {
        const projectInfoData = await projectService.getProjectInfo(
        params.projectId
        );
        setProjectInfo(projectInfoData);
    }

    useEffect(() => {
        getProjectInfo();
    }, []);

 return (
  <>
    {/* <RelatorioColaborador project={mockDataList}/> */}
      <ChakraProvider>
        <Box display={"flex"} flexDirection={"column"} width={'100%'}>
          {/* Box no topo da página */}
          <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / {projectInfo? <Link href={`/main/projects/info/`+ params.projectId.toString()}>{projectInfo.project_name}</Link> : "...loading"} / <Link href={`/main/projects/info/`+ params.projectId.toString()+"/manageColaborator"}>Colaboradores</Link>{" / {Maria da Silva}"}</>} />

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
          
              <Box maxW="800px" width="100%" borderWidth="1px" bg="#F0EFFF">
                  <Table variant="simple" >
                      <Thead>
                        <Tr>                            
                            {lista.map((item : any)=>{return <Th bg="#4D47C3" 
                            color="white" > 
                            {item} </Th>})}
                        </Tr>
                      </Thead>
                      <Tbody>
                      {/* Linhas da tabela */}
                      <Tr borderBottom="2px" borderColor="gray.300">
                          <Td>27/08/2023</Td>
                          <Td>08:00 HOURS</Td>
                          <Td>
                            <Button size="sm" ml={2} colorScheme="green" bgColor="green">
                                <FontAwesomeIcon icon={faCircleCheck} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                            </Button>
                            <Button size="sm" ml={2} colorScheme="red" bgColor="red">
                                <FontAwesomeIcon icon={faBan} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                            </Button> </Td>
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
                      <Tr borderBottom="2px" borderColor="gray.300">
                          <Td>20/08/2023</Td>
                          <Td>07:50 HOURS</Td>
                          <Td>YES</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                          </Td>
                      </Tr>
                      <Tr borderBottom="2px" borderColor="gray.300">
                          <Td>30/08/2023 Luiz</Td>
                          <Td>09:22 HOURS</Td>
                          <Td>NO</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>
                          </Td>
                      </Tr>
                      <Tr borderBottom="2px" borderColor="gray.300">
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>Correct</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>   
                          </Td>
                      </Tr>
                      <Tr borderBottom="2px" borderColor="gray.300">
                          <Td>01/07/2023</Td>
                          <Td>08:05 HOURS</Td>
                          <Td>Correct</Td>
                          <Td>
                              <Button size="sm" ml={2} colorScheme="purple" bgColor="#4D47C3">
                                  <FontAwesomeIcon icon={faFileContract} style={{ marginRight: '4px', color: '#F0EFFF' }} />
                              </Button>   
                          </Td>
                      </Tr>
                      <Tr borderBottom="2px" borderColor="gray.300">
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