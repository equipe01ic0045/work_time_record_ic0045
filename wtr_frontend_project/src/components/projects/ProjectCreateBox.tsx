"use client";
import { Link, Text, Box, Button, Input, Textarea, Checkbox, useToast, border } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ProjectCreateBox({ project }: any) {
  const borderRadiusValue = "5px";
  const router = useRouter();
  const toast = useToast();

  const white = "#fff";
  const gap = "10px";
  const padding = "20px";


  const svgTrash = (
    <svg
      width="24"
      height="24"
      xmlns="http://www.w3.org/2000/svg"
      fillRule="evenodd"
      clipRule="evenodd"
    >
      <path
        d="M19 24h-14c-1.104 0-2-.896-2-2v-16h18v16c0 1.104-.896 2-2 2m-9-14c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6-5h-20v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2zm-12-2h4v-1h-4v1z"
        fill="white"
      />
    </svg>
  );


  const [newUser, setNewUser] = useState(project);

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
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
        if(!response.success)
            throw new Error(response.message);
        
        console.log(response);
        toast({
            title: 'Projeto criado com sucesso!',
            description: "",
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: "top-right"
          })
          router.push('/main/projects')
    })
    .catch((error)=>{
        console.log(error.status)
        toast({
            title: 'Falha na criação de projeto!\n'+error,
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
              return (
                <Box key={"item_" + i} style={{ display: "flex"}}>
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
            <Button background={"#4D47C3"} color={white} flex={1} onClick={(ev)=>createProject(ev)}>Create</Button>
            <Button background={"#4D47C3"} onClick={()=>router.push('/main/projects')}>{svgTrash}</Button>
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
