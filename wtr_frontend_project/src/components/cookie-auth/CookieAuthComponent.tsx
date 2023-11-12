"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CookieAuthComponent() {

    const router = useRouter();

    useEffect(()=>{
       const cookie = document.cookie
       console.log(cookie)
       if (!cookie){
        router.refresh()
       }
    }, [router])

    router.refresh()

  return null
}
