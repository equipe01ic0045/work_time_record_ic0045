import TimeRecordData from "@/types/TimeRecordData";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Input, Stack, StackDivider, FormControl, FormLabel, Textarea, FormHelperText, ButtonGroup, Button, IconButton, FormErrorMessage, Alert, AlertIcon } from "@chakra-ui/react";
import { useRef } from "react";

export default function JustifyCardBody({
  requireDescription,
  record,
  setRecord
}: {
  requireDescription: boolean,
  record: TimeRecordData,
  setRecord: (record: TimeRecordData) => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Stack gap={"2em"}>
      <FormControl isRequired={requireDescription}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          variant="filled"
          bg="white"
          _hover={{ bg: "white" }}
          minHeight={100}
          value={record.description}
          onChange={(e) => setRecord({ ...record, description: e.target.value })}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Anexar arquivo para justificativa:</FormLabel>
        <ButtonGroup
          w="100%"
          bg="white"
          isAttached
          variant='outline'
          onClick={e => fileInputRef.current?.click()}
        >
          <Button w='100%' justifyContent='start' overflow='hidden'>
            {record.document?.name || 'Selecione o arquivo'}
          </Button>
          <IconButton aria-label='Anexe arquivo' icon={<AttachmentIcon />} />
        </ButtonGroup>
        <Input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={e => setRecord({ ...record, document: e.target.files?.[0] })}
        />
        <FormHelperText>
          Se necessário mais de um arquivo/documento,
          utilize ferramentas para junção destes arquivos em um só.
        </FormHelperText>
      </FormControl>
    </Stack>
  );
}