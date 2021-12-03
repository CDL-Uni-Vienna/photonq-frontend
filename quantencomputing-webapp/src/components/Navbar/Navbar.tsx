import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  getNavbarRoutes,
  getPathsWithoutNavbar,
  Path,
} from "../../model/model.routes";
import clsx from "clsx";
import NavbarLink from "./NavbarLink";
import ToggleButton from "./TogglButton";
import { Container } from "@mui/material";
import { useLocation } from "react-router";

export default function Navbar() {
  const { pathname } = useLocation();
  const [pathsWithoutNavbar] = useState(getPathsWithoutNavbar());
  const [routes] = useState(getNavbarRoutes());
  const [mobileNavBarOpen, setMobileNavBarOpen] = useState(false);

  const checkAllPathsWithoutNavbar = () => {
    for (const path of pathsWithoutNavbar) {
      if (pathname.includes(path)) return true;
    }
    return false;
  };

  if (checkAllPathsWithoutNavbar()) {
    return null;
  }

  return (
    <div className={"relative w-full"}>
      <nav
        className={clsx(
          "left-0 right-0 border-b bg-white z-30 flex justify-center",
          {
            absolute: !mobileNavBarOpen,
            fixed: mobileNavBarOpen,
          }
        )}
      >
        <Container maxWidth={"xl"}>
          <div className={"w-full flex justify-between items-center py-4 px-8"}>
            <Link to={Path.MyProjects} className={"w-32 cursor-pointer z-40"}>
              <img src="/images/uni-wien-logo.svg" alt="Logo Uni Wien" />
            </Link>
            <div className={"flex space-x-8"}>
              {routes.map((route, index) => (
                <NavbarLink
                  variant={"desktop"}
                  key={index}
                  route={route}
                  isRouteActive={
                    pathname === route.path ||
                    (route.path &&
                      pathname.includes(route.path!) &&
                      route.path.toString() !== "/")
                  }
                />
              ))}
              <ToggleButton
                isOpen={mobileNavBarOpen}
                setOpen={setMobileNavBarOpen}
              />
            </div>
          </div>
        </Container>
        {/*Mobile Menu*/}
        <div
          className={clsx(
            "lg:hidden fixed flex overflow-hidden justify-start items-center inset-0 h-full w-full bg-primaryLight px-8",
            {
              hidden: !mobileNavBarOpen,
              block: mobileNavBarOpen,
            }
          )}
        >
          <div className={"text-3xl space-y-5"}>
            {routes.map((route, index) => (
              <NavbarLink
                setMobileNavBarOpen={setMobileNavBarOpen}
                variant={"mobile"}
                key={index}
                route={route}
                isRouteActive={
                  pathname === route.path ||
                  (route.path &&
                    pathname.includes(route.path!) &&
                    route.path.toString() !== "/")
                }
              />
            ))}
          </div>
        </div>
      </nav>
    </div>
  );
}
