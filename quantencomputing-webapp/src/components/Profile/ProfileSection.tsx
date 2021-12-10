import React, { ReactNode } from "react";
import clsx from "clsx";

interface ProfileSectionProps {
  children: ReactNode;
  withBottomSpace?: boolean;
}

export default function ProfileSection({
  children,
  withBottomSpace,
}: ProfileSectionProps) {
  return (
    <div
      className={clsx("pt-16 px-8 space-y-3", {
        "pb-16": withBottomSpace,
      })}
    >
      {children}
    </div>
  );
}
