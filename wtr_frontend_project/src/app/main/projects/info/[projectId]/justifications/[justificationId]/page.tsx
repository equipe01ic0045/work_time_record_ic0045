"use client";
import HeaderBox from "@/components/global/HeaderBox";
import JustificationService from "@/services/JustificationService";
import { JustificationInfoManager } from "@/types/TimeRecordInfoData";
import { DownloadIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
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

  useEffect(() => {
    JustificationService.getJustificationData(
      Number(params.projectId),
      Number(params.justificationId)
    ).then((justificationData) => {
      setJustification(justificationData);
    });
  }, []);

  function submitReview() {
    JustificationService.sendReviewData(
      Number(params.projectId),
      Number(params.justificationId),
      { status: reviewStatus, reviewer_message: reviewerMessage }
    );
    router.push(`/main/projects/info/${params.projectId}/justifications`)
  }

  return (
    <Box width={"100%"}>
      <HeaderBox title={`Justificativa ${params.justificationId}`} />

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
                  <Text>nome: {justification?.user.full_name}</Text>
                  <Text>cpf: {justification?.user.cpf}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Tipo de Justificativa</Text>
                  <Text>{justification?.justification_type}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Registro</Text>
                  <Text>
                    checkin: {justification?.time_record.check_in_timestamp}
                  </Text>
                  <Text>
                    checkout: {justification?.time_record.check_out_timestamp}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Status</Text>
                  <Text>{justification?.status}</Text>
                </Box>
              </SimpleGrid>
              <Box marginTop={20} w="100%">
                <Text fontWeight="bold">Mensagem de Justificativa</Text>
                <Text>{justification?.user_message}</Text>
              </Box>
            </CardBody>
            <CardFooter>
              <VStack>
                <Tooltip isDisabled={true} label="Nenhum documento fornecido">
                  <Button
                    isDisabled={true}
                    colorScheme="gray"
                    rightIcon={<DownloadIcon />}
                    // onClick={downloadDocument}
                  >
                    Baixar documento
                  </Button>
                </Tooltip>
                <Text>criado em: {justification?.created_at}</Text>
              </VStack>
            </CardFooter>
          </Card>
        </Box>

        <Box w="100%">
          <Card backgroundColor="#e3a300">
            <CardHeader>
              <Text fontWeight="bold" marginBottom={4} fontSize={20}>
                Revisar Justificativa
              </Text>

              <Select
                placeholder="Aprovar/Rejeitar"
                size="lg"
                bg="white"
                value={reviewStatus}
                onChange={(e) => setReviewStatus(e.target.value)}
              >
                <option value="APPROVED">Aprovar</option>
                <option value="DENIED">Rejeitar</option>
              </Select>
            </CardHeader>
            <CardBody>
              <Text fontWeight="bold" marginBottom={4}>
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
                colorScheme="black"
                backgroundColor={"black"}
                onClick={submitReview}
              >
                Enviar
              </Button>
            </CardFooter>
          </Card>
        </Box>
      </HStack>
    </Box>
  );
}
