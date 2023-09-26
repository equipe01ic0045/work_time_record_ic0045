import { Td, Tr } from "@chakra-ui/react";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import { TimeRecord } from "@/providers/timeRecordsProvider";

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function TimeRecordRow({ record }: { record: TimeRecord }) {
  const checkInDate = new Date(record.check_in_timestamp);
  const checkOutDate = new Date(record.check_out_timestamp);

  const duration = dayjs(checkInDate).locale('pt-br').to(checkOutDate, true);

  return (
    <Tr>
      <Td>{checkInDate.toLocaleString()}</Td>
      <Td>{checkOutDate.toLocaleString()}</Td>
      <Td>{record.documents}</Td>
      <Td>{record.description}</Td>
      <Td>{duration}</Td>
    </Tr>
  );
}