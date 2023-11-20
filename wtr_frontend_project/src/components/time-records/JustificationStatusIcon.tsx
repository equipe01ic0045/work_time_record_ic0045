import { Tooltip, Icon } from "@chakra-ui/react";
import {
  FaCircleCheck,
  FaCircleXmark,
  FaCircleQuestion,
} from "react-icons/fa6";

export default function JustificationStatusIcon({
  status,
}: {
  status: string;
}) {
  if (status === "APPROVED") {
    return (
      <Tooltip label="Justificativa aceita">
        <span>
          <Icon boxSize="1.5rem" color="green.500" as={FaCircleCheck} />
        </span>
      </Tooltip>
    );
  } else if (status === "DENIED") {
    return (
      <Tooltip label="Justificativa negada">
        <span>
          <Icon boxSize="1.5rem" color="red.500" as={FaCircleXmark} />
        </span>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip label="Justificativa em análise">
        <span>
          <Icon boxSize="1.5rem" color="gray.500" as={FaCircleQuestion} />
        </span>
      </Tooltip>
    );
  }
}
