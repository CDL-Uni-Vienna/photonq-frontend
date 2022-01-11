import React, { ReactNode } from "react";

interface PortableTextContainerProps {
  children: ReactNode;
}

export default function PortableTextContainer({
  children,
}: PortableTextContainerProps) {
  return (
    <div className={"flex flex-col items-center w-full"}>
      <div className={"md:w-8/12 lg:w-6/12"}>{children}</div>
    </div>
  );
}
