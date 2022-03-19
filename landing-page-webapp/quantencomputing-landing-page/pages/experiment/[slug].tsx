import React from "react";
import PageLayout from "../../components/Layout/PageLayout";
import NavbarPadding from "../../components/Layout/NavbarPadding";
import ExperimentNavbar from "../../components/Experiment/ExperimentNavbar";
import ExperimentEditor from "../../components/Experiment/Editor/ExperimentEditor";
import { useSelectedExperiment } from "../../hook/hook.experiment";
import { ExperimentWithConfigs } from "../../model/types/type.experiment";
import {
  getConfig,
  getDefaultExperimentConfig,
} from "../../model/model.experiment";

import { useRouter } from "next/router";

export interface BaseEditorPageProps {
  experiment: ExperimentWithConfigs;
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>;
  isLoading: boolean;
}

function EditorPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const router = useRouter();
  const props = useSelectedExperiment(router.query.slug as string);

  const reset = () => {
    const defaultExperiment = getDefaultExperimentConfig(
      props.experiment.experimentName
    );
    const config = getConfig(defaultExperiment);
    props.setExperiment(() => ({
      ...defaultExperiment,
      config: config,
      withQubitConfig: !!config?.qc_encoded_onoff,
      experimentId: props.experiment.experimentId,
      projectId: props.experiment.projectId,
    }));
  };

  return (
    <div style={{ backgroundColor: "#222328" }}>
      <ExperimentNavbar {...props} reset={reset} />
      <PageLayout>
        <NavbarPadding />
        <ExperimentEditor
          {...props}
          action={() => {
            setIsDialogOpen(true);
          }}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </PageLayout>
    </div>
  );
}

EditorPage.displayName = "editor";

export default EditorPage;
