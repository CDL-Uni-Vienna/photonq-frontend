import React from "react";
import clsx from "clsx";

interface SectionHeaderProps {
  text: string;
  centered?: boolean;
}

export default function SectionHeader({ text, centered }: SectionHeaderProps) {
  return (
    <h1
      className={clsx("text-3xl lg:text-5xl font-bold", {
        ["text-center"]: centered,
      })}
    >
      {text}
    </h1>
  );
}
