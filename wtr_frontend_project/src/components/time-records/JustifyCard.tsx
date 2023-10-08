import TimeRecordData from "@/types/TimeRecordData";
import { EditIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Card, CardBody, CardHeader, FormControl, FormHelperText, FormLabel, HStack, Heading, IconButton, Input, Stack, StackDivider, Textarea } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

export type JustifyData = {
  description: string,
  document: File | null,
};

export default function JustifyCard({
  record,
  setRecord,
}: {
  record: TimeRecordData,
  setRecord: (record: TimeRecordData) => void
}) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <Card variant={"filled"} size="lg" maxW="500px">
      <CardHeader>
        <HStack gap={3}>
          <EditIcon boxSize="3em" />
          <Heading as="h2" size="lg">
            Envio de justificativa
          </Heading>
        </HStack>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing='8'>
          <FormControl isRequired>
            <FormLabel>Descrição</FormLabel>
            <Textarea
              variant="filled"
              bg="white"
              _hover={{ bg: "white" }}
              minHeight={100}
              value={record.description}
              onChange={(e) => setRecord({ ...record, description: e.target.value })}
            />
            <FormHelperText>Insira os detalhes para sua justificativa.</FormHelperText>
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
      </CardBody>
    </Card>
  );
}