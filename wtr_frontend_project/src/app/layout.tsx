"use client"; // chakra-ui components need this declaration to work
import "@/styles/global.css"; // css import from styles to work with normal element tags
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = extendTheme({
    colors: {
      lavanda: {
        100: "#F0EFFF",
        200: "#A7A3FF",
        300: "#4D47C3",
      },
    }
  });

  return (
    <html lang="en">
      <head />
      <body>
        <div className="root">
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </div>
      </body>
    </html>
  );
}
