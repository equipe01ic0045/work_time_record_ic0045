"use client";
import { Link, Text, Box, Button, Input, Textarea, Checkbox, useToast, Image } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";

export default function ProfileBox({ project }: any) {
  const router = useRouter();
  const toast = useToast();

  const white = "#fff";
  const gap = "10px";
  const padding = "20px";

  const [newUser, setNewUser] = useState(project);
  const [newUserError, setNewUserError] = useState(new Map());

  function parseJwt (token : string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}


const [parsedJWT, setParsedJWT] = useState<{[key: string] : string}>({});

useEffect(() => {
  const splits = document.cookie.split('=');
  if(splits.length > 1){
    setParsedJWT(parseJwt(document.cookie.split("=")[1]))
  }else{
    window.location.href = '/auth';
  }
}, []);

  function inputHandler(event: any) {
    const { name, value, type, checked } = event.target;
    setNewUser({ ...newUser, [name]: (type == BOOL) ? checked : value});
    console.log(newUser)
  }
  
  function editProject(event: any) {
    if(!newUser.edit)
      return;

    const data = {...newUser};
    
    fetch('http://localhost:5000/profiles/edit',{
        method: "PUT",
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
          window.location.href = '/main/profile/'+newUser.user_id+'/info';
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

  function uploadFile(){
    const input = document.getElementById('fileinput')!;
    input.click();
  }
  function fetchUpload(){
    const input = (document.getElementById('fileinput') as HTMLInputElement)!;
    if(input.files && input.files.length>0){

      var data = new FormData()
      data.append('picture', input.files[0])
      
      fetch('http://localhost:5000/profiles/upload', {
        method: 'POST',
        credentials: 'include',
        body: data
      })
      .then(response => response.json())
      .then(response => {
          if(!response.success){
              throw new Error(response.message);
          }
          setNewUser({...newUser, picture_url : response.file_name})
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
  }
  const TIME = "time";
  const TEXT = "text";
  const BOOL = "checkbox";
  
  const keys = [
    // ["URL DA FOTO", 'picture_url'],
    ["NOME COMPLETO", 'full_name', 'false'],
    ["EMAIL", 'email', 'false'],
    ["SENHA", 'password', 'false'],
    ["CRIADO EM", 'created_at', 'true'],
    ["ULTMO UPDATE", 'updated_at', 'true'],
  ];
  
  return (
    <Box
      background={"purple.200"}
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

          <input type="file" id="fileinput" onChange={(ev) => fetchUpload()} style={{display: "none"}}/>
          <Box style={{ display: "flex" }}>
            
            <Box display="flex" flex="1" justifyContent="center">
              <Image src={newUser.picture_url ?? "https://icons.veryicon.com/png/o/miscellaneous/wizhion/person-20.png"} backgroundColor="white" alt="" border="1px solid #000" borderRadius="50%" boxSizing="content-box" maxWidth="100px"/>
            </Box>
          </Box>
            {project.edit && <Box
              display={"flex"}
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
               gap={gap}
            >
              <Button background={"blueviolet"} color={white} flex={1} onClick={(ev)=>uploadFile(ev)}>Upload foto</Button>
            </Box>}
          {(newUser.edit ? keys : [...keys.slice(0, 2), ...keys.slice(3)])
            .map((n) => {
              return { label: n[0], value: n[1], type: n[2] };
            })
            .map((item, i) => {
              let normalBox = (
                <Box key={"item_" + i} style={{ display: "flex" }}>
                  <Box
                    background={"blueviolet"}
                    textColor={"white"}
                    style={{ flex: 1, padding: gap, textAlign: "center" }}
                  >
                    {item.label}
                  </Box>
                    <Input
                      type="text"
                      name={item.value}
                      value={newUser[item.value]}
                      onChange={inputHandler}
                      style={{
                        flex: 1,
                        padding: gap,
                        backgroundColor: white,
                        borderRadius: 0,
                        height: '100%',
                      }}
                      disabled={!project.edit || item.type=='true'}
                      />
                  
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
            {(project.edit || newUser.user_id == parsedJWT.userId) && <Box
              display={"flex"}
              flexDir={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
               gap={gap}
            >
              <Button background={"blueviolet"} color={white} flex={1} onClick={(ev)=>newUser.edit ? editProject(ev) : router.push('/main/profile/'+newUser.user_id+'/edit')}>{newUser.edit ? "Editar" : "Ir para edição"}</Button>
            </Box>}
        </Box>

        <Box
          style={{
            gap: padding,
            flex: ".6",
            display: "flex",
            flexDirection: "column",
          }}
        >
          
        </Box>
      </Box>
    </Box>
  );
}
