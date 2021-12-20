import React from "react";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import ExperimentNavbar from "../components/Experiment/ExperimentNavbar";
import ExperimentEditor from "../components/Experiment/Editor/ExperimentEditor";
import { useSelectedExperiment } from "../hook/hook.experiment";
import { RouteComponentProps, withRouter } from "react-router";
import { ExperimentWithConfigs } from "../model/types/type.experiment";

export interface BaseEditorPageProps {
  experiment: ExperimentWithConfigs;
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>;
  isLoading: boolean;
}

export default withRouter(function EditorPage({
  match,
}: RouteComponentProps<{ id: string }>) {
  const props = useSelectedExperiment(match.params.id);
  return (
    <div style={{ backgroundColor: "#222328" }}>
      <ExperimentNavbar {...props} />
      <PageLayout>
        <NavbarPadding />
        <ExperimentEditor {...props} />
      </PageLayout>
    </div>
  );
});
