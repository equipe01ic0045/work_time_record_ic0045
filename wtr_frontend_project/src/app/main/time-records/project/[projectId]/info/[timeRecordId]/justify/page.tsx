'use client';

import HeaderBox from "@/components/global/HeaderBox";
import DocumentRow from "@/components/time-records/documentRow";
import RecordDocument from "@/types/RecordDocument";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import { Box, Button, Card, CardBody, CardHeader, HStack, Heading, Icon, IconButton, Text, Textarea, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }: { params: { timeRecordId: string } }) {
  const [description, setDescription] = useState<string>('');
  const [documents, setDocuments] = useState<RecordDocument[]>([]);

  const router = useRouter();
  const toast = useToast();

  function onSelectFileOnIndex(index: number) {
    return (data: RecordDocument) => {
      documents[index] = data;
      setDocuments(
        documents.map((doc, i) => i === index ? data : doc)
      );
    }
  }

  function removeDocumentRow(index: number) {
    return () => {
      const cloned = [...documents];
      cloned.splice(index, 1);
      setDocuments(cloned);
    }
  }

  function addDocument() {
    setDocuments([...documents, { file: null, description: '' }]);
  }

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
        <HStack mb={10} gap={3}>
          <EditIcon boxSize="3rem" />
          <Heading as="h2" size="xl">
            Envio de justificativa
          </Heading>
        </HStack>

        <Card marginY={5} variant={"filled"} w="100%">
          <CardHeader display="flex" justifyContent={"space-between"}>
            <Heading as="h2" size={"lg"}>Lista de Documentos</Heading>
            <IconButton bg={"white"} aria-label="Adicionar" icon={<AddIcon />} onClick={addDocument} />
          </CardHeader>
          <CardBody>
            {documents.map((row, index) => (
              <DocumentRow
                description={row.description}
                file={row.file}
                handleRemove={removeDocumentRow(index)}
                key={index}
                onInputChange={onSelectFileOnIndex(index)} />
            ))}
          </CardBody>
        </Card>

        <Card marginY={5} variant={"filled"} w="100%">
          <CardHeader>
            <Heading aria-label="description" as="h2" size={"lg"}>Descrição</Heading>
          </CardHeader>
          <CardBody>
            <Textarea
              aria-labelledby="description"
              variant="filled"
              bg="white"
              _hover={{ bg: "white" }}
              minHeight={100}
              value={description}
              onChange={(e) => setDescription(e.target.value)} />
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