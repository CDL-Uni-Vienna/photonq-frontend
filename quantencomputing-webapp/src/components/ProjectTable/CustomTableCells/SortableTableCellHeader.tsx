import React from "react";
import { useTranslation } from "react-i18next";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { MainTableColumn } from "../../../model/types/type.table";
import { UseSortByColumnProps } from "react-table";

interface SortableTableCellHeaderProps {
  title: string;
  column: MainTableColumn & UseSortByColumnProps<any>;
}

export default function SortableTableCellHeader({
  title,
  column,
}: SortableTableCellHeaderProps) {
  const { t } = useTranslation();

  return (
    <div className={"flex space-x-2 items-center"}>
      <p>{t(title)}</p>
      <div className={"flex flex-col -space-y-3"}>
        <ArrowDropUpIcon
          style={{ fontSize: 18 }}
          color={
            !column.isSortedDesc && column.isSorted ? "primary" : undefined
          }
        />
        <ArrowDropDownIcon
          style={{ fontSize: 18 }}
          color={column.isSortedDesc ? "primary" : undefined}
        />
      </div>
    </div>
  );
}
