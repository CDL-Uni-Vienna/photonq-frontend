import React, { createContext, ReactNode, useState } from "react";
import { OptionalBaseProviderType } from "../model/types/type.provider";
import { User } from "../model/types/type.user";

export const AuthContext = createContext<OptionalBaseProviderType<User>>({
  setValue: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | undefined>();

  return (
    <AuthContext.Provider value={{ value: user, setValue: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
