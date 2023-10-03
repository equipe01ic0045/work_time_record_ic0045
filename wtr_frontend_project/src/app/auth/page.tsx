"use client";
import UserService from "@/services/UserService";
import { Box, Button, Text, Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { FaGoogle, FaFacebookF, FaGithub } from 'react-icons/fa';

export default function LoginComponent() {
  const toast = useToast();
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const userService = new UserService();

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function loginHandler() {
    userService
      .loginUser(user)
      .then((response) => {
        router.push("/main/projects");
      })
      .catch((error) => {
        toast({
          title: "login invalido",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
      });
  }

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"start"}
      gap={"0.5em"}
      padding={"0.5em"}
      width={"100%"}
    >
      <Text 
        fontSize={"6xl"} 
        color={"blueviolet"} 
        //fontWeight={'bold'}
      >
        Ponto Certo
      </Text>
      <Box display={"flex"} flexDirection={"column"}>
        <Box alignItems={"flex-start"}> 
          <Text 
            fontSize={"2xl"} 
            color={"blueviolet"}
          >
              Entrar
          </Text>
        </Box>
        <Box mt={"0.5em"}>
          <Input
            placeholder="email"
            type="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            style={{
              color: 'blueviolet', 
              backgroundColor: 'Lavender'
            }}
          />
        </Box>
        <Box position="relative" mt={"1em"}>
          <Input
            placeholder="senha"
            type={showPassword ? 'text' : 'password'} 
            name="password"
            value={user.password}
            onChange={inputHandler}
            style={{
              color: 'blueviolet', 
              backgroundColor: 'Lavender',
              paddingRight: '40px', 
            }}
          />
          <Box 
            position="absolute" 
            right="10px" 
            top="50%" 
            transform="translateY(-50%)"
            cursor="pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Link href="">
                <Text fontSize="sm">
                    Perdeu a senha ?
                </Text>
            </Link>
        </Box>
        <Box mt={"1em"}>
          <Button
            background={"blueviolet"}
            textColor={"white"}
            onClick={loginHandler}
            w="100%"
          >
            login
          </Button>
        </Box >
        <Box display={"flex"} flexDirection="column" gap={"0.5em"} alignItems="center" justifyContent="center" mt={"1em"}>
          <Box display={"flex"} flexDirection={"row"} gap={"1em"}>
            <Text fontSize="sm">Não é registrado ?</Text>
            <Link href={"/auth/register"}>
              <Text fontSize="sm" color={"blue"}>registre-se</Text>
            </Link>
          </Box>
          <Text fontSize="sm">Ou continue com:</Text>
          <Box display={"flex"} flexDirection={"row"}>
            <Link href="/auth/google">
              <Box as={FaGoogle} size="24px" cursor="pointer" aria-label="Google Login" />
            </Link>
            <Link href="/auth/facebook">
              <Box as={FaFacebookF} size="24px" cursor="pointer" aria-label="Facebook Login" />
            </Link>
            <Link href="/auth/github">
              <Box as={FaGithub} size="24px" cursor="pointer" aria-label="GitHub Login" />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}