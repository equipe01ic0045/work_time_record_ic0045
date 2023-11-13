"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectService from "@/services/ProjectService";
import ProjectInfo from "@/types/ProjectInfo";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectInfo({ params }: any) {

  
  const [isOpenDelete, setOpenDlete] = useState(false)
  const [isOpenEdit, setOpenEdit] = useState(false)

  const styleBox = {
    'display': 'flex',
    'flex-direction': 'column',
    'gap': '1em'
  }

  const deleteIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white">
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
    </svg>)

  const editIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white">
      <path d="M611-461 461-612l111-110-29-29-219 219-56-56 218-219q24-24 56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 28.5T828-678L611-461ZM270-120H120v-150l284-285 151 150-285 285Z" />
    </svg>)

  const userIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="white">
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </svg>)

  const projectService = new ProjectService();
  const parameters = useParams()
  const projectId = Number(parameters.projectId)
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>();

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setProjectInfo({ ...projectInfo, [name]: value });
  }

  function updateProjectHandler() {

  }

  function deleteProjectHandler() {

  }

  function deleteModalHandler() {
    setOpenDlete(!isOpenDelete)
  }

  function editModalHandler() {
    setOpenEdit(!isOpenEdit)
  }

  useEffect(() => {
    projectService.getProjectInfo(projectId)
      .then((response) => {
        setProjectInfo(response)
      }).catch((error) => {

      })

  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={'100%'}>
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / {projectInfo ? <Link href={`/main/projects/info/` + params.projectId.toString()}>{projectInfo.project_name}</Link> : "...loading"}</>} />
      <Box padding={"1em"}>
        <Card>
          <CardHeader>
            <Heading size='md'>{projectInfo?.project_name}</Heading>
          </CardHeader>
          <Box
            padding='1em'
            display='flex'
            flexDirection='row'
            gap='1em'
          >
            <Button leftIcon={deleteIcon} colorScheme="red" onClick={()=>{setOpenDlete(true)}}> Deletar Projeto</Button>
            <Button leftIcon={editIcon} colorScheme="orange" onClick={()=>{setOpenEdit(true)}}> Editar Projeto</Button>
            <Button leftIcon={userIcon} colorScheme="blue">Usuarios</Button>
          </Box>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box style={styleBox}>
                <Heading size='xs' textTransform='uppercase'>
                  Fuso Horario
                </Heading>
                <Input name="timezone" onChange={inputHandler} value={projectInfo?.timezone} />
              </Box>
              <Box style={styleBox}>
                <Heading size='xs' textTransform='uppercase'>
                  Localização
                </Heading>
                <Input name="location" onChange={inputHandler} value={projectInfo?.location} />
              </Box>
              <Box style={styleBox}>
                <Heading size='xs' textTransform='uppercase'>
                  Tempo Comercial ( Inicio )
                </Heading>
                <Input name="commercial_time_start" onChange={inputHandler} value={projectInfo?.commercial_time_start} />
              </Box>
              <Box style={styleBox}>
                <Heading size='xs' textTransform='uppercase'>
                  Tempo Comercial ( Final )
                </Heading>
                <Input name="commercial_time_end" onChange={inputHandler} value={projectInfo?.commercial_time_end} />
              </Box>
              <Box style={styleBox}>
                <Heading size='xs' textTransform='uppercase'>
                  Descrição
                </Heading>
                <Textarea
                  name="project_description"
                  value={projectInfo?.project_description}
                  onChange={inputHandler}
                  placeholder='Coloque alguma descrição do projeto'
                  size='sm'
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Box>
      {/* MODAL DELETE */}
      <Modal isOpen={isOpenDelete} onClose={deleteModalHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={deleteModalHandler}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL EDIT */}
      <Modal isOpen={isOpenEdit} onClose={editModalHandler}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={editModalHandler}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
