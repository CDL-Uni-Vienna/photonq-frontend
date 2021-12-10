import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

export default function NavbarLink(props: {
  route: { href: string; label: string } | { path: string; label: string };
  isRouteActive?: boolean;
  variant: "mobile" | "desktop";
  setMobileNavBarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div
      className={clsx(
        "transform hover:text-primary hover:scale-105 duration-300",
        {
          "font-bold text-primary": props.isRouteActive,
          "hidden lg:block": props.variant === "desktop",
          "block lg:hidden": props.variant === "mobile",
        }
      )}
    >
      {"path" in props.route ? (
        <Link to={props.route.path}>{props.route.label}</Link>
      ) : (
        <a
          href={props.route.href}
          onClick={() => props.setMobileNavBarOpen?.(false)}
        >
          {props.route.label}
        </a>
      )}
    </div>
  );
}
