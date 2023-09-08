import { Head, Html, Main, NextScript } from "next/document";
import chakraTheme from "@chakra-ui/theme";
import { ChakraBaseProvider } from "@chakra-ui/react";
import SideMenuComponent from "@/components/side-menu-component";

// document is where the SPA application will render components
// much like react where the index.html will render components
// at root <div>

export default function Document() {

  return (
    <ChakraBaseProvider theme={chakraTheme}>
      <Html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link rel="stylesheet" href="/styles/global.css" />
          <title>ic0045_project</title>
        </Head>
        <body>
          <div style={{
            display:"flex",
            flexDirection:"row",
            minHeight: "100vh",
            minWidth: "100vw",
            margin: 0,
            padding: 0,
          }} >
            <SideMenuComponent />
            <Main></Main>
            <NextScript />
          </div>
        </body>
      </Html>
    </ChakraBaseProvider>
  );
}
