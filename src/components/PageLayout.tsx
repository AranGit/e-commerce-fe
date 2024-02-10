/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import AuthProvider, { UserContextData } from "@/contexts/userContext";
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

  const userContextData: UserContextData = {
    user: user,
    clearUser: () => setUser(null)
  }

  const handleUser = () => {
    const token = getItemFromLocal(tokenKey);
    if (token) {
      if (user === null) {
        getUser({
          token: token,
          onSuccess: (user: User) => {
            setUser(user);
            if (pathname === '/login' || pathname === "/" || pathname === "") {
              router.push(`/products`)
            }
          },
          onFailed: () => router.push(`/login`)
        });
      }
    } else {
      setUser(null);
    }
  }

  useEffect(() => {
    handleUser();
  }, [])

  useEffect(() => {
    if (userContextData?.user === null) {
      handleUser();
    } else {
      if (pathname === "/" || pathname === "") {
        router.push(`/products`)
      }
    }
  }, [pathname])

  return (
    <AuthProvider userContextData={userContextData}>
      <header>
        <NavBar />
      </header>
      <main className="flex flex-col items-center justify-between p-5 mt-[80px] mb-[36px]">
        <div className="max-w-[1400px] w-full">{children}</div>
      </main>
      <footer></footer>
    </AuthProvider>
  )
}