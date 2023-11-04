import { Icon, IconButton, Td, Tr } from "@chakra-ui/react";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import TimeRecord from "@/types/TimeRecord";
import { FaRegFileLines } from "react-icons/fa6";
import { useRouter } from "next/navigation";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function TimeRecordRow({
  record
}: {
  projectId: string, record: TimeRecord
}) {
  const router = useRouter();

  const checkInDate = new Date(record.check_in_timestamp);
  const checkOutDate = record.check_out_timestamp
    ? new Date(record.check_out_timestamp)
    : null;

  const duration = dayjs(checkInDate).locale('pt-br').to(checkOutDate, true);

  return (
    <Tr>
      <Td>{checkInDate.toLocaleString()}</Td>
      <Td>{checkOutDate?.toLocaleString()}</Td>
      <Td>{'--'}</Td>
      <Td>
        <IconButton
          isDisabled
          size={"lg"}
          mr={3}
          aria-label="Download"
          bg="#4D47C3"
          colorScheme="blackAlpha"
          icon={<Icon boxSize="1.5rem" color="white" as={FaRegFileLines} />}
          onClick={(e) => router.push(`info/${record.time_record_id}/justify`)}
        />
        {0}
      </Td>
    </Tr>
  );
}