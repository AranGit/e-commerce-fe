/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import AuthProvider, { userContextData } from "@/contexts/userContext";
import React, { useState, useEffect } from "react"
import { useRouter, usePathname } from 'next/navigation';
import { tokenKey, getItemFromLocal } from "@/utils/utils"
import { User, getUser } from "@/utils/apiUtils"
import NavBar from "./NavBar";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getItemFromLocal(tokenKey);
    if (token) {
      if (pathname === "/login") router.push(`/`)
      getUser({
        token: token,
        onSuccess: (user: User) => {
          setUser(user);
          router.push(`/products`)
        },
        onFailed: () => router.push(`/login`)
      })
    } else {
      setUser(null);
    }
  }, [])

  const userContextData: userContextData = {
    user: user,
    clearUser: () => setUser(null)
  }

  return (
    <AuthProvider userContextData={userContextData}>
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col items-center justify-between p-5 mt-[80px]">
        {children}
      </main>
      <footer></footer>
    </AuthProvider>
  )
}