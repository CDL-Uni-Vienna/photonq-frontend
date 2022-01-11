import React from "react";
import PageLayout from "../../components/Layout/PageLayout";
import NavbarPadding from "../../components/Layout/NavbarPadding";
import ExperimentNavbar from "../../components/Experiment/ExperimentNavbar";
import ExperimentEditor from "../../components/Experiment/Editor/ExperimentEditor";
import { useSelectedExperiment } from "../../hook/hook.experiment";
import { ExperimentWithConfigs } from "../../model/types/type.experiment";
import { useRouter } from "next/router";

export interface BaseEditorPageProps {
  experiment: ExperimentWithConfigs;
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>;
  isLoading: boolean;
}

export default function EditorPage() {
  const router = useRouter();
  const props = useSelectedExperiment(router.query.slug as string);
  return (
    <div style={{ backgroundColor: "#222328" }}>
      <ExperimentNavbar {...props} />
      <PageLayout>
        <NavbarPadding />
        <ExperimentEditor {...props} />
      </PageLayout>
    </div>
  );
}
