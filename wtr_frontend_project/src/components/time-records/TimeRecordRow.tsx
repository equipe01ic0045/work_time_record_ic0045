import {
  HStack,
  Icon,
  IconButton,
  Td,
  Text,
  Tr,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { FaRegFileLines } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";
import JustificationStatusIcon from "./JustificationStatusIcon";
import { formatDate } from "@/utils/date_utils";
import { TimeRecordInfo } from "@/types/TimeRecordInfoData";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const EditButton = ({
  router,
  timeRecordId,
  justificationId,
  isDisabled,
  type,
}: {
  timeRecordId: number;
  router: any;
  isDisabled?: boolean;
  justificationId?: number;
  type: string;
}) => {
  return (
    <IconButton
      aria-label="Editar registro"
      icon={<EditIcon boxSize="1.4rem" />}
      variant="unstyled"
      _hover={{ _disabled: {} }}
      bgColor="lavanda.300"
      color="white"
      isDisabled={isDisabled}
      onClick={(e) => {
        const justificationIdQueryString = justificationId ?
          `&justificationId=${justificationId}`
          : '';

        router.push(
          `info/${timeRecordId}/justify?type=${type}${justificationIdQueryString}`
        );
      }}
    />
  );
};
export default function TimeRecordRow({
  record,
}: {
  projectId: string;
  record: TimeRecordInfo;
}) {
  const router = useRouter();

  const checkInDate = new Date(record.check_in_timestamp);
  const checkOutDate = record.check_out_timestamp
    ? new Date(record.check_out_timestamp)
    : null;

  const duration = dayjs
    .duration(dayjs(checkOutDate || dayjs()).diff(checkInDate))
    .format("HH[h] mm[min]");

  const checkInJustification = record.time_record_justification?.find(
    (justification) => justification.justification_type === "CHECKIN"
  );
  const checkOutJustification = record.time_record_justification?.find(
    (justification) => justification.justification_type === "CHECKOUT"
  );

  return (
    <Tr background={"#F0EFFF"} borderBottom="2px" borderColor="gray.300">
      <Td>{record.time_record_id}</Td>
      <Td>
        <HStack gap={3}>
          <Text>{formatDate(checkInDate)}</Text>
          <EditButton
            router={router}
            timeRecordId={record.time_record_id}
            isDisabled={checkInJustification && checkInJustification.status !== "DENIED"}
            justificationId={checkInJustification?.justification_id}
            type="CHECKIN"
          />
          {checkInJustification && (
            <JustificationStatusIcon status={checkInJustification.status} />
          )}
        </HStack>
      </Td>
      <Td>
        {checkOutDate && (
          <HStack gap={3}>
            <Text>{formatDate(checkOutDate)}</Text>
            <EditButton
              router={router}
              timeRecordId={record.time_record_id}
              isDisabled={checkOutJustification && checkOutJustification.status !== "DENIED"}
              type="CHECKOUT"
            />
            {checkOutJustification && (
              <JustificationStatusIcon status={checkOutJustification.status} />
            )}
          </HStack>
        )}
      </Td>
      <Td>{duration}</Td>
      <Td>
        <IconButton
          aria-label="Detalhes"
          bg="lavanda.300"
          colorScheme="blackAlpha"
          icon={<Icon boxSize="1.4rem" color="white" as={FaRegFileLines} />}
          onClick={(e) => router.push(`info/${record.time_record_id}`)}
        />
      </Td>
    </Tr>
  );
}
