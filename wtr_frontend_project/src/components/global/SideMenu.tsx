"use client";
import { Box, Button, Image } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function SideMenu() {

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


  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const iconCase = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
    >
      <path d="M160-120q-33 0-56.5-23.5T80-200v-440q0-33 23.5-56.5T160-720h160v-80q0-33 23.5-56.5T400-880h160q33 0 56.5 23.5T640-800v80h160q33 0 56.5 23.5T880-640v440q0 33-23.5 56.5T800-120H160Zm240-600h160v-80H400v80Z" />
    </svg>
  );

  const iconClock = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="36"
      viewBox="0 -960 960 960"
      width="36"
    >
      <path d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z" />
    </svg>
  );

  const iconLogout = (<svg fill="#000000" height="36" width="36" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" 
  viewBox="0 0 384.971 384.971" xmlSpace="preserve">
<g>
 <g id="Sign_Out">
   <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
     C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
     C192.485,366.299,187.095,360.91,180.455,360.91z"/>
   <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
     c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
     c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
 </g>
 <g>
 </g>
 <g>
 </g>
 <g>
 </g>
 <g>
 </g>
 <g>
 </g>
 <g>
 </g>
</g>
</svg>)

  const pages = [
    {
      id: 1,
      name: "Projetos",
      link: "/main/projects",
      icon: iconCase,
    },
    {
      id: 2,
      name: "Registros",
      link: "/main/time-records",
      icon: iconClock,
    },
    {
      id: 3,
      name: "Logout",
      link: "/auth",
      icon: iconLogout,
      onClick: () => document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/',
    },
  ];

  function menuToggle(){
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <>
      {isMenuOpen ? 
        (<Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"start"}
        gap={"0.5em"}
        bg={"#A7A3FF"}
        padding={"0.5em"}
        width={"15%"}
        >
          <Button
          borderRadius={"50%"}
          bg={"#4D47C3"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"start"}
          width={"auto"}
          marginTop={"10px"}
          marginLeft={"20px"}
          onClick={() => menuToggle()}
          >
            <ArrowForwardIcon color={"white"} fontSize={"25px"}/>
          </Button>
          <Box padding="0 80px 0 80px" >
            <Image src={parsedJWT.picture_url ?? "https://icons.veryicon.com/png/o/miscellaneous/wizhion/person-20.png"} backgroundColor="white" alt="" border="1px solid #000" borderRadius="50%" boxSizing="content-box"/>
          </Box>
          {/* <Box>{parsedJWT.userId}</Box> */}
          <Link href={'/main/profile/'+parsedJWT.userId+'/info'}>{parsedJWT.full_name}</Link>
          <Box>{parsedJWT.email}</Box>
          <Box height="1px" backgroundColor={"black"} width="100%" margin="10px 0 20px 0"></Box>
        {pages.map((item) => {
          return (
            <Link key={item.id} href={`${item.link}`} onClick={item.onClick ?? (() => {})}>
            <Button
            bg={"white"}
            borderRadius={"5px"}
            padding={"1em"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"start"}
            gap={"0.5em"}
            width={"auto"}
            minWidth={"175px"}
            >
            {item.icon}
            {item.name}
            </Button>
            </Link>
          );
        })}
        </Box>)
        : (<Button
          position={"fixed"}
          borderRadius={"50%"}
          bg={"#4D47C3"}
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"start"}
          width={"auto"}
          marginTop={"10px"}
          marginLeft={"20px"}
          onClick={() => menuToggle()}
          >
            <ArrowBackIcon color={"white"} fontSize={"25px"}/>
          </Button>
          )
      }
    </>
  );
}
