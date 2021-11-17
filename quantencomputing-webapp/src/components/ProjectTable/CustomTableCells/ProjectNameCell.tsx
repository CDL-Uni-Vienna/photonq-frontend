import React from "react";
import { CustomTableCellProps } from "./type.customTableCells";
import { useTranslation } from "react-i18next";

export default function ProjectNameCell({
  value,
}: CustomTableCellProps<string>) {
  const { t } = useTranslation();
  return (
    <div className={"flex space-x-5 items-center"}>
      <embed
        style={{ width: 36, height: 36 }}
        src="/images/def-project-icon.svg"
      />
      <p className={"font-bold"}>{t(value)}</p>
    </div>
  );
}
