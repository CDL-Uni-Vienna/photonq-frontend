import React from "react";
import { useTranslation } from "react-i18next";

interface EditorSectionHeaderProps {
  header: string;
}

export default function EditorSectionHeader({
  header,
}: EditorSectionHeaderProps) {
  const { t } = useTranslation();

  return <h2 className={"font-bold text-white text-xl"}>{t(header)}</h2>;
}
