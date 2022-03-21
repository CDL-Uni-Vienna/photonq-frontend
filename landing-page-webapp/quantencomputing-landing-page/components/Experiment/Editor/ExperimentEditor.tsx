import DemultiplexerSection from "./Sections/DemultiplexerSection";
import ClusterStateSection from "./Sections/ClusterStateSection";
import { CircularProgress } from "@mui/material";
import QubitComputingSection from "./Sections/QubitComputingSection";
import QubitMeasurementSection from "./Sections/QubitMeasurementSection";
import { useTranslation } from "react-i18next";
import DropDownButton from "../DropDownButton";
import { createExperiment } from "../../../model/model.api";
import { useConnectedUser } from "../../../hook/hook.user";
import { deleteProps, prepareExperiment } from "../../../utils/utils.object";
import { useMemo, useState } from "react";
import {
  CreateExperimentPayload,
  ExperimentState,
  ExperimentWithConfigs,
} from "../../../model/types/type.experiment";
import { BaseEditorPageProps } from "../../../pages/experiment/[slug]";
import { getPathWithId, Path } from "../../../model/model.routes";
import { useRouter } from "next/router";
import SystemDialog from "../../SystemDialog/SystemDialog";
import SystemAlert from "../../SystemAlert";

interface ExperimentEditorProps extends BaseEditorPageProps {
  action: () => void;
  isDialogOpen: boolean;
  setIsDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

/**
 *
 * @param props
 * @constructor
 */
function MaxRuntimeDialog(props: {
  open: boolean;
  isOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
  onButtonClick: (input?: string) => string | undefined;
  currentMaxRuntime: string;
}) {
  return (
    <SystemDialog
      defaultInput={props.currentMaxRuntime}
      inputType={"number"}
      isOpen={props.open}
      setIsOpen={props.isOpen}
      label={"Max Runtime"}
      buttonText={"Save"}
      onButtonClick={props.onButtonClick}
      title={"Set Max Runtime"}
    />
  );
}

const MAX_RUNTIME = 120;

function ExperimentEditor({
  experiment,
  setExperiment,
  isLoading,
  action,
  isDialogOpen,
  setIsDialogOpen,
}: ExperimentEditorProps) {
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const user = useConnectedUser();
  const router = useRouter();

  const inputsDisabled = useMemo(
    () => experiment.status !== ExperimentState.DRAFT,
    [experiment]
  );

  const runExperiment = async () => {
    try {
      const createExperimentPayload = {
        ...prepareExperiment(experiment, [
          "experimentId",
          "withQubitConfig",
          "config",
        ]),
        status: ExperimentState.IN_QUEUE,
      };
      createExperimentPayload.circuitId = experiment.config!.circuit_id;
      const res = await createExperiment(createExperimentPayload, user!.token);
      router.push(getPathWithId(res.experimentId, Path.ExperimentResult));
    } catch (e) {
      console.error(e);
      setError(true);
      setTimeout(() => setError(false), 5000);
    }
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
      <div className={"flex justify-end items-center"}>
        <DropDownButton
          isDisabled={inputsDisabled}
          actions={[
            {
              label: "Set Max Runtime",
              action: action,
            },
          ]}
          onClick={runExperiment}
        >
          {t("Run")}
        </DropDownButton>
      </div>
      {isDialogOpen && experiment.status === ExperimentState.DRAFT && (
        <MaxRuntimeDialog
          currentMaxRuntime={experiment.maxRuntime.toString()}
          open={isDialogOpen}
          isOpen={setIsDialogOpen}
          onButtonClick={(input) => {
            if (!input) return;
            if (+input > MAX_RUNTIME) {
              return `Has to be smaller or equal than ${MAX_RUNTIME}`;
            }
            if (+input < 1) {
              return `Has to be at least 1`;
            }
            setExperiment((prev) => ({
              ...prev,
              maxRuntime: +input,
            }));
          }}
        />
      )}
      {error && !isLoading && (
        <SystemAlert severity={"error"}>
          {t("Could not run Experiment")}
        </SystemAlert>
      )}
    </div>
  );
}

export default ExperimentEditor;
