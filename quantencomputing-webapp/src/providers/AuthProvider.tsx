import React, { createContext, ReactNode, useState } from "react";
import { OptionalBaseProviderType } from "../model/types/type.provider";
import { User } from "../model/types/type.user";

export const AuthContext = createContext<
  OptionalBaseProviderType<User & { token: string }>
>({
  setValue: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<(User & { token: string }) | undefined>();

  return (
    <AuthContext.Provider value={{ value: user, setValue: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
