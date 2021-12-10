import React from "react";
import { Button, ButtonProps, ButtonTypeMap } from "@mui/material";
import { Download } from "@mui/icons-material";

interface DownloadButtonProps
  extends ButtonProps<ButtonTypeMap["defaultComponent"], {}> {}

export default function DownloadButton(props: DownloadButtonProps) {
  return (
    <Button {...props} startIcon={<Download />}>
      {props.children}
    </Button>
  );
}
