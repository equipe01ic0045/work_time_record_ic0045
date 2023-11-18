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
          title: "Login Invalido",
          description: "",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return
      });
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="0.5em"
      p="0.5em"
      w="100%">
      <Text
        fontSize="6xl"
        color="blueviolet">
        Ponto Certo
      </Text>
      <Box
        display="flex"
        flexDirection="column">
        <Input
          placeholder="user@mail.com"
          type="email"
          name="email"
          value={user.email}
          onChange={inputHandler}
          bgColor="Lavender"
          color="blueviolet"
          mt="1em"
        />
        <Box position="relative" mt="1em">
          <Input
            placeholder="123abc"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={user.password}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
            paddingRight="40px"
          />
          <Box
            position="absolute"
            right="10px"
            top="50%"
            transform="translateY(-50%)"
            cursor="pointer"
            onClick={() =>
              setShowPassword(!showPassword)}>
            {showPassword ? <ViewOffIcon /> : <ViewIcon />}
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-end"
          mt="1em"
          gap='1em'
          >
            <Text fontSize="sm">
              Perdeu a senha?
            </Text>
          <Link
            href="auth/password-recovery">
            <Text 
            color='blue'
            fontSize="sm"
            >
              Clique Aqui
            </Text>
          </Link>
        </Box>
        <Button
          bg="blueviolet"
          color="white"
          onClick={loginHandler}
          w="100%" mt="1em">
          Entrar
        </Button>
        <Box display="flex" flexDirection="column" gap="0.5em" alignItems="center" mt="1em">
          <Box display="flex" flexDirection="row" gap="1em">
            <Text fontSize="sm">Não é registrado ?</Text>
            <Link href="auth/register"><Text fontSize="sm" color="blue">Registre-se</Text></Link>
          </Box>
          <Text fontSize="sm">Ou continue com:</Text>
          <Box display="flex" flexDirection="row" gap="1em">
            
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
