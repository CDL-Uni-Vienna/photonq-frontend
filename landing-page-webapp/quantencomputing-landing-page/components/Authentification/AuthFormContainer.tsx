import React, { ReactNode } from "react";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface AuthFormContainerProps {
  header: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  formId?: string;
}

export default function AuthFormContainer({
  header,
  onSubmit,
  children,
  formId,
}: AuthFormContainerProps) {
  const { t } = useTranslation();
  return (
    <div className={"space-y-10"}>
      <Typography fontWeight={"bold"} variant={"h2"} component={"h1"}>
        {t(header)}
      </Typography>
      <form onSubmit={onSubmit} id={formId} className={"space-y-6"}>
        {children}
      </form>
    </div>
  );
}
