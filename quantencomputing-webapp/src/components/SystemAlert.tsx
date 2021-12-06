import React from "react";
import { Alert, AlertProps } from "@mui/material";

interface SystemAlertProps extends AlertProps {}

export default function SystemAlert(props: SystemAlertProps) {
  return (
    <Alert className={"absolute bottom-3 right-3"} {...props}>
      {props.children}
    </Alert>
  );
}
