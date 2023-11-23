"use client";
import { Icon, IconButton } from "@chakra-ui/react";
import { FiFileText } from "react-icons/fi";
import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Link from "next/link";
import { JustificationInfoManager, statusLangMapping } from "@/types/TimeRecordInfoData";

function JustificationRow({
  justificationData,
}: {
  justificationData: JustificationInfoManager;
}) {
  return (
    <Tr
      key={justificationData.justification_id}
      borderBottom="2px"
      borderColor="gray.300"
    >
      <Td>{justificationData.justification_id}</Td>
      <Td>{justificationData.user.full_name}</Td>
      <Td>{justificationData.justification_type}</Td>

      {justificationData.time_record.check_in_timestamp ? (
        <Td>{justificationData.time_record.check_in_timestamp}</Td>
      ) : (
        <Td>--</Td>
      )}

      {justificationData.time_record.check_out_timestamp ? (
        <Td>{justificationData.time_record.check_out_timestamp}</Td>
      ) : (
        <Td>--</Td>
      )}

      <Td>{justificationData.user_message}</Td>
      <Td>
        {justificationData.justification_document?.justification_id
          ? "Sim"
          : "Não"}
      </Td>

      <Td>{statusLangMapping[justificationData.status]}</Td>

      <Td>
        <Link href={`justifications/${justificationData.justification_id}`}>
          <IconButton
            aria-label="Ver registros"
            icon={<Icon boxSize="2em" as={FiFileText} />}
            p={3}
          />
        </Link>
      </Td>
    </Tr>
  );
}

export default function JustificationListTable({
  justificationsList,
}: {
  justificationsList: JustificationInfoManager[];
}) {
  return (
    <TableContainer width={"100%"}>
      <Table variant="simple" background={"#F0EFFF"}>
        <Thead bg={"#4D47C3"}>
          <Tr>
            <Th textColor={"white"}>ID</Th>
            <Th textColor={"white"}>USUARIO</Th>
            <Th textColor={"white"}>TIPO JUSTIFICATIVA</Th>
            <Th textColor={"white"}>CHECKIN</Th>
            <Th textColor={"white"}>CHECKOUT</Th>
            <Th textColor={"white"}>MENSAGEM</Th>
            <Th textColor={"white"}>DOCUMENTO</Th>
            <Th textColor={"white"}>STATUS</Th>
            <Th textColor={"white"}>REVISAR</Th>
          </Tr>
        </Thead>
        <Tbody>
          {justificationsList.map((justificationData, i) => {
            return (
              <JustificationRow key={i} justificationData={justificationData} />
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
