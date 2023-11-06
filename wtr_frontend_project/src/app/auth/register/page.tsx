"use client";
import UserService from "@/services/UserService";
import { Box, Button, Text, Input, useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegistrationComponent() {
  const router = useRouter();
  const toast = useToast();
  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    confirmEmail: "",
    confirmPassword: "",
    cpf: "",
  });

  const userService = new UserService();

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  }

  function registerHandler() {
    if (
      newUser.email == newUser.confirmEmail &&
      newUser.password == newUser.confirmPassword
    ) {
      userService
        .registerUser(newUser)
        .then((response) => {
          toast({
            title: "registro completo",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          router.push("/");
        })
        .catch((error) => {
          toast({
            title: "falha no registro",
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        });
    }
    if (
      newUser.email != newUser.confirmEmail ||
      newUser.password != newUser.confirmPassword
    ) {
      toast({
        title: "dados invalidos",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
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
      <Text fontSize={"6xl"}>pontocerto.ic</Text>
      <Text fontSize={"2xl"}>Bem Vindo, Registre-se !</Text>

      <Box display={"flex"} flexDirection={"column"} gap={"1em"}>
        <Input
<<<<<<< Updated upstream
          placeholder="email"
          type="email"
          name="email"
          value={newUser.email}
          onChange={inputHandler}
        />
        <Input
          placeholder="confirme o email"
          type="email"
          name="confirmEmail"
          value={newUser.confirmEmail}
          onChange={inputHandler}
        />
        <Input
          placeholder="senha"
          type="password"
          name="password"
          value={newUser.password}
          onChange={inputHandler}
        />
        <Input
          placeholder="confirme a senha "
          type="password"
          name="confirmPassword"
          value={newUser.confirmPassword}
          onChange={inputHandler}
        />
        <Button
          background={"blueviolet"}
          textColor={"white"}
          onClick={registerHandler}
        >
          registrar
=======
            placeholder="nome completo"
            type="text"
            name="full_name"
            value={newUser.full_name}
            onChange={inputHandler}
            bgColor="Lavender" 
            color="blueviolet"
          />
        <Input placeholder="CPF" type="text" name="cpf" value={newUser.cpf} onChange={inputHandler} bgColor="Lavender" color="blueviolet" />
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
>>>>>>> Stashed changes
        </Button>
        <Box display={"flex"} flexDirection={"row"} gap={"1em"}>
          <Text>já tem registro ?</Text>
          <Link href={"/"}>
            <Text textColor={"blue"}>login</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
