import React, { ReactNode } from "react";
import clsx from "clsx";

interface SectionProps {
  fullWidth?: boolean;
  withVerticalPadding?: boolean;
  withHorizontalPadding?: boolean;
  children: ReactNode;
}

export default function Section({
  withHorizontalPadding,
  withVerticalPadding,
  fullWidth,
  children,
}: SectionProps) {
  return (
    <section
      className={clsx("w-full", {
        ["px-8"]: withHorizontalPadding,
        ["py-16 lg:py-28 2xl:py-32"]: withVerticalPadding,
        ["w-screen"]: fullWidth,
      })}
    >
      {children}
    </section>
  );
}
