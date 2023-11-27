"use client"; // chakra-ui components need this declaration to work
import { useAuth } from "@/components/auth/AuthContext";
import SideMenu from "@/components/global/SideMenu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user===undefined) {
      router.push('/auth');
    }
  }, [user, router]);

  return (
    <>
      <SideMenu/>
      {children}
    </>
  );
}
