'use client';

import { Button, Box, Text, useToast, Card, CardBody, CardHeader, Heading, IconButton, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import DocumentRow from "./documentRow";
import { AddIcon } from "@chakra-ui/icons";
import { useRouter } from "next/navigation";
import Clock from "./Clock";
import TimeRecordData from "@/types/TimeRecordData";
import RecordDocument from "@/types/RecordDocument";
import TimeRecordService from "@/services/TimeRecordService";

export default function RecordCard(props: { projectId: number }) {
  const router = useRouter();

  const iconUser = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="150"
      viewBox="0 -960 960 960"
      width="150"
    >
      <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Z" />
    </svg>
  );
  const toast = useToast();

  const [newRecord, setRecord] = useState<TimeRecordData>({
    date: new Date(),
    documents: [],
    description: '',
    projectId: props.projectId,
  });

  const [documents, setDocuments] = useState<RecordDocument[]>([]);

  async function getLocation() {
    const coordinates = await new Promise<GeolocationCoordinates>((resolve, reject) => {

      const onSuccess = (position: GeolocationPosition) => {
        resolve(position.coords);
      };

      const onError = (error: GeolocationPositionError) => {
        toast({
          title: 'Erro ao capturar localização',
          description: "Verifique a permissão para detectar sua localização.",
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: "top-right",
        })
        reject(error);
      };

      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
      });
    });

    const { latitude, longitude } = coordinates;
    return { latitude, longitude };
  }

  async function newRecordHandler() {
    const location = await getLocation();

    const record = { ...newRecord, date: new Date(), documents, location };
    setRecord(record);

    try {
      await (new TimeRecordService()).checkIn(record);

      toast({
        title: 'Registro de horario efetuado',
        description: "Você será redirecionado para a página anterior.",
        status: 'success',
        duration: 1500,
        isClosable: true,
        position: "top-right",
        onCloseComplete: () => router.back()
      });
    } catch (e) {
      toast({
        title: 'Erro ao efetuar registro de horario.',
        description: e instanceof Error
          ? e.message
          : "Verifique os dados preenchidos e tente novamente.",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

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

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"50%"}
      height={"50%"}
      minW="300px"
      // background={"blueviolet"}
      borderRadius={"1em"}
      gap={"2em"}
    >
      {iconUser}
      <Clock />
      <Button
        onClick={newRecordHandler}
        minHeight={"50px"}
        background={"blueviolet"}
        color={"white"}
      >
        Efetuar registro de Tempo
      </Button>
      <Text fontSize={"md"}>
        {newRecord.date.toLocaleDateString()}
      </Text>

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
              onInputChange={onSelectFileOnIndex(index)}
            />
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
            value={newRecord.description}
            onChange={(e) => setRecord({ ...newRecord, description: e.target.value })}
          />
        </CardBody>
      </Card>
    </Box>
  );
}