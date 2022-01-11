import React, { ReactNode } from "react";
import { Paper } from "@mui/material";
import clsx from "clsx";

interface ContentContainerProps {
  children: ReactNode;
  className?: string;
  color?: string;
  withPadding?: boolean;
}

export default function ContentContainer({
  children,
  color,
  className,
  withPadding,
}: ContentContainerProps) {
  return (
    <Paper
      className={clsx(className, {
        "p-4": withPadding,
      })}
      style={{ backgroundColor: color }}
    >
      {children}
    </Paper>
  );
}
