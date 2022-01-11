import React from "react";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

interface ProfileSectionHeaderProps {
  header: string;
  withEditButton?: boolean;
  onClick?: () => void;
}

export default function ProfileSectionHeader({
  header,
  withEditButton,
  onClick,
}: ProfileSectionHeaderProps) {
  const { t } = useTranslation();
  return (
    <div className={"flex justify-between"}>
      <Typography variant={"h5"} component={"h2"} fontWeight={"bold"}>
        {t(header)}
      </Typography>
      {withEditButton && <Button onClick={onClick}>{t("Edit")}</Button>}
    </div>
  );
}
