import React, { ReactNode } from "react";

interface MaxWidthContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MaxWidthContainer({
  children,
  className,
}: MaxWidthContainerProps) {
  return <div className={`max-w-max w-full ${className}`}>{children}</div>;
}
