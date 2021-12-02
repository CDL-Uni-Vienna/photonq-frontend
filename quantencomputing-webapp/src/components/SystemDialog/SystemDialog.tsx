import React, { useContext, useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@mui/icons-material";
import { ProjectExperimentDataProviderProps } from "../../providers/ProjectExperimentDataProvider";
import { getDefaultExperimentConfig } from "../../model/model.experiment";
import { RouteComponentProps, withRouter } from "react-router";
import { getPathWithId, Path } from "../../model/model.routes";
import { Experiment } from "../../model/types/type.experiment";

interface SystemDialogProps extends RouteComponentProps<{ id: string }> {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onButtonClick?: (value?: string) => void;
  buttonText: string;
  title: string;
  label: string;
  variant?: keyof ProjectExperimentDataProviderProps<any, any>;
  inputType?: string;
}

export default withRouter(function SystemDialog({
  history,
  onButtonClick,
  buttonText,
  title,
  isOpen,
  label,
  setIsOpen,
  variant,
  inputType,
}: SystemDialogProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [errorMassage, setErrorMassage] = useState<string>();

  const resetDialog = () => {
    setIsOpen(false);
    setInput("");
  };

  const handleOnClick = async () => {
    let experiment: Experiment;
    if (onButtonClick) {
      onButtonClick(input);
    } else if (variant === "experiments") {
      if (!input.length) {
        setErrorMassage("Can't be empty");
        return;
      }
      experiment = getDefaultExperimentConfig(input);
      history.push(
        getPathWithId(
          experiment.experimentName.replace(/\s/g, ""),
          Path.SingleExperiment
        )
      );
    }
    resetDialog();
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>
        <p>{t(title)}</p>
        <IconButton
          style={{ position: "absolute" }}
          className={"top-2 right-2"}
          onClick={() => setIsOpen(false)}
        >
          <CloseOutlined />
        </IconButton>
      </DialogTitle>
      <DialogContent style={{ minWidth: 500, paddingTop: 8 }}>
        <div className={"flex flex-col space-y-4"}>
          <TextField
            type={inputType}
            error={!!errorMassage}
            helperText={errorMassage}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            label={t(label)}
            variant={"outlined"}
            size={"small"}
          />
          <Button
            className={"self-end"}
            onClick={handleOnClick}
            variant={"contained"}
          >
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});
