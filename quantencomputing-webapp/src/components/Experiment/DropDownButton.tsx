import React, { ReactNode, useState } from "react";
import { Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ContextMenu from "../ProjectTable/ContextMenu";

interface DropDownButtonProps {
  children: ReactNode;
}

export default function DropDownButton({ children }: DropDownButtonProps) {
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
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
        className={"h-1/2"}
        variant={"contained"}
      >
        {children}
      </Button>
      <Button
        onClick={handleOnClick}
        style={{
          minWidth: 20,
          padding: 0,
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        className={"h-1/2"}
        variant={"contained"}
      >
        <KeyboardArrowDownIcon />
      </Button>
      <ContextMenu
        isOpen={isContextMenuOpen}
        setIsOpen={setIsContextMenuOpen}
        anchorEl={anchorEl}
        actions={[
          { label: "Action1", action: () => {} },
          { label: "Action2", action: () => {} },
        ]}
      />
    </div>
  );
}
