"use client";

import HeaderBox from "@/components/global/HeaderBox";
import {
  Box,
  Link,
  Button,
  FormLabel,
  Input,
  InputGroup,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import UserService from "@/services/UserService";
import { EditIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { User } from "@/types/User";

type k = keyof User;
export type UserUpdateError = {
  [key in k]: string;
};

export default function UserUpdate({ params }: any) {
  const userService = new UserService();
  const toast = useToast();

  const [user, setUser] = useState<User>();
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<UserUpdateError>({
    user_id: "",
    cpf: "",
    email: "",
    full_name: "",
    created_at: "",
    updated_at: "",
    password: "",
  });

  async function updateUserHandler(
    projectInfo: User
  ): Promise<UserUpdateError> {
    const erros: UserUpdateError = {
      user_id: "",
      cpf: "",
      email: "",
      full_name: "",
      created_at: "",
      updated_at: "",
      password: "",
    };
    try {
      await userService.updateUser(projectInfo);
      toast({
        title: "Dados Atualizados",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
      return erros;
    } catch (error: any) {
      toast({
        title: "Falha ao Atualizar Dados",
        description: "",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });

      const data = error?.response?.data;
      const fieldErrors = data?.data?.errors;
      if (fieldErrors)
        fieldErrors.forEach(
          (error: any) => (erros[error.path as keyof typeof erros] = error.msg)
        );
      if (data?.message) {
        const msg = data.message;
        const split = msg.split("Unique constraint failed on the fields: (`");
        if (split.length > 1) {
          erros[split[1].split("`")[0] as keyof typeof erros] =
            "Já existe um usuário com estes dados.";
        }
      }
      return erros;
    }
  }

  useEffect(() => {
    UserService.getUser(params.profileId).then((user) => {
      setUser(user);
    });
  }, []);

  const keys: [keyof User, string][] = [
    ["full_name", "Nome Completo"],
    ["email", "E-mail"],
    ["cpf", "CPF"],
  ];

  return (
    <Box display={"flex"} flexDirection={"column"} width={"100%"}>
      <HeaderBox
        title={
          <>
            <Link href={`/main/projects`}>Perfil</Link> / {params.profileId} /
            Info
          </>
        }
      />
      <Box padding={"1em"}>
        {user ? (
          <Box display="flex" flexDirection="column" gap="1em" padding="1em">
            {keys.map(([key, label], i) => (
              <FormControl key={i} isInvalid={errors[key] ? true : false}>
                <InputGroup display="flex" flexDirection="column" gap="0.5em">
                  <FormLabel key="0">{label}</FormLabel>
                  <Input
                    placeholder={label}
                    type="text"
                    name={key}
                    bgColor="Lavender"
                    color="blueviolet"
                    value={user[key]}
                    onChange={(ev) =>
                      setUser({ ...user, [key]: ev.target.value })
                    }
                  />
                </InputGroup>
                <FormErrorMessage>{errors[key]}</FormErrorMessage>
              </FormControl>
            ))}

            <FormControl isInvalid={errors["password"] ? true : false}>
              <InputGroup display="flex" flexDirection="column" gap="0.5em">
                <FormLabel key="0">{"Senha (Opcional)"}</FormLabel>
                <Box position="relative">
                  <Input
                    placeholder="Senha"
                    type={showPassword ? "text" : "password"}
                    name={"password"}
                    bgColor="Lavender"
                    color="blueviolet"
                    value={user["password"]}
                    autoComplete="one-time-code"
                    onChange={(ev) =>
                      setUser({ ...user, ["password"]: ev.target.value })
                    }
                  />
                  <Box
                    position="absolute"
                    right="10px"
                    top="50%"
                    transform="translateY(-50%)"
                    zIndex={"999999"}
                    cursor="pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Box>
                </Box>
              </InputGroup>
              <FormErrorMessage>{errors["password"]}</FormErrorMessage>
            </FormControl>

            <Button
              leftIcon={<EditIcon />}
              colorScheme="orange"
              onClick={async () => {
                setErrors(await updateUserHandler(user));
              }}
            >
              {" "}
              Editar Usuário
            </Button>
          </Box>
        ) : (
          "Loading..."
        )}
      </Box>
    </Box>
  );
}
