import React from "react";
import ExperimentNavbar from "../components/Experiment/ExperimentNavbar";
import PageLayout from "../components/Layout/PageLayout";
import NavbarPadding from "../components/Layout/NavbarPadding";
import { RouteComponentProps, withRouter } from "react-router";
import { useSelectedExperiment } from "../hook/hook.experiment";
import { ExperimentState } from "../model/types/type.experiment";
import AnimatedLoadingIcon from "../components/AnimatedLoadingIcon";
import ExperimentResult from "../components/Experiment/ExperimentResult";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

export default withRouter(function ResultsPage(
  props: RouteComponentProps<{ id: string }>
) {
  const { t } = useTranslation();
  const { experiment, experimentResult } = useSelectedExperiment(
    props.match.params.id
  );

  return (
    <div
      className={clsx("bg-primaryDark h-screen", {
        ["overflow-hidden"]: experiment.status === ExperimentState.Running,
      })}
    >
      <ExperimentNavbar />
      <PageLayout>
        <NavbarPadding />
        {experiment.status === ExperimentState.Running ? (
          <div
            className={
              "h-screen flex flex-col justify-center items-center space-y-5"
            }
          >
            <AnimatedLoadingIcon />
            <p className={"text-white text-lg"}>
              {t("Quantum computing your results …")}
            </p>
          </div>
        ) : (
          <ExperimentResult
            experimentResult={experimentResult}
            experiment={experiment}
          />
        )}
      </PageLayout>
    </div>
  );
});
