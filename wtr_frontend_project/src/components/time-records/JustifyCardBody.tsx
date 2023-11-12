import { Justification } from "@/types/TimeRecordData";
import { AttachmentIcon } from "@chakra-ui/icons";
import { Input, Stack, FormControl, FormLabel, Textarea, FormHelperText, ButtonGroup, Button, IconButton, FormErrorMessage } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

interface JustifyCardBodyProps<T> {
  requireDescription: boolean;
  record: T;
  setRecord: (record: T) => void;
};

export default function JustifyCardBody({
  requireDescription,
  record,
  setRecord,
}: JustifyCardBodyProps<Justification>) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [errors, setErrors] = useState({ description: '' });

  return (
    <Stack gap={"2em"}>
      <FormControl isRequired={requireDescription} isInvalid={!!errors.description}>
        <FormLabel>Descrição</FormLabel>
        <Textarea
          variant="filled"
          bg="white"
          _hover={{ bg: "white" }}
          minHeight={100}
          value={record.description}
          onChange={(e) => {
            if (e.target.value === '') {
              setErrors({ description: 'Descrição é obrigatória' });
            } else {
              setErrors({ description: '' });
            }

            setRecord({ ...record, description: e.target.value });
          }}
        />
        <FormErrorMessage>{errors.description}</FormErrorMessage>
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
          accept=".pdf"
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