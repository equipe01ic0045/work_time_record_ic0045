'use client';
import { ChakraProvider } from "@chakra-ui/react";
import SideMenuComponent from "./global/side-menu-component";

export default function LayoutChakraProvider({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ChakraProvider>
      <SideMenuComponent />
      {children}
    </ChakraProvider>
  )
}