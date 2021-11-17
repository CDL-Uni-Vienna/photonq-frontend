import React from "react";
import {
  Button,
  ButtonProps,
  ButtonTypeMap,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface LoadingButtonProps
  extends ButtonProps<ButtonTypeMap["defaultComponent"], {}> {
  isLoading: boolean;
  text: string;
}

export default function LoadingButton({
  isLoading,
  text,
  ...props
}: LoadingButtonProps) {
  const { t } = useTranslation();
  return (
    <Button {...props} variant={"contained"}>
      {isLoading ? (
        <CircularProgress size={20} style={{ color: "white" }} />
      ) : (
        t(text)
      )}
    </Button>
  );
}
