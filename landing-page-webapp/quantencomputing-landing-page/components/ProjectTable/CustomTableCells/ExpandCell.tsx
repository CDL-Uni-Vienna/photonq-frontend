import React from "react";
import { CustomTableCellProps } from "./type.customTableCells";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { IconButton } from "@mui/material";

export default function ExpandCell({ row }: CustomTableCellProps<any>) {
  const rotateIcon = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const icon = document.getElementById(row.id);
    if (!row.isExpanded) {
      icon?.classList.add("-rotate-90");
    } else {
      icon?.classList.remove("-rotate-90");
    }
  };

  return (
    <IconButton {...row.getToggleRowExpandedProps()} style={{ padding: 0 }}>
      <KeyboardArrowDownIcon
        style={{
          transition: "all",
          transitionDuration: "300ms",
          padding: 4,
          height: "2rem",
          width: "2rem",
        }}
        className={"transform rounded-full"}
        onClick={(e) => rotateIcon(e)}
        id={row.id}
      />
    </IconButton>
  );
}
