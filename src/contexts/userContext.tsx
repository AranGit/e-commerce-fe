import React from 'react'
import { User } from "@/utils/apiUtils"

export interface UserContextData {
  user: User | null;
  clearUser: any
};

const defaultUserContextData: UserContextData = {
  user: null,
  clearUser: () => null
}

export const AuthContext = React.createContext<UserContextData | null>(defaultUserContextData);

export default function AuthProvider(
  { children, userContextData }:
    {
      children: React.ReactNode,
      userContextData: UserContextData
    }
) {
  return <AuthContext.Provider value={userContextData}>{children}</AuthContext.Provider>;
}