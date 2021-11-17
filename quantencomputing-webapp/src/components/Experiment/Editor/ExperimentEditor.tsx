import { RouteComponentProps, withRouter } from "react-router";
import { useSelectedExperiment } from "../../../hook/hook.experiment";
import DemultiplexerSection from "./Sections/DemultiplexerSection";
import ClusterStateSection from "./Sections/ClusterStateSection";
import { Button, CircularProgress } from "@mui/material";
import QubitComputingSection from "./Sections/QubitComputingSection";
import QubitMeasurementSection from "./Sections/QubitMeasurementSection";
import { useTranslation } from "react-i18next";
import { updateExperiment } from "../../../model/model.api";
import { useState } from "react";
import LoadingButton from "../../LoadingButton";
import StatusSnackbar from "../../../StatusSnackbar";

export default withRouter(({ match }: RouteComponentProps<{ id: string }>) => {
  const { t } = useTranslation();
  const [updateStatus, setUpdateStatus] = useState<"error" | "success">();
  const [isUpdating, setIsUpdating] = useState(false);
  const { experiment, setExperiment, isLoading } = useSelectedExperiment(
    match.params.id
  );

  const handleSave = async () => {
    setIsUpdating(true);
    try {
      if (!experiment.config) throw new Error("No config provided");
      await updateExperiment(experiment.id, {
        ...experiment,
        circuitId: experiment.config.circuit_id,
      });
    } catch (e) {
      console.warn(e);
      setUpdateStatus("error");
      return;
    }
    setUpdateStatus("success");
    setIsUpdating(() => false);
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
        <Button>{t("Reset")}</Button>
        <LoadingButton
          isLoading={isUpdating}
          text={t("Save")}
          onClick={handleSave}
          variant={"contained"}
        />
      </div>
      <StatusSnackbar
        isOpen={!!updateStatus}
        onClose={() => setUpdateStatus(undefined)}
        status={updateStatus}
      />
    </div>
  );
});
