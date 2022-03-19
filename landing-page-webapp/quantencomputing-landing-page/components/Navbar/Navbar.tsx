import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import clsx from "clsx";
import ToggleButton from "./TogglButton";
import MenuLink from "./MenuLink";
import { useConnectedUser } from "../../hook/hook.user";
import {
  getLoggedInNavbarRoutes,
  getLoggedOutNavbarRoutes,
  Path,
} from "../../model/model.routes";

export default function Navbar() {
  const router = useRouter();
  const user = useConnectedUser();
  const [mobileNavBarOpen, setMobileNavBarOpen] = useState(false);

  const getRoutes = () => {
    if (user) {
      return getLoggedInNavbarRoutes();
    }
    return getLoggedOutNavbarRoutes();
  };

  const isRouteActive = (href: string) => {
    return (
      router.route === href ||
      (router.route.includes(href) && href !== "/") ||
      (router.route.includes(Path.Register) && href === Path.Login)
    );
  };

  const routes = useMemo(() => getRoutes(), [user]);

  return (
    <div className={"relative text-lg"}>
      <nav
        className={clsx(
          "left-0 bg-secondary right-0 border-b z-30 flex justify-center",
          {
            ["absolute"]: !mobileNavBarOpen,
            ["fixed"]: mobileNavBarOpen,
          }
        )}
      >
        <div
          className={
            "max-w-max bg-white w-full flex justify-between items-center py-4 px-8 "
          }
        >
          <div
            onClick={() => router.push("/")}
            className={
              "w-40 cursor-pointer z-40 flex items-center space-x-4 divide-x"
            }
          >
            <img
              src="/images/CDG_Logo.svg"
              alt="Logo Christian Doppler Forschungsgesellschaft"
              style={{ maxHeight: 60 }}
            />
            <img
              src="/images/uni-wien-logo.svg"
              alt="Logo Uni Wien"
              style={{ maxHeight: 80 }}
            />
          </div>
          <div className={"flex space-x-8"}>
            {routes.map((route, index) => (
              <MenuLink
                variant={"desktop"}
                key={index}
                route={route}
                isRouteActive={isRouteActive(route.href)}
              />
            ))}
            <ToggleButton
              isOpen={mobileNavBarOpen}
              setOpen={setMobileNavBarOpen}
            />
          </div>
        </div>
        {/*Mobile Menu*/}
        <div
          className={clsx(
            "lg:hidden fixed flex overflow-hidden justify-start items-center inset-0 h-full w-full bg-primary-light px-8",
            {
              ["hidden"]: !mobileNavBarOpen,
              ["block"]: mobileNavBarOpen,
            }
          )}
        >
          <div className={"text-3xl space-y-5"}>
            {routes.map((route, index) => (
              <MenuLink
                setMobileNavBarOpen={setMobileNavBarOpen}
                variant={"mobile"}
                key={index}
                route={route}
                isRouteActive={isRouteActive(route.href)}
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
