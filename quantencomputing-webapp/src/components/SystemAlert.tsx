import React from "react";
import { Alert, AlertProps } from "@mui/material";

interface SystemAlertProps extends AlertProps {}

export default function SystemAlert(props: SystemAlertProps) {
  return (
    <Alert className={"fixed bottom-3 right-3 z-10"} {...props}>
      {props.children}
    </Alert>
  );
}
