"use client"; // chakra-ui components need this declaration to work
import "@/styles/global.css"; // css import from styles to work with normal element tags
import { ChakraProvider } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="root">
          <ChakraProvider>{children}</ChakraProvider>
        </div>
      </body>
    </html>
  );
}
