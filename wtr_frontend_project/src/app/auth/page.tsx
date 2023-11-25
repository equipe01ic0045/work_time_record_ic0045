"use client";
import UserService from "@/services/UserService";
import {
  Box,
  Button,
  Text,
  Input,
  useToast,
  InputGroup,
  InputRightAddon
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  ViewIcon,
  ViewOffIcon
} from "@chakra-ui/icons";
import { useAuth } from "@/components/auth/AuthContext";
import UserLogin from "@/types/UserLogin";

export default function LoginComponent() {
  const { login } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [user, setUser] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const userService = new UserService();

  function inputHandler(event: any) {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  }

  function showPasswordHandler() {
    setShowPassword(!showPassword)
  }

  async function loginHandler() {
    try {
      await userService.loginUser(user)
      login()
      router.push("/main/projects");
    }
    catch {
      toast({
        title: "Login Invalido",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap="0.5em"
      p="0.5em"
      w="100%"
    >
      <Text fontSize="6xl" color="blueviolet">
        Ponto Certo
      </Text>
      <Box 
      display="flex" 
      flexDirection="column"
      gap='0.5em'
      >
        <Input
          placeholder="usuario@mail.com"
          type="email"
          name="email"
          value={user.email}
          onChange={inputHandler}
          bgColor="Lavender"
          color="blueviolet"
          mt="1em"
        />
        <InputGroup>
          <Input
            placeholder="123abc"
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
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
          bg="blueviolet"
          color="white"
          onClick={loginHandler}
          w="100%"
          mt="1em"
        >
          Entrar
        </Button>
        <Box
          display="flex"
          flexDirection="column"
          gap="0.5em"
          alignItems="center"
          mt="1em"
        >
          <Box display="flex" flexDirection="row" gap="1em">
            <Text fontSize="sm">Não é registrado ?</Text>
            <Link href="auth/register">
              <Text fontSize="sm" color="blue">
                Registre-se
              </Text>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
