import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContextMenu, { ContextMenuAction } from "../ProjectTable/ContextMenu";

interface DropDownButtonProps {
  children: ReactNode;
  onClick?: () => void;
  actions: ContextMenuAction<any>[];
  isDisabled?: boolean;
}

export default function DropDownButton({
  children,
  onClick,
  actions,
  isDisabled,
}: DropDownButtonProps) {
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(anchorEl ? null : e.currentTarget);
    setIsContextMenuOpen((prev) => !prev);
  };

  return (
    <div className={"flex items-center h-full"}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        className={"h-3/4"}
        variant={"contained"}
      >
        {children}
      </Button>
      <Button
        disabled={isDisabled}
        onClick={handleOnClick}
        style={{
          minWidth: 20,
          padding: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        className={"h-3/4"}
        variant={"contained"}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <ContextMenu
        isOpen={isContextMenuOpen}
        setIsOpen={setIsContextMenuOpen}
        anchorEl={anchorEl}
        actions={actions}
      />
    </div>
  );
}
