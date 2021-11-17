import React, { useState } from "react";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import SectionHeader from "../components/Layout/SectionHeader";
import MainTable from "../components/ProjectTable/MainTable";
import SystemDialog from "../components/SystemDialog/SystemDialog";
import { AddExperimentDialogProps } from "../model/types/type.experiment";
import ProjectExperimentDataContextProvider from "../providers/ProjectExperimentDataProvider";

export default function MyProjectPage() {
  // const [isAddProjectDialogOpen, setIsProjectDialogOpen] = useState(false); ---FOR RELEASE 1 NOT RELEVANT---
  const [addExperimentDialogProps, setAddExperimentDialogProps] =
    useState<AddExperimentDialogProps>({
      open: false,
      projectId: "",
    });

  return (
    <PageLayout>
      <NavbarPadding />
      <SectionHeader
        withVerticalSpacing
        header={"My Experiments"}
        onClick={() =>
          setAddExperimentDialogProps((prev) => ({ ...prev, open: true }))
        }
        withButton
        buttonText={"Add new Experiment"}
      />
      <ProjectExperimentDataContextProvider>
        <MainTable setAddExperimentDialogProps={setAddExperimentDialogProps} />
        {/*---FOR RELEASE 1 NOT RELEVANT---*/}
        {/*<SystemDialog*/}
        {/*  setIsOpen={setIsProjectDialogOpen}*/}
        {/*  isOpen={isAddProjectDialogOpen}*/}
        {/*  buttonText={"Add"}*/}
        {/*  title={"Add new Project"}*/}
        {/*  label={"Project Name"}*/}
        {/*  variant={"projects"}*/}
        {/*/>*/}
        <SystemDialog
          setIsOpen={(value: boolean) =>
            setAddExperimentDialogProps((prev) => ({ ...prev, open: value }))
          }
          variant={"experiments"}
          isOpen={addExperimentDialogProps.open}
          buttonText={"Add"}
          title={"Add new Experiment"}
          label={"Experiment Name"}
        />
      </ProjectExperimentDataContextProvider>
    </PageLayout>
  );
}
