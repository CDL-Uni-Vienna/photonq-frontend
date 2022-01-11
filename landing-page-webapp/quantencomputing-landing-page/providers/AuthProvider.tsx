import React, {
  createContext,
  ReactNode,
  useLayoutEffect,
  useState,
} from "react";
import { OptionalBaseProviderType } from "../model/types/type.provider";
import { User } from "../model/types/type.user";
import { useRouter } from "next/router";
import { getPrivateRoutes, getPublicRoutes, Path } from "../model/model.routes";
import { CircularProgress } from "@mui/material";

export const AuthContext = createContext<
  OptionalBaseProviderType<User & { token: string }>
>({
  setValue: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<(User & { token: string }) | undefined>();
  const [verified, setVerified] = useState(false);

  useLayoutEffect(() => {
    if (
      getPrivateRoutes().some((route) => route.href === router.pathname) &&
      !user
    ) {
      router.push(Path.Login);
    } else {
      setVerified(true);
    }
  }, [router.pathname]);

  if (
    !verified &&
    !user &&
    getPrivateRoutes().some((route) => route.href === router.pathname)
  ) {
    return (
      <div className={"w-screen h-screen flex justify-center items-center"}>
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ value: user, setValue: setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
