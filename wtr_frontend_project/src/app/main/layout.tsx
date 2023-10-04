"use client"; // chakra-ui components need this declaration to work
import SideMenu from "@/components/global/SideMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideMenu/>
      {children}
    </>
  );
}
