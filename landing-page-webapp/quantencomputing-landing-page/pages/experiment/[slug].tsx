import React, { useEffect } from "react";
import PageLayout from "../../components/Layout/PageLayout";
import NavbarPadding from "../../components/Layout/NavbarPadding";
import ExperimentNavbar from "../../components/Experiment/ExperimentNavbar";
import ExperimentEditor from "../../components/Experiment/Editor/ExperimentEditor";
import { useSelectedExperiment } from "../../hook/hook.experiment";
import { Experiment } from "../../model/types/type.experiment";
import { getDefaultExperimentConfig } from "../../model/model.experiment";

import { useRouter } from "next/router";
import Head from "next/head";

export interface BaseEditorPageProps {
  experiment: Experiment;
  setExperiment: React.Dispatch<React.SetStateAction<Experiment>>;
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
    props.setExperiment({
      ...defaultExperiment,
      experimentId: props.experiment.experimentId,
      projectId: props.experiment.projectId,
    });
  };

  return (
    <div style={{ backgroundColor: "#222328" }}>
      <Head>
        <title>PhotonQ - Photonic Quantum Computing</title>
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
