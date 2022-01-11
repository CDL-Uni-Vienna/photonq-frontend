import React, { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
  onClick?: () => void;
  children: ReactNode;
  variant: "primary" | "link" | "outlined";
  fullWidth?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant,
  onClick,
  size = "md",
  fullWidth,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "transform hover:scale-105 duration-300 py-1 font-bold rounded",
        {
          ["bg-primary text-white"]: variant === "primary",
          ["bg-transparent text-white border border-white"]:
            variant === "outlined",
          ["text-primary"]: variant === "link",
          ["w-full"]: fullWidth,
          ["px-12 py-2"]: size === "lg",
          ["px-8 py-2"]: size === "md",
          ["px-2"]: size === "sm",
        }
      )}
    >
      {children}
    </button>
  );
}
