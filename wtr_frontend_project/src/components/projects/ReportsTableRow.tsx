import { Td, Tr } from "@chakra-ui/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/pt-br";
import { TimeRecord } from "@/providers/timeRecordsProvider";

import  {BsFileEarmarkArrowUpFill} from "react-icons/bs"

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function ReportsTableRow({ record }: { record: TimeRecord }) {
  const checkInDate = new Date(record.check_in_timestamp);
  const checkOutDate = new Date(record.check_out_timestamp);

  const duration = dayjs(checkInDate).locale("pt-br").to(checkOutDate, true);

  return (
    <Tr bgColor={"#F0EFFF"}>
      <Td>{checkInDate.toLocaleString()}</Td>
      <Td>{checkOutDate.toLocaleString()}</Td>
      <Td>{record.description}</Td>
      <Td 
        // display={"flex"}
        // flexDirection={"column"}
        // alignItems={"center"}
      ><BsFileEarmarkArrowUpFill color="#4D47C3" size={25}/></Td>
    </Tr>
  );
}
