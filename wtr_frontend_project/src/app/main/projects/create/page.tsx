"use client";

import HeaderBox from "@/components/global/HeaderBox";

import ProjectInfo from "@/types/ProjectInfo";
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Checkbox,
  Textarea,
  FormControl,
  FormErrorMessage
} from "@chakra-ui/react";
import { useState } from "react";
import ProjectService from "@/services/ProjectService";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import ProjectCard, { Project, ProjectError } from "@/components/projects/ProjectCard";

export default function ProjectInfo({ params }: any) {
  const projectService = new ProjectService()
  const toast = useToast();
  const router = useRouter();


  const [_newProject, _setNewProject] = useState<Project>({
    project_name: "",
    project_description: "",
    locationRequired: false,
    commercialTimeRequired: false,
    timezone: '',
    location: '',
    commercial_time_start: 0,
    commercial_time_end: 0
  })
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

  async function registerNewProject(newProject : Project) : Promise<ProjectError>{
    console.log(newProject)
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
      const response = await projectService.createProject(newProject)
        toast({
          title: "Projeto Criado",
          description: "",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/main/projects")
        return erros
    }catch(error : any){
        const data = error?.response?.data;
        const fieldErrors = data?.data?.errors;
        if (fieldErrors)
          fieldErrors.forEach((error: any) => erros[error.path as keyof (typeof erros)] = error.msg);
        if(data?.message && data?.message == "project already exists."){
          erros.project_name = 'Já existe um projeto com este nome!';
        }
        toast({
          title: "Falha em Criar Projeto",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return (erros);

      }
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      width={'100%'}
    >
      <HeaderBox title={<><Link href={`/main/projects`}>Projetos</Link> / Criar Projeto</>} />
      <ProjectCard 
      onSubmit={registerNewProject} 
      project={_newProject} 
      setProject={_setNewProject} 
      requireName={true}
          errors={errors}
          setErrors={setErrors}/>
    </Box >
  );
}
