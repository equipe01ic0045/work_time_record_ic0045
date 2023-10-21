'use client';
import HeaderBox from "@/components/global/HeaderBox";
import RecordCard from "@/components/time-records/RecordCard";
import TimeRecordService from "@/services/TimeRecordService";
import { Justification } from "@/types/TimeRecordData";
import { Box, VStack, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { projectId: number, timeRecordId: number }
  searchParams: { type: 'check-in' | 'check-out', datetime: string }
}) {
  const router = useRouter();
  const toast = useToast();

  const [justifyData, setJustifyData] = useState<Justification>({
    description: '',
    document: null,
    date: new Date(searchParams.datetime),
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const timeRecordService = new TimeRecordService();

    setJustifyData({ ...justifyData, date: new Date() });

    try {
      if (searchParams.type === 'check-out') {
        // TODO: add checkout justification
        throw new Error('Check-out justification not implemented yet.');
      } else {
        // TODO: add checkin justification
        throw new Error('Check-in justification not implemented yet.');
      }

      toast({
        title: 'Justificativa de horario efetuada',
        description: "Você será redirecionado para a página anterior.",
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: "top-right",
        onCloseComplete: () => {
          router.back();
        }
      });
    } catch (e) {
      toast({
        title: 'Erro ao efetuar registro de horario.',
        description: e instanceof AxiosError && e?.response?.data.message
          ? e.response.data.message
          : "Verifique os dados preenchidos e tente novamente.",
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: "top-right",
      })
    }
  }

  return (
    <VStack w={"100%"} spacing="3rem">
      <HeaderBox
        title={`Justificativa / Projeto ${params.projectId} / Registro ${params.timeRecordId}`}
      />

      <form onSubmit={onSubmit}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          width="lg"
          gap={"2em"}
        >
          <RecordCard
            record={justifyData}
            setRecord={setJustifyData}
            projectId={params.projectId}
            requireDescription
          />
        </Box>
      </form>
    </VStack>
  )
}