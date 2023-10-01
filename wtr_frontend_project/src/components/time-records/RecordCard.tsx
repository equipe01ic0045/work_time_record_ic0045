'use client';

import { Button, Box, Text, useToast, Card } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Clock from "./Clock";
import TimeRecordData from "@/types/TimeRecordData";
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

    const record = { ...newRecord, date: new Date(), location };
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

  return (
    <Card
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      borderRadius={"1em"}
      padding={20}
      margin={10}
      gap={"2em"}
      variant={"filled"}
    >
      {iconUser}
      <Text fontSize={"md"}>
        {newRecord.date.toLocaleDateString()}
      </Text>
      <Clock />
      <Button
        onClick={newRecordHandler}
        minHeight={"50px"}
        background={"blueviolet"}
        color={"white"}
        colorScheme="blackAlpha"
      >
        Efetuar registro de Tempo
      </Button>
    </Card>
  );
}