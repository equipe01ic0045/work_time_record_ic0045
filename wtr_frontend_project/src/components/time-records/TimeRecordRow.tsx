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
import TimeRecord from "@/types/TimeRecord";
import { FaRegFileLines } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";
import JustificationStatusIcon from "./JustificationStatusIcon";
import { formatDate } from "@/utils/date_utils";

dayjs.extend(duration);
dayjs.extend(relativeTime);

const EditButton = ({
  router,
  timeRecordId,
  type,
  datetime,
  isDisabled,
}: {
  timeRecordId: number;
  router: any;
  type: string;
  datetime: string;
  isDisabled?: boolean;
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
        router.push(
          `info/${timeRecordId}/justify?type=${type}&datetime=${datetime}`
        );
      }}
    />
  );
};
export default function TimeRecordRow({
  record,
}: {
  projectId: string;
  record: TimeRecord;
}) {
  const router = useRouter();

  const checkInDate = new Date(record.check_in_timestamp);
  const checkOutDate = record.check_out_timestamp
    ? new Date(record.check_out_timestamp)
    : null;

  const duration = dayjs
    .duration(dayjs(checkOutDate || dayjs()).diff(checkInDate))
    .format("HH[h] mm[min]");

  const checkInJustification = record.justifications?.find(
    (justification) => justification.type === "check-in"
  );
  const checkOutJustification = record.justifications?.find(
    (justification) => justification.type === "check-out"
  );

  return (
    <Tr background={"#F0EFFF"} borderBottom="2px" borderColor="gray.300">
      <Td>{record.time_record_id}</Td>
      <Td>
        <HStack gap={3}>
          <Text>{formatDate(checkInDate)}</Text>
          <EditButton
            datetime={record.check_in_timestamp}
            type="check-in"
            router={router}
            timeRecordId={record.time_record_id}
            isDisabled={checkInJustification?.status === "pending"}
          />
          {checkInJustification && (
            <JustificationStatusIcon justification={checkInJustification} />
          )}
        </HStack>
      </Td>
      <Td>
        {checkOutDate && (
          <HStack gap={3}>
            <Text>{formatDate(checkOutDate)}</Text>
            <EditButton
              datetime={record.check_out_timestamp!}
              type="check-out"
              router={router}
              timeRecordId={record.time_record_id}
              isDisabled={checkOutJustification?.status === "pending"}
            />
            {checkOutJustification && (
              <JustificationStatusIcon justification={checkOutJustification} />
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
