"use client";
import { Box, Button, Image } from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";
import React, { useState } from "react";
import { cookies } from 'next/headers';
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";

export default function SideMenu() {


  const router = useRouter()
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

  const iconLogout = (
    <svg xmlns="http://www.w3.org/2000/svg" height="36" viewBox="0 -960 960 960" width="36">
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
    </svg>
  );

  const iconUser = (
    <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </svg>
  )

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
      onClick: logoutHandler,
    },
  ];

  function logoutHandler() {
    document.cookie = `token=; expires=${new Date()}; path=/;`
    router.push('auth/')

  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={"0.5em"}
      bg={"#A7A3FF"}
      padding={"0.5em"}
      minW={"fit-content"}
      width={"15%"}
      flexWrap={"wrap"}
      
    >
      <Box
        background='white'
        borderRadius='50%'
        padding='0.5em'
        _hover={{
          cursor:'pointer',
          background:'gray.200'
        }}
      >
        {iconUser}
      </Box>
      <Box 
      height="1px" 
      backgroundColor={"black"} 
      width="100%" margin="10px 0 20px 0"></Box>
      {pages.map((item) => {
        return (
          <Link key={item.id} href={`${item.link}`} onClick={item.onClick ?? (() => { })}>
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
    </Box>

  );
}
