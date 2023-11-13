"use client"; // chakra-ui components need this declaration to work
import CookieAuthComponent from "@/components/cookie-auth/CookieAuthComponent";
import SideMenu from "@/components/global/SideMenu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <CookieAuthComponent />
      <SideMenu/>
      {children}
    </>
  );
}
