import { HStack, Icon, IconButton, Tag, TagLeftIcon, Td, Text, Tr } from "@chakra-ui/react";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt-br';
import TimeRecord from "@/types/TimeRecord";
import { FaRegFileLines } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { EditIcon } from "@chakra-ui/icons";
import Link from "next/link";

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

  const duration = dayjs
    .duration(dayjs(checkOutDate || dayjs()).diff(checkInDate))
    .format('HH[h] mm[min]');

  const StyledTag = () => (
    <Tag size="lg" variant="subtle" bg="lavanda.300">
      <TagLeftIcon as={EditIcon} margin={0} color="lavanda.100" />
    </Tag>
  );

  return (
    <Tr background={"#F0EFFF"}>
      <Td>{record.time_record_id}</Td>
      <Td>
        <HStack gap={3}>
          <Text>{checkInDate.toLocaleString()}</Text>
          <Link href={{
            pathname: `info/${record.time_record_id}/justify`,
            query: {
              datetime: record.check_in_timestamp,
              type: 'check-in',
            }
          }}>
            <StyledTag />
          </Link>
        </HStack>
      </Td>
      <Td>
        {checkOutDate && (
          <HStack gap={3}>
            <Text>{checkOutDate.toLocaleString()}</Text>
            <Link href={{
              pathname: `info/${record.time_record_id}/justify`,
              query: {
                datetime: record.check_in_timestamp,
                type: 'check-out',
              }
            }}>
              <StyledTag />
            </Link>
          </HStack>
        )}
      </Td>
      <Td>{duration}</Td>
      <Td>{'OK'}</Td>
      <Td>
        <IconButton
          isDisabled
          size={"lg"}
          mr={3}
          aria-label="Download"
          bg="lavanda.300"
          colorScheme="blackAlpha"
          icon={<Icon boxSize="1.5rem" color="white" as={FaRegFileLines} />}
          onClick={(e) => router.push(`info/${record.time_record_id}/justify`)}
        />
        {0}
      </Td>
    </Tr >
  );
}