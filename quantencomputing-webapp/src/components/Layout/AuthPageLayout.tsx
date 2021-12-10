import React, { ReactNode } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
}

export default function AuthPageLayout({ children }: AuthPageLayoutProps) {
  return (
    <div className={"flex flex-col items-center"}>
      <div style={{ maxWidth: 1440 }}>{children}</div>
    </div>
  );
}
