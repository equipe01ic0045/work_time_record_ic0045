import { Html, Head, Main, NextScript } from "next/document";
import chakraTheme from "@chakra-ui/theme";
import { ChakraBaseProvider } from "@chakra-ui/react";
export default function Document() {
  return (
    <ChakraBaseProvider theme={chakraTheme}>
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    </ChakraBaseProvider>
  );
}
