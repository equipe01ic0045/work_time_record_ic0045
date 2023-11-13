"use client";
import HeaderBox from "@/components/global/HeaderBox";
import RecordCard from "@/components/time-records/RecordCard";
import TimeRecordService from "@/services/TimeRecordService";
import { DetailedTimeRecordData } from "@/types/TimeRecordData";
import { Box, Link, VStack, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function DetailedTimeRecordRegisterPage({
  params,
  searchParams,
}: {
  params: { projectId: number };
  searchParams: { hasOpenCheckIn: boolean };
}) {
  const router = useRouter();
  const toast = useToast();

  const [newRecord, setRecord] = useState<DetailedTimeRecordData>({
    project_id: params.projectId,
    timestamp: new Date(),
    location: undefined,
    user_message: "",
    justification_file: undefined,
  });

  async function newRecordHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timeRecordService = new TimeRecordService();

    try {
      if (searchParams.hasOpenCheckIn) {
        await timeRecordService.detailedCheckOut(newRecord);
      } else {
        await timeRecordService.detailedCheckIn(newRecord);
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
          />
        </Box>
      </form>
    </VStack>
  );
}
