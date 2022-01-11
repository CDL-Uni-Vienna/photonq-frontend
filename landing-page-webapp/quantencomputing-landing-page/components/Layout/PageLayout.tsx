import React, { ReactNode } from "react";
import clsx from "clsx";
import { Container } from "@mui/material";

interface PageLayoutProps {
  children: ReactNode;
}

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <Container maxWidth={"xl"}>
      <main className={clsx("px-8")}>{children}</main>
    </Container>
  );
}
