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
import Head from "next/head";

export interface BaseEditorPageProps {
  experiment: ExperimentWithConfigs;
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>;
  isLoading: boolean;
}

function EditorPage() {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const get =
    typeof window !== "undefined" && window.location.search !== "get=false";
  const router = useRouter();
  const props = useSelectedExperiment(router.query.slug as string, get);

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
      <Head>
        <title>PhotonQ Quantum Computing</title>
      </Head>
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
