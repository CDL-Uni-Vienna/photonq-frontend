import { RouteComponentProps, withRouter } from "react-router";
import DemultiplexerSection from "./Sections/DemultiplexerSection";
import ClusterStateSection from "./Sections/ClusterStateSection";
import { Button, CircularProgress } from "@mui/material";
import QubitComputingSection from "./Sections/QubitComputingSection";
import QubitMeasurementSection from "./Sections/QubitMeasurementSection";
import { useTranslation } from "react-i18next";

import {
  getConfig,
  getDefaultExperimentConfig,
} from "../../../model/model.experiment";
import { useMemo } from "react";
import { ExperimentState } from "../../../model/types/type.experiment";
import { BaseEditorPageProps } from "../../../pages/EditorPage";

export default withRouter(
  ({
    experiment,
    setExperiment,
    isLoading,
  }: RouteComponentProps<{ id: string }> & BaseEditorPageProps) => {
    const { t } = useTranslation();

    const inputsDisabled = useMemo(
      () => experiment.status !== ExperimentState.DRAFT,
      [experiment]
    );

    const reset = () => {
      const defaultExperiment = getDefaultExperimentConfig(
        experiment.experimentName
      );
      const config = getConfig(defaultExperiment);
      setExperiment((prev) => ({
        ...defaultExperiment,
        config: config,
        withQubitConfig: !!config?.qc_encoded_onoff,
        experimentId: experiment.experimentId,
        projectId: experiment.projectId,
      }));
    };

    console.log(experiment);

    if (isLoading) {
      return (
        <div className={"h-screen flex justify-center items-center"}>
          <CircularProgress size={80} />
        </div>
      );
    }

    return (
      <div className={"space-y-20 py-16"}>
        <DemultiplexerSection />
        <ClusterStateSection
          inputsDisabled={inputsDisabled}
          experiment={experiment}
          setExperiment={setExperiment}
        />
        <QubitComputingSection
          inputsDisabled={inputsDisabled}
          experiment={experiment}
          setExperiment={setExperiment}
        />
        <QubitMeasurementSection
          inputsDisabled={inputsDisabled}
          experiment={experiment}
          setExperiment={setExperiment}
        />
        <div className={"flex justify-end space-x-4"}>
          <Button
            disabled={inputsDisabled}
            variant={"outlined"}
            onClick={reset}
          >
            {t("Reset")}
          </Button>
        </div>
      </div>
    );
  }
);
