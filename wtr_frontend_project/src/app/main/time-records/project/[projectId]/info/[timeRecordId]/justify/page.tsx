'use client';

import HeaderBox from "@/components/global/HeaderBox";
import DocumentRow from "@/components/time-records/documentRow";
import RecordDocument from "@/types/RecordDocument";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, CardHeader, Divider, FormControl, FormHelperText, FormLabel, HStack, Heading, Icon, IconButton, Input, InputGroup, InputRightAddon, Stack, StackDivider, Text, Textarea, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Page({ params }: { params: { timeRecordId: string } }) {
  const [description, setDescription] = useState<string>('');
  const [document, setDocument] = useState<File | null>();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const toast = useToast();

  async function handleSubmit(): Promise<void> {
    toast({
      title: "Justificativa enviada",
      description: "Sua justificativa foi enviada com sucesso!",
      duration: 2000,
      status: "success",
      isClosable: true,
      position: "top-right",
      onCloseComplete: () => router.back(),
    })
  }

  return (
    <Box w="100%">
      <HeaderBox title={`Registro de ponto ${params.timeRecordId}`} />
      <Box mx="auto" mt={20} w="40%">

        <Card marginY={5} variant={"filled"} size="lg">
          <CardHeader>
            <HStack gap={3}>
              <EditIcon boxSize="3rem" />
              <Heading as="h2" size="lg">
                Envio de justificativa
              </Heading>
            </HStack>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing='8'>
              <FormControl>
                <FormLabel>Descrição</FormLabel>
                <Textarea
                  aria-labelledby="description"
                  variant="filled"
                  bg="white"
                  _hover={{ bg: "white" }}
                  minHeight={100}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <FormHelperText>Insira todos os detalhes cabíveis para sua justificativa.</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Selecione o arquivo</FormLabel>
                <ButtonGroup w="100%" isAttached variant='outline' onClick={e => fileInputRef.current?.click()}>
                  <Button w='100%'>{document?.name}</Button>
                  <IconButton aria-label='Add to friends' icon={<AddIcon />} />
                </ButtonGroup>
                <Input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  onChange={e => setDocument(e.target.files && e.target.files[0])}
                />
                <FormHelperText>
                  Se necessário mais de um arquivo/documento,
                  utilize ferramentas para junção destes arquivos em um só.
                </FormHelperText>
              </FormControl>
            </Stack>
          </CardBody>
        </Card>

        <Box textAlign="center" w="100%">
          <Button bg="blueviolet" color="white" colorScheme="blackAlpha" size="lg" onClick={handleSubmit}>
            Enviar justificativa
          </Button>
        </Box>
      </Box>
    </Box>
  )
}