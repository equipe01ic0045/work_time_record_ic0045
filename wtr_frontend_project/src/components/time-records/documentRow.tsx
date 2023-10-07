import { AttachmentIcon, CloseIcon } from "@chakra-ui/icons";
import { Input, IconButton, HStack, Button } from "@chakra-ui/react";
import { ChangeEvent, useRef, useState } from "react";

export default function DocumentRow(
  props: { onInputChange: (data: any) => void, handleRemove: () => void, description: string, file: File | null }
) {
  const [data, setData] = useState<{ description: string, file: File | null }>({
    description: props.description || '',
    file: props.file || null
  });

  const hiddenFileInput = useRef<HTMLInputElement | null>(null);

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setData({ file, description: data.description });
    props.onInputChange({ file, description: data.description });
  };

  const handleInputChange = (descriptionInput: string, fileInput: File | null) => {
    setData({ description: descriptionInput, file: fileInput });
    props.onInputChange({ file: fileInput, description: descriptionInput });
  }

  return (
    <HStack my={3} bg="white" p={3} rounded="md">
      <Input
        name="description"
        placeholder="Description"
        onChange={e => handleInputChange(e.target.value, data.file)}
        value={props.description}
      />
      <Button
        aria-label="Attach file"
        rightIcon={<AttachmentIcon />}
        background={"blueviolet"}
        colorScheme="blackAlpha"
        name="attach-file"
        onClick={(e) => hiddenFileInput.current?.click()}
        px={7}
      >
        Attach file ({props.file ? 1 : 0})
      </Button>
      <Input ref={hiddenFileInput} hidden type="file" onChange={onSelectFile} />
      <IconButton
        aria-label="Remove"
        background={"blueviolet"}
        colorScheme="blackAlpha"
        icon={<CloseIcon />}
        onClick={props.handleRemove}
      />
    </HStack>
  )
}
