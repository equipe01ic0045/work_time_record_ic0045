"use client";
import { Link, Text, Box, Button, Input, Textarea, Checkbox, useToast, border } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ProjectCreateBox({ project }: any) {
  const borderRadiusValue = "5px";
  const router = useRouter();
  const toast = useToast();

  const white = "#fff";
  const gap = "10px";
  const padding = "20px";

  const [newUser, setNewUser] = useState(project);
  const [newUserError, setNewUserError] = useState(new Map());

  function inputHandler(event: any) {
    const { name, value, type, checked } = event.target;
    setNewUser({ ...newUser, [name]: (type == BOOL) ? checked : value});
    console.log(newUser)
  }
  function createProject(event: any) {
    const data = {...newUser};
    
    console.log(data);
    ['commercial_time_start', 'commercial_time_end'].forEach(key => data[key] = data[key].split(":").map((n : string) => parseInt(n)).reduce((p: number, c: number) => c + p*60))
    console.log(data);
    fetch('http://localhost:5000/projects',{
        method: project.edit ? "PUT" : "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        if(!response.success){
            const erros = new Map();
            if(response.data.errors)
              response.data.errors.forEach((error : any)=> erros.set(error.path, error.msg));
            setNewUserError(erros);

            throw new Error(response.message);
        }
        
        console.log(response);
        toast({
            title: 'Sucesso!',
            description: "",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top-right"
          })
          router.push(project.edit ? '/main/projects/info/'+project.project_id : '/main/projects')
    })
    .catch((error)=>{
        console.log(error.status)
        toast({
            title: 'Erro!\n'+error,
            description: "",
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: "top-right"
        })
    });
  }

  const TIME = "time";
  const TEXT = "text";
  const BOOL = "checkbox";

  return (
    <Box
      background={"#F0EFFF"}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: padding,
        gap: padding,

      }}
    >
      <Box
        style={{ flex: "1", padding: padding, display: "flex", gap: padding }}
      >
        <Box
          style={{
            gap: padding,
            flex: ".4",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {[
            ["NOME DO PROJETO", 'project_name', TEXT],
            ["LOCALIZAÇÃO", 'location', TEXT],
            ["LOCALIZAÇÃO REQUERIDA", 'location_required', BOOL],
            ["TIMEZONE", 'timezone', TEXT],
            ["HORÁRIO COMERCIAL REQUERIDO", 'commercial_time_required', BOOL],
            ["HORÁRIO COMERCIAL (INÍCIO)", 'commercial_time_start', TIME],
            ["HORÁRIO COMERCIAL (FIM)", 'commercial_time_end', TIME],
          ]
            .map((n) => {
              return { label: n[0], value: n[1], type: n[2] };
            })
            .map((item, i) => {
              let normalBox = (
                <Box key={"item_" + i} style={{ display: "flex" }}>
                  <Box
                    background={"#4D47C3"}
                    textColor={"white"}
                    style={{ flex: 1, padding: gap, textAlign: "center", borderTopLeftRadius: borderRadiusValue, borderBottomLeftRadius: borderRadiusValue}}
                  >
                    {item.label}
                  </Box>
                  {(item.type == TEXT || item.type == TIME) ?
                    <Input
                      type={item.type}
                      name={item.value}
                      value={newUser[item.value]}
                      onChange={inputHandler}
                      style={{
                        flex: 1,
                        padding: gap,
                        backgroundColor: white,
                        height: '100%',
                        textAlign: "center",
                        borderTopLeftRadius: 0, borderBottomLeftRadius: 0,
                        borderTopRightRadius: borderRadiusValue, borderBottomRightRadius: borderRadiusValue,
                      }}
                      />
                    : <Box
                      style={{
                        flex: 1,
                        padding: gap,
                        backgroundColor: white,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        borderTopRightRadius: borderRadiusValue, borderBottomRightRadius: borderRadiusValue,
                      }}>
                      <Checkbox
                      name={item.value}
                      checked={newUser[item.value]}
                      onChange={inputHandler}
                      display={'flex'}
                      justifyContent={'center'}
                      />
                      </Box>
                  }
                  
                </Box>
              );
              if(newUserError.has(item.value)){
                return [(
                  <Box key={"item_error_" + i} style={{ display: "flex" }}>
                    <Box
                      background={"red"}
                      textColor={"white"}
                      style={{ flex: 1, padding: gap, textAlign: "center" }}
                    >
                      {newUserError.get(item.value)}
                    </Box>
                  </Box>), normalBox];
              }
              return normalBox;
            })}
        </Box>

        <Box
          style={{
            gap: padding,
            flex: ".6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            display={"flex"}
            flexDir={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
             gap={gap}
          >
            <Button background={"blueviolet"} color={white} flex={1} onClick={(ev)=>createProject(ev)}>{project.edit ? 'Editar' : 'Criar'}</Button>
          </Box>
          <Box
            background={"#4D47C3"}
            textColor={"white"}
            style={{ padding: gap, textAlign: "center", borderRadius: borderRadiusValue}}
          >
            DESCRIÇÃO DO PROJETO
          </Box>
          <Textarea
            name={"project_description"}
            onChange={inputHandler}
            style={{
              backgroundColor: white,
              flex: 1,
              padding: gap,
              textAlign: "justify",
              borderRadius: borderRadiusValue,
              width: '100%'
            }}
            value={newUser.project_description}
          />
        </Box>
      </Box>
    </Box>
  );
}
