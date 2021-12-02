import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { CloseOutlined } from "@mui/icons-material";
import {
  ProjectExperimentDataContext,
  ProjectExperimentDataProviderProps,
} from "../../providers/ProjectExperimentDataProvider";
import { getDefaultExperimentConfig } from "../../model/model.experiment";
import { createExperiment } from "../../model/model.api";
import LoadingButton from "../LoadingButton";
import { RouteComponentProps, withRouter } from "react-router";
import { getPathWithId, Path } from "../../model/model.routes";
import { Experiment } from "../../model/types/type.experiment";

interface SystemDialogProps extends RouteComponentProps<{ id: string }> {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  onButtonClick?: () => void;
  buttonText: string;
  title: string;
  label: string;
  variant: keyof ProjectExperimentDataProviderProps<any, any>;
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
}: SystemDialogProps) {
  const { t } = useTranslation();
  const [input, setInput] = useState("");
  const [errorMassage, setErrorMassage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    [variant]: { setValue: setData },
  } = useContext(ProjectExperimentDataContext);

  const createNewExperiment = async () => {
    setIsLoading(true);
    const experiment = await createExperiment(
      getDefaultExperimentConfig(input)
    );
    setData((prev: any) => [...prev, experiment]);
    setIsLoading(() => false);
    return experiment;
  };

  const resetDialog = () => {
    setIsOpen(false);
    setInput("");
  };

  const handleOnClick = async () => {
    let experiment: Experiment;
    if (onButtonClick) {
      onButtonClick();
    } else if (variant === "experiments") {
      if (!input.length) {
        setErrorMassage("Can't be empty");
        return;
      }
      experiment = await createNewExperiment();
      history.push(getPathWithId(experiment.id, Path.SingleExperiment));
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
            error={!!errorMassage}
            helperText={errorMassage}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            fullWidth
            label={t(label)}
            variant={"outlined"}
            size={"small"}
          />
          <LoadingButton
            isLoading={isLoading}
            text={buttonText}
            className={"self-end"}
            onClick={handleOnClick}
            variant={"contained"}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
});
