"use client";
import UserService from "@/services/UserService";
import { Box, Button, Text, Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegistrationComponent() {
  const router = useRouter();
  const toast = useToast();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmEmail: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userService = new UserService();

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  }

  function registerHandler() {
    if (newUser.email === newUser.confirmEmail && newUser.password === newUser.confirmPassword) {
      userService
        .registerUser(newUser)
        .then(() => {
          toast({
            title: "registro completo",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          router.push("/");
        })
        .catch(() => {
          toast({
            title: "falha no registro",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        });
    } else {
      toast({
        title: "dados inválidos",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="start" gap="0.5em" p="0.5em" w="100%">
      <Text fontSize="6xl" color="blueviolet">
        Ponto Certo
      </Text>

      <Box display="flex" flexDirection="column" gap="0.5em" alignItems="center">
        <Text fontSize="2xl" color="blueviolet">
          Inscreva-se
        </Text>
        <Text fontSize="sm" color="blueviolet">
          Bem-vindo
        </Text>
      </Box>

      <Box display="flex" flexDirection="column" gap="1em" mt="1em">
        <Input placeholder="email" type="email" name="email" value={newUser.email} onChange={inputHandler} bgColor="Lavender" color="blueviolet" />
        <Input placeholder="confirme o email" type="email" name="confirmEmail" value={newUser.confirmEmail} onChange={inputHandler} bgColor="Lavender" color="blueviolet" />

        <Box position="relative">
          <Input
            placeholder="senha"
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={newUser.password}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
          />
          <Box position="absolute" right="10px" top="50%" transform="translateY(-50%)" cursor="pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </Box>
        </Box>

        <Box position="relative">
          <Input
            placeholder="confirme a senha"
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={newUser.confirmPassword}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
          />
          <Box position="absolute" right="10px" top="50%" transform="translateY(-50%)" cursor="pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </Box>
        </Box>

        <Button bg="blueviolet" color="white" onClick={registerHandler}>
          Registrar
        </Button>
        
        <Box display="flex" flexDirection="column" gap="0.5em" alignItems="center">
          <Text>já tem registro?</Text>
          <Link href="/">
            <Text color="blue">Login</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
