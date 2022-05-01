import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CircuitConfig,
  circuitConfigs,
} from "../../../circuitConfig/circuits4Dv004";
import { useConnectedUser } from "../../../hook/hook.user";
import { createExperiment } from "../../../model/model.api";
import { getPathWithId, Path } from "../../../model/model.routes";
import { ExperimentState } from "../../../model/types/type.experiment";
import { BaseEditorPageProps } from "../../../pages/experiment/[slug]";
import SystemAlert from "../../SystemAlert";
import SystemDialog from "../../SystemDialog/SystemDialog";
import DropDownButton from "../DropDownButton";
import ClusterStateSection from "./Sections/ClusterStateSection";
import DemultiplexerSection from "./Sections/DemultiplexerSection";
import QubitComputingSection from "./Sections/QubitComputingSection";
import QubitMeasurementSection from "./Sections/QubitMeasurementSection";
import { deleteProps, prepareExperiment } from "../../../utils/utils.object";

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

  const currentConfig = useMemo<CircuitConfig | undefined>(
    () => circuitConfigs.find((c) => c.circuit_id === experiment.circuitId),
    [experiment.circuitId]
  );
  const inputsDisabled = useMemo<boolean>(
    () => router.query.slug !== "new",
    [router.query.slug]
  );

  const runExperiment = async () => {
    try {
      const kexperiment = prepareExperiment(experiment, ["experimentId", "withQubitConfig", "config"])
      const res = await createExperiment(
        {
          circuitId: kexperiment.circuitId,
          experimentName: kexperiment.experimentName,
          projectId: kexperiment.projectId,
          maxRuntime: kexperiment.maxRuntime,
          ComputeSettings: kexperiment.ComputeSettings,
        },
        user!.token
      );
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
        currentConfig={currentConfig}
      />
      <QubitMeasurementSection
        inputsDisabled={inputsDisabled}
        experiment={experiment}
        setExperiment={setExperiment}
        currentConfig={currentConfig}
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
