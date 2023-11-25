"use client";
import UserService from "@/services/UserService";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Text,
  Input,
  useToast,
  FormLabel,
  InputGroup,
  InputRightElement,
  InputRightAddon
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegistrationComponent() {
  const router = useRouter();
  const toast = useToast();
  const [newUser, setNewUser] = useState({

    fullName: "",
    cpf: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",

  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const userService = new UserService();

  function showPasswordHandler() {
    setShowPassword(!showPassword)
  }

  function showConfirmPasswordHandler() {
    setShowConfirmPassword(!showConfirmPassword)
  }

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  }

  async function registerHandler() {

    try {

      if (newUser.email === newUser.confirmEmail && newUser.password === newUser.confirmPassword) {
        await userService.registerUser(newUser)
        toast({
          title: "Usuário Registrado",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        router.push("/auth");
        return
      }

    }
    catch (error: any) {
      if (error.response.status === 409) {
        toast({
          title: "Email ou CPF já Registrado",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return
      }

      if (error.response.status === 400) {
        toast({
          title: "Senha com 8 caracteres mínimos",
          status: "warning",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });
        return
      }
    }
    toast({
      title: "Falha no Registro",
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right",
    });
    return
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
      gap="0.5em"
      p="0.5em"
      w="100%">
      <Text fontSize="5xl" color="blueviolet">
        Ponto Certo
      </Text>
      <Text fontSize="2xl" color="blueviolet">
        Inscreva-se
      </Text>
      <Box
        display="flex"
        flexDirection="column"
        gap="1em"
      >
        <InputGroup
          display='flex'
          flexDirection='column'
        >
          <FormLabel>Nome Completo</FormLabel>
          <Input
            placeholder="Nome Completo"
            type="text"
            name="fullName"
            value={newUser.fullName}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
          />
        </InputGroup>
        <InputGroup
          display='flex'
          flexDirection='column'
        >
          <FormLabel>CPF</FormLabel>
          <Input
            placeholder="999.999.999-99"
            type="number"
            name="cpf"
            value={newUser.cpf}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
          />
        </InputGroup>
        <InputGroup
          display='flex'
          flexDirection='column'
        >
          <FormLabel >Email</FormLabel>
          <Input
            placeholder="usuario@mail.com"
            type="email"
            name="email"
            value={newUser.email}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet" />
        </InputGroup>
        <InputGroup
          display='flex'
          flexDirection='column'
        >
          <FormLabel>Confirmar Email</FormLabel>
          <Input
            placeholder="usuario@mail.com"
            type="email"
            name="confirmEmail"
            value={newUser.confirmEmail}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
          />
        </InputGroup>
        <FormLabel>Senha</FormLabel>
        <InputGroup>
          <Input
            id="password"
            name="password"
            placeholder="123abc"
            type={showPassword ? 'text' : 'password'}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
          />
          <InputRightAddon
            cursor='pointer'
            onClick={showPasswordHandler}
            children={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          />
        </InputGroup>
        <FormLabel>Confirmar Senha</FormLabel>
        <InputGroup>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            placeholder="123abc"
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={inputHandler}
            bgColor="Lavender"
            color="blueviolet"
          />
          <InputRightAddon
            cursor='pointer'
            onClick={showPasswordHandler}
            children={showPassword ? <ViewOffIcon /> : <ViewIcon />}
          />
        </InputGroup>
        <Button
          mt={4}
          colorScheme='blue'
          isLoading={false}
          type='submit'
          onClick={registerHandler}
        >
          Registrar
        </Button>
      </Box>
    </Box>
  );
}
