import React, {
  createContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { OptionalBaseProviderType } from "../model/types/type.provider";
import { User } from "../model/types/type.user";
import { useRouter } from "next/router";
import { getPrivateRoutes, Path } from "../model/model.routes";
import { CircularProgress } from "@mui/material";
import Cookies from "js-cookie";

export const AuthContext = createContext<
  OptionalBaseProviderType<User & { token: string }>
>({
  setValue: () => { },
});

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<(User & { token: string }) | undefined>();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (
      typeof user !== "undefined" &&
      Cookies.get("user") !== JSON.stringify(user)
    ) {
      Cookies.set("user", JSON.stringify(user), {
        expires: 0.25,
        secure: true,
      });
    }
  }, [user]);

  useEffect(() => {
    if (typeof Cookies.get("user") !== "undefined" && !user) {
      setUser(JSON.parse(Cookies.get("user") || ""));
      setVerified(true);
    } else if (
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
