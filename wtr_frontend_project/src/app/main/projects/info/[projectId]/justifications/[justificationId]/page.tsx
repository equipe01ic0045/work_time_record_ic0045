"use client";
import HeaderBox from "@/components/global/HeaderBox";
import JustificationService from "@/services/JustificationService";
import {
  JustificationInfoManager,
  statusLangMapping,
} from "@/types/TimeRecordInfoData";
import { clockDate, formatDate } from "@/utils/date_utils";
import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  HStack,
  Heading,
  Input,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function JustificationInfoManagerPage() {
  const params = useParams();
  const router = useRouter();

  const [justification, setJustification] =
    useState<JustificationInfoManager>();

  const [reviewStatus, setReviewStatus] = useState("");
  const [reviewerMessage, setReviewerMessage] = useState<string>("");
  const [reviewerNewTimeStamp, setReviewerNewTimeStamp] = useState<Date>();
  const [documentBlob, setdocumentBlob] = useState<Blob | null>();

  useEffect(() => {
    JustificationService.getJustificationData(
      Number(params.projectId),
      Number(params.justificationId)
    )
      .then((justificationData) => {
        setJustification(justificationData);
        setReviewerNewTimeStamp(
          justificationData.justification_type == "CHECKIN"
            ? justificationData.time_record.check_in_timestamp
            : justificationData.time_record.check_out_timestamp
        );
        try {
          if (justificationData.justification_document.justification_id) {
            const document = JustificationService.getDocument(
              justificationData.project_id,
              justificationData.justification_id
            );
            return document;
          }
          return null;
        } catch (error) {
          console.error("Error fetching document:", error);
        }
      })
      .then((blob) => {
        setdocumentBlob(blob);
      });
  }, []);

  function downloadDocument() {
    if (documentBlob) {
      const fileName = `documento_registro_${justification?.time_record_id}_justificativa_${justification?.justification_id}.pdf`;

      const url = URL.createObjectURL(documentBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  function submitReview() {
    JustificationService.sendReviewData(
      Number(params.projectId),
      Number(params.justificationId),
      {
        status: reviewStatus,
        reviewer_message: reviewerMessage,
        new_timestamp: reviewerNewTimeStamp,
      }
    );
    router.push(`/main/projects/info/${params.projectId}/justifications`);
  }

  return (
    <Box width={"100%"}>
      <HeaderBox title={`Justificativas / ${params.justificationId}`} />

      <HStack margin={10}>
        <Box w="100%">
          <Heading mb={3} color="lavanda.300">
            Informações
          </Heading>
          <Card>
            <CardBody>
              <SimpleGrid columns={3} spacing={3}>
                <Box>
                  <Text fontWeight="bold">ID da Justificativa</Text>
                  <Text>{justification?.justification_id}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">ID do Registro</Text>
                  <Text>{justification?.time_record_id}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Usuario</Text>
                  <Text>Nome: {justification?.user.full_name}</Text>
                  <Text>Email: {justification?.user.email}</Text>
                  <Text>CPF: {justification?.user.cpf}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Tipo de Justificativa</Text>
                  <Text>{justification?.justification_type}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Registro</Text>
                  <Text>
                    Check-in:{" "}
                    {formatDate(justification?.time_record.check_in_timestamp)}
                  </Text>
                  <Text>
                    Check-out:{" "}
                    {formatDate(justification?.time_record.check_out_timestamp)}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Status</Text>
                  <Text>
                    {justification
                      ? statusLangMapping[justification?.status]
                      : ""}
                  </Text>
                </Box>
              </SimpleGrid>

              <Box marginTop={20} w="100%">
                <Text fontWeight="bold">Mensagem de Justificativa</Text>
                <Text>{justification?.user_message}</Text>
              </Box>

              {justification?.status !== "PENDING" ? (
                <Box marginTop={10}>
                  <Divider marginBottom={5} />
                  <Box>
                    <Text fontWeight="bold">Revisado por</Text>
                    <Text>{justification?.reviewer.full_name}</Text>
                    <Text>Email: {justification?.reviewer.email}</Text>
                    <Text>CPF: {justification?.reviewer.cpf}</Text>
                  </Box>
                  <Box marginTop={5} w="100%">
                    <Text fontWeight="bold">Mensagem do Revisor</Text>
                    <Text>{justification?.reviewer_message}</Text>
                  </Box>
                </Box>
              ) : null}
            </CardBody>
            <CardFooter>
              <VStack>
                <Tooltip
                  isDisabled={!!documentBlob}
                  label="Nenhum documento fornecido"
                >
                  <Button
                    isDisabled={!documentBlob}
                    colorScheme="gray"
                    rightIcon={<DownloadIcon />}
                    onClick={downloadDocument}
                  >
                    Baixar documento
                  </Button>
                </Tooltip>
                <Text>criado em: {formatDate(justification?.created_at)}</Text>
              </VStack>
            </CardFooter>
          </Card>
        </Box>

        {justification?.status == "PENDING" ? (
          <Box w="100%">
            <Card backgroundColor="#4D47C3">
              <CardHeader>
                <Text 
                fontWeight="bold" 
                marginBottom={4} 
                fontSize={20}
                textColor={"white"}
                >
                  Revisar Justificativa
                </Text>
                <HStack>
                  <Box>
                    <Text textColor={"white"} fontWeight="bold">Status</Text>
                    <Select
                      width={200}
                      placeholder="Aprovar/Rejeitar"
                      size="lg"
                      bg="white"
                      value={reviewStatus}
                      onChange={(e) => setReviewStatus(e.target.value)}
                    >
                      <option value="APPROVED">Aprovar</option>
                      <option value="DENIED">Rejeitar</option>
                    </Select>
                  </Box>

                  {reviewStatus == "DENIED" ? (
                    <Box>
                      <Text fontWeight="bold">
                        Correção do horário registrado
                      </Text>
                      <Input
                        placeholder="Select Date and Time"
                        size="lg"
                        variant="filled"
                        bg="white"
                        type="datetime-local"
                        value={clockDate(reviewerNewTimeStamp)}
                        onChange={(e) =>
                          setReviewerNewTimeStamp(new Date(e.target.value))
                        }
                      />
                    </Box>
                  ) : null}
                </HStack>
              </CardHeader>
              <CardBody>
                <Text textColor={"white"} fontWeight="bold" marginBottom={4}>
                  Mensagem
                </Text>
                <Textarea
                  aria-labelledby="reviewer message"
                  variant="filled"
                  bg="white"
                  _hover={{ bg: "white" }}
                  minHeight={100}
                  value={reviewerMessage}
                  onChange={(e) => setReviewerMessage(e.target.value)}
                />
              </CardBody>
              <CardFooter>
                <Button
                  colorScheme="gray"
                  onClick={submitReview}
                >
                  Enviar
                </Button>
              </CardFooter>
            </Card>
          </Box>
        ) : null}
      </HStack>
    </Box>
  );
}
