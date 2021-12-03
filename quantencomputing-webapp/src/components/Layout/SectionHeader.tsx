import React from "react";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

interface SectionHeaderProps {
  header: string;
  withButton?: boolean;
  buttonText?: string;
  onClick?: () => void;
  withVerticalSpacing?: boolean;
}

export default function SectionHeader({
  header,
  withButton,
  onClick,
  buttonText,
  withVerticalSpacing,
}: SectionHeaderProps) {
  const { t } = useTranslation();
  return (
    <div
      className={clsx("flex justify-between", {
        "py-16": withVerticalSpacing,
      })}
    >
      <Typography variant={"h4"} component={"h1"} fontWeight={"bold"}>
        {t(header)}
      </Typography>
      {withButton && (
        <Button variant={"contained"} onClick={onClick}>
          {t(buttonText!)}
        </Button>
      )}
    </div>
  );
}
