'use client';
import HeaderBox from "@/components/global/HeaderBox";
import JustifyCard, { JustifyData } from "@/components/time-records/JustifyCard";
import RecordCard from "@/components/time-records/RecordCard";
import TimeRecordService from "@/services/TimeRecordService";
import TimeRecordData from "@/types/TimeRecordData";
import { Box, Button, VStack, useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { projectId: number }
  searchParams: { hasOpenRecord: boolean }
}) {
  const router = useRouter();
  const toast = useToast();

  const [showJustifyCard, setShowJustifyCard] = useState(false);
  const [newRecord, setRecord] = useState<TimeRecordData>({
    date: new Date(),
    description: '',
    projectId: params.projectId,
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

  async function newRecordHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timeRecordService = new TimeRecordService();

    const location = 'Salvador, Bahia';

    const record = { ...newRecord, location };
    setRecord(record);

    try {
      if (searchParams.hasOpenRecord) {
        await timeRecordService.checkOut(record);
      } else {
        await timeRecordService.checkIn(record);
      }

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
      console.warn(e);
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

  const onDateChange = () => setShowJustifyCard(true);

  const setJustifyData = (data: JustifyData) => {
    setRecord({
      ...newRecord,
      description: data.description,
      document: data.document,
    });
  };

  return (
    <VStack w={"100%"} spacing="3rem">
      <HeaderBox title={`Registro / nome projeto`} />

      <form onSubmit={newRecordHandler}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width="lg"
          gap={"2em"}
        >
          <RecordCard projectId={params.projectId} onDateChange={onDateChange} />

          {showJustifyCard
            && <JustifyCard onJustify={setJustifyData} />}

          <Button
            type="submit"
            minHeight={"50px"}
            background={"blueviolet"}
            color={"white"}
            colorScheme="blackAlpha"
            mb={"2em"}
          >
            Efetuar {searchParams.hasOpenRecord ? 'Check-out' : 'Check-in'}
          </Button>
        </Box>
      </form>
    </VStack>
  )
}