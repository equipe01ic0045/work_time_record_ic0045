"use client";
import "@/styles/global.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AuthProvider } from "@/components/auth/AuthContext";

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
    },
  });

  return (
    <html lang="en">
      <head />
      <body>
        <div className="root">
          <AuthProvider>
            <ChakraProvider theme={theme}>
              {children}
            </ChakraProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
