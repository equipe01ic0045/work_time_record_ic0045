'use client';
import HeaderBox from "@/components/global/HeaderBox";
import RecordCard from "@/components/time-records/RecordCard";
import JustificationService from "@/services/JustificationService";
import TimeRecordService from "@/services/TimeRecordService";
import { DetailedTimeRecordData } from "@/types/TimeRecordData";
import { JustificationInfoManager } from "@/types/TimeRecordInfoData";
import { Box, VStack, useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { projectId: number, timeRecordId: number }
  searchParams: { justificationId: number, type: "CHECKIN" | "CHECKOUT" }
}) {
  const router = useRouter();
  const toast = useToast();

  const [justifyData, setJustifyData] = useState<DetailedTimeRecordData>({
    user_message: '',
    project_id: params.projectId,
    timestamp: new Date(),
  });

  useEffect(() => {
    const projectId = params.projectId;
    const justificationId = searchParams.justificationId;

    if (projectId && justificationId) {
      JustificationService.getJustificationData(projectId, justificationId)
        .then((data) => {
          setJustifyData((value) => ({
            ...value,
            user_message: data.user_message,
            timestamp: searchParams.type === "CHECKIN"
              ? new Date(data.time_record.check_in_timestamp)
              : new Date(data.time_record.check_out_timestamp!),
          }))
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [params.projectId, searchParams.type, searchParams.justificationId]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setJustifyData({ ...justifyData! });

    const commonData = {
      projectId: params.projectId,
      timeRecordId: params.timeRecordId,
      justificationFile: justifyData!.justification_file,
      userMessage: justifyData!.user_message,
    };

    try {
      if (searchParams.type === "CHECKOUT") {
        await TimeRecordService.updateTimeRecord({
          ...commonData,
          checkOutTimestamp: justifyData!.timestamp,
        });
      } else {
        await TimeRecordService.updateTimeRecord({
          ...commonData,
          checkInTimestamp: justifyData!.timestamp,
        });
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
            record={justifyData!}
            setRecord={setJustifyData}
            requireUserMessage
          />
        </Box>
      </form>
    </VStack>
  )
}