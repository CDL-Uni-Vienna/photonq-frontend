import { RouteComponentProps, withRouter } from "react-router";
import { useSelectedExperiment } from "../../../hook/hook.experiment";
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

export default withRouter(({ match }: RouteComponentProps<{ id: string }>) => {
  const { t } = useTranslation();
  const { experiment, setExperiment, isLoading } = useSelectedExperiment(
    match.params.id
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
      id: experiment.id,
      projectId: experiment.projectId,
    }));
  };

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
        experiment={experiment}
        setExperiment={setExperiment}
      />
      <QubitComputingSection
        experiment={experiment}
        setExperiment={setExperiment}
      />
      <QubitMeasurementSection
        experiment={experiment}
        setExperiment={setExperiment}
      />
      <div className={"flex justify-end space-x-4"}>
        <Button variant={"outlined"} onClick={reset}>
          {t("Reset")}
        </Button>
      </div>
    </div>
  );
});
