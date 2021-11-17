import React, { MouseEvent } from "react";
import { List, ListItemText, MenuItem, Paper, Popper } from "@mui/material";

interface ContextMenuAction {
  label: string;
  action: () => void;
}

interface ContextMenuProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  anchorEl: HTMLElement | null;
  actions: ContextMenuAction[];
  variant?: "small" | "large";
}

export default function ContextMenu({
  setIsOpen,
  isOpen,
  anchorEl,
  actions,
  variant = "large",
}: ContextMenuProps) {
  const handleOnClick = (
    e:
      | MouseEvent<HTMLAnchorElement>
      | MouseEvent<HTMLDivElement>
      | MouseEvent<HTMLLIElement>,
    action: () => void
  ) => {
    e.stopPropagation();
    action();
  };

  return (
    <Popper placement={"bottom-start"} anchorEl={anchorEl} open={isOpen}>
      <List dense={variant === "small"} component={Paper}>
        {actions.map(({ label, action }, index) => (
          <MenuItem onClick={(e) => handleOnClick(e, action)} key={index}>
            <ListItemText primary={label} />
          </MenuItem>
        ))}
      </List>
    </Popper>
  );
}
