"use client";
import React from "react";
import UserService from "@/services/UserService";

import {
    Box,
    Button,
    Text,
    Input,
    useToast,
    FormLabel,
    InputGroup,
    InputRightElement
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

export default function PasswordRecoveryPage() {

    const toast = useToast();
    const [cpf, setCpf] = useState('')

    function inputHandler(event: any) {
        const { value } = event.target
        setCpf(value)
    }

    function passwordRecoveryHandler() {
        if (cpf.length === 11) {
            toast({
                title: "Email enviado",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            setCpf('')
            return
        }
        if (cpf.length < 11 || cpf.length > 11) {
            toast({
                title: "CPF precisa conter 11 caracteres",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return
        }
        else {
            toast({
                title: "Erro",
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="start"
            gap="0.5em" p="0.5em" w="100%">
            <Text fontSize="6xl" color="blueviolet">
                Ponto Certo
            </Text>

            <Box display="flex" flexDirection="column" gap="0.5em" alignItems="center">
                <Text fontSize="2xl" color="blueviolet">
                    Recupere a Senha
                </Text>
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                gap="1em"
                width='25%'
            >
                <Text fontSize="sm">
                    Digite o seu <b>CPF</b>, Será enviado um link para o email registrado caso sua conta exista. Siga os passos informados
                </Text>
                <InputGroup
                    display='flex'
                    flexDirection='column'
                    gap='0.5em'
                >
                    <FormLabel>CPF</FormLabel>
                    <Input
                        placeholder="CPF"
                        type="number"
                        name="cpf"
                        value={cpf}
                        onChange={inputHandler}
                        bgColor="Lavender"
                        color="blueviolet"
                    />
                </InputGroup>
                <Button
                    mt={4}
                    colorScheme='blue'
                    isLoading={false}
                    type='submit'
                    onClick={passwordRecoveryHandler}
                >
                    Recuperar Senhar
                </Button>
                <Link href={"/auth"}>
                    Já possui uma conta e lembra da senha ? volte para
                    <Text fontSize="sm" textColor='blue'>
                        Login
                    </Text>
                </Link>
            </Box>
        </Box>
    );
}