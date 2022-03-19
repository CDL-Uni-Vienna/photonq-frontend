import Link from "next/link";
import clsx from "clsx";
import React, { useContext } from "react";
import { getWebAppUrl } from "../../utils/webapp";
import { useRouter } from "next/router";
import { AuthContext } from "../../providers/AuthProvider";
import Cookies from "js-cookie";

export default function MenuLink(props: {
  route: {
    href: string;
    label: string;
    newTab?: boolean;
    clearAuthState?: boolean;
  };
  isRouteActive: boolean;
  variant: "mobile" | "desktop";
  setMobileNavBarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { setValue: setUser } = useContext(AuthContext);

  return (
    <a
      onClick={() => {
        props.setMobileNavBarOpen?.(false);
        if (props.route.clearAuthState) {
          setUser(undefined);
          Cookies.remove("user");
        }
        if (props.route.newTab) {
          window.open(getWebAppUrl(), "_blank");
        } else {
          router.push(props.route.href);
        }
      }}
      className={clsx(
        "cursor-pointer transform hover:text-primary hover:scale-105 duration-300",
        {
          ["font-bold text-primary"]: props.isRouteActive,
          ["hidden lg:block"]: props.variant === "desktop",
          ["block lg:hidden"]: props.variant === "mobile",
        }
      )}
    >
      {props.route.label}
    </a>
  );
}
