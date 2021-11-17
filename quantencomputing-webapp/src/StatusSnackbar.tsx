import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useTranslation } from "react-i18next";

interface StatusSnackbarProps {
  isOpen: boolean;
  onClose: () => void;
  status?: "success" | "error";
}

export default function StatusSnackbar({
  isOpen,
  onClose,
  status,
}: StatusSnackbarProps) {
  const { t } = useTranslation();
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={onClose}>
      <Alert
        severity={status === "error" ? "error" : "success"}
        onClose={onClose}
      >
        {status === "error" ? t("An error occurred") : t("Task was successful")}
      </Alert>
    </Snackbar>
  );
}
