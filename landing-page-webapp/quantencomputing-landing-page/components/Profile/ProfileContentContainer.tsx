import React, { ReactNode } from "react";
import clsx from "clsx";

interface ProfileContentContainerProps {
  children: ReactNode;
  withSpaceBetween?: boolean;
}

export default function ProfileContentContainer({
  children,
  withSpaceBetween,
}: ProfileContentContainerProps) {
  return (
    <div
      className={clsx("border p-6", {
        "space-y-5": withSpaceBetween,
      })}
    >
      {children}
    </div>
  );
}
