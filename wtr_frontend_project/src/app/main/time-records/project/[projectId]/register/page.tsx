"use client";
import HeaderBox from "@/components/global/HeaderBox";
import RecordCard from "@/components/time-records/RecordCard";
import TimeRecordService from "@/services/TimeRecordService";
import TimeRecordData, { Justification } from "@/types/TimeRecordData";
import { Box, Link, VStack, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { projectId: number };
  searchParams: { hasOpenCheckIn: boolean };
}) {
  const router = useRouter();
  const toast = useToast();

  const [newRecord, setRecord] = useState<Justification>({});

  // async function getLocation() {
  //   const coordinates = await new Promise<GeolocationCoordinates>(
  //     (resolve, reject) => {
  //       const onSuccess = (position: GeolocationPosition) => {
  //         resolve(position.coords);
  //       };

  //       const onError = (error: GeolocationPositionError) => {
  //         toast({
  //           title: "Erro ao capturar localização",
  //           description: "Verifique a permissão para detectar sua localização.",
  //           status: "error",
  //           duration: 3000,
  //           isClosable: true,
  //           position: "top-right",
  //         });
  //         reject(error);
  //       };

  //       navigator.geolocation.getCurrentPosition(onSuccess, onError, {
  //         enableHighAccuracy: true,
  //       });
  //     }
  //   );

  //   const { latitude, longitude } = coordinates;
  //   return { latitude, longitude };
  // }

  async function newRecordHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timeRecordService = new TimeRecordService();

    const location = "Salvador, Bahia";

    const timeRecordData: TimeRecordData = {
      timestamp: new Date(),
      projectId: params.projectId,
      location,
    };

    try {
      if (searchParams.hasOpenCheckIn) {
        await timeRecordService.checkOut(timeRecordData);
      } else {
        await timeRecordService.checkIn(timeRecordData);
      }

      toast({
        title: "Registro de horario efetuado",
        description: "Você será redirecionado para a página anterior.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
        onCloseComplete: () => {
          router.back();
        },
      });
    } catch (e) {
      toast({
        title: "Erro ao efetuar registro de horario.",
        description:
          e instanceof AxiosError && e?.response?.data.message
            ? e.response.data.message
            : "Verifique os dados preenchidos e tente novamente.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }

  return (
    <VStack w={"100%"} spacing="3rem">
      <HeaderBox
        title={
          <>
            <Link href={`/main/time-records`}>Registros</Link> / Projeto{" "}
            {params.projectId.toString()}
          </>
        }
      />

      <form onSubmit={newRecordHandler}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width="lg"
          gap={"2em"}
        >
          <RecordCard
            record={newRecord}
            setRecord={setRecord}
            projectId={params.projectId}
          />
        </Box>
      </form>
    </VStack>
  );
}
