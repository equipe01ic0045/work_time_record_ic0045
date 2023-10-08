import { EditIcon, AttachmentIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Card, CardBody, CardHeader, FormControl, FormHelperText, FormLabel, HStack, Heading, IconButton, Input, Stack, StackDivider, Textarea } from "@chakra-ui/react";
import { useState, useRef, useEffect } from "react";

export type JustifyData = {
  description: string,
  document: File | null,
};

export default function JustifyCard({
  onJustify
}: {
  onJustify: (data: JustifyData) => void
}) {
  const [description, setDescription] = useState<string>('');
  const [document, setDocument] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    onJustify({ description, document });
  }, [description, document, onJustify]);

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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                {document?.name || 'Selecione o arquivo'}
              </Button>
              <IconButton aria-label='Anexe arquivo' icon={<AttachmentIcon />} />
            </ButtonGroup>
            <Input
              ref={fileInputRef}
              type="file"
              hidden
              onChange={e => setDocument(e.target.files && e.target.files[0])}
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