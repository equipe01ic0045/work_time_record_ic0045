"use client";

import HeaderBox from "@/components/global/HeaderBox";
import ProjectCard, { Project, ProjectError } from "@/components/projects/ProjectCard";
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
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProjectInfo({ params }: any) {
  const [isOpenDelete, setOpenDlete] = useState(false);
  const [isOpenEdit, setOpenEdit] = useState(false);

  const styleBox = {
    display: "flex",
    "flex-direction": "column",
    gap: "1em",
  };

  const deleteIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="white"
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm80-160h80v-360h-80v360Zm160 0h80v-360h-80v360Z" />
    </svg>
  );

  const editIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="white"
    >
      <path d="M611-461 461-612l111-110-29-29-219 219-56-56 218-219q24-24 56.5-24t56.5 24l29 29 50-50q12-12 28.5-12t28.5 12l93 93q12 12 12 28.5T828-678L611-461ZM270-120H120v-150l284-285 151 150-285 285Z" />
    </svg>
  );

  const userIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="white"
    >
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </svg>
  );

  const router = useRouter();
  const projectService = new ProjectService();
  const parameters = useParams();
  const projectId = Number(parameters.projectId);
  const [projectInfo, setProjectInfo] = useState<ProjectInfo>();
  const [errors, setErrors] = useState<ProjectError>({
    project_name: '',
    location_required: '',
    commercial_time_required: '',
    timezone: '',
    location: '',
    commercial_time_start: '',
    commercial_time_end: '',
    project_description: '',
  });
  const toast = useToast();

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setProjectInfo({ ...projectInfo, [name]: value });
  }

  async function updateProjectHandler(projectInfo : Project) : Promise<ProjectError>{
    const editProject = {
      projectId,
      projectName: projectInfo?.project_name,
      projectDescription: projectInfo?.project_description,
      timezone: projectInfo?.timezone,
      location: projectInfo?.location,
      commercialTimeStart: projectInfo?.commercial_time_start,
      commercialTimeEnd: projectInfo?.commercial_time_end
    }
    const erros : ProjectError = {
      project_name: '',
      location_required: '',
      commercial_time_required: '',
      timezone: '',
      location: '',
      commercial_time_start: '',
      commercial_time_end: '',
      project_description: '',
    };
    try{
        const response = await projectService.updateProject(editProject);
        toast({
          title: "Projeto Atualizado",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        setOpenEdit(false);
        return erros
      }
      catch(error : any){
        toast({
          title: "Falha ao Atualizar Projeto",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        
        const data = error?.response?.data;
        const fieldErrors = data?.data?.errors;
        if (fieldErrors)
          fieldErrors.forEach((error: any) => erros[error.path as keyof (typeof erros)] = error.msg);
        if(data?.message && data?.message == "project already exists."){
          erros.project_name = 'Já existe um projeto com este nome!';
        }
        setOpenEdit(false);
        return (erros);
    }

  }

  function deleteProjectHandler() {
    projectService
      .deleteProject(projectId)
      .then((response) => {
        toast({
          title: "Projeto Deletado",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/main/projects");
      })
      .catch((error) => {
        toast({
          title: "Falha ao Deletar o Projeto",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  }

  function showDeleteModal() {
    setOpenDlete(!isOpenDelete);
  }

  function showEditModal() {
    setOpenEdit(!isOpenEdit);
  }

  useEffect(() => {
    projectService
      .getProjectInfo(projectId)
      .then((response) => {
        setProjectInfo(response);
      })
      .catch((error) => {});
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox
        title={
          <>
            <Link href={`/main/projects`}>Projetos</Link> /{" "}
            {projectInfo ? (
              <Link href={`/main/projects/info/` + params.projectId.toString()}>
                {projectInfo.project_name}
              </Link>
            ) : (
              "...loading"
            )}
          </>
        }
      />
      <Box padding={"1em"}>
        <Card>
          <CardHeader>
            <Heading size="md">{projectInfo?.project_name}</Heading>
          </CardHeader>
          <Box padding="1em" display="flex" flexDirection="row" gap="1em">
            <Button leftIcon={userIcon} colorScheme="blue">
              <Link href={`/main/projects/info/${projectId}/collaborators`}>Usuarios</Link>
            </Button>
            <Button
              leftIcon={editIcon}
              colorScheme="orange"
              onClick={() => {
                setOpenEdit(true);
              }}
            >
              {" "}
              Editar Projeto
            </Button>
            <Button
              leftIcon={deleteIcon}
              colorScheme="red"
              onClick={() => {
                setOpenDlete(true);
              }}
            >
              {" "}
              Deletar Projeto
            </Button>
          </Box>
          {/* <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box style={styleBox}>
                <Heading size="xs" textTransform="uppercase">
                  Fuso Horario
                </Heading>
                <Input
                  name="timezone"
                  onChange={inputHandler}
                  value={projectInfo?.timezone}
                />
              </Box>
              <Box style={styleBox}>
                <Heading size="xs" textTransform="uppercase">
                  Localização
                </Heading>
                <Input
                  name="location"
                  onChange={inputHandler}
                  value={projectInfo?.location}
                />
              </Box>
              <Box style={styleBox}>
                <Heading size="xs" textTransform="uppercase">
                  Tempo Comercial ( Inicio )
                </Heading>
                <Input
                  name="commercial_time_start"
                  type="number"
                  onChange={inputHandler}
                  value={projectInfo?.commercial_time_start}
                />
              </Box>
              <Box style={styleBox}>
                <Heading size="xs" textTransform="uppercase">
                  Tempo Comercial ( Final )
                </Heading>
                <Input
                  name="commercial_time_end"
                  type="number"
                  onChange={inputHandler}
                  value={projectInfo?.commercial_time_end}
                />
              </Box>
              <Box style={styleBox}>
                <Heading size="xs" textTransform="uppercase">
                  Descrição
                </Heading>
                <Textarea
                  name="project_description"
                  value={projectInfo?.project_description}
                  onChange={inputHandler}
                  placeholder="Coloque alguma descrição do projeto"
                  size="sm"
                />
              </Box>
            </Stack>
          </CardBody> */}
          {projectInfo ? <ProjectCard 
          onSubmit={updateProjectHandler} 
          project={projectInfo as Project} 
          setRecord={setProjectInfo} 
          requireName={false}
          errors={errors}
          setErrors={setErrors}
          /> : 'Carregando...'}
        </Card>
      </Box>
      {/* MODAL DELETE */}
      <Modal isOpen={isOpenDelete} onClose={showDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja Deletar O Projeto ? </ModalHeader>
          <ModalCloseButton />
          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button colorScheme="blue" mr={3} onClick={showDeleteModal}>
              Cancelar
            </Button>
            <Button
              colorScheme="red"
              variant="solid"
              onClick={deleteProjectHandler}
            >
              Confirma
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* MODAL EDIT */}
      <Modal isOpen={isOpenEdit} onClose={showEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Deseja Atualizar o Projeto ? </ModalHeader>
          <ModalCloseButton />
          <ModalFooter
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Button colorScheme="blue" mr={3} onClick={showEditModal}>
              Cancelar
            </Button>
            <Button
              colorScheme="orange"
              variant='solid'
              onClick={async () => setErrors(await updateProjectHandler(projectInfo as Project))}
            >
              Confirma
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
