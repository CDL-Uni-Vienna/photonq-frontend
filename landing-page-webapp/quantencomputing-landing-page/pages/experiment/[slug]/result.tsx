import React from "react";
import ExperimentNavbar from "../../../components/Experiment/ExperimentNavbar";
import PageLayout from "../../../components/Layout/PageLayout";
import NavbarPadding from "../../../components/Layout/NavbarPadding";
import { useSelectedExperiment } from "../../../hook/hook.experiment";
import { ExperimentState } from "../../../model/types/type.experiment";
import AnimatedLoadingIcon from "../../../components/AnimatedLoadingIcon";
import ExperimentResult from "../../../components/Experiment/ExperimentResult";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import DownloadButton from "../../../components/DownloadButton";
import { downloadData } from "../../../utils/utils.download";
import { useRouter } from "next/router";
import { useConnectedUser } from "../../../hook/hook.user";
import { getExperimentResult } from "../../../model/model.api";
import Head from "next/head";

export default function ResultsPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const user = useConnectedUser();
  const { experiment, experimentResult, isLoading, setExperiment } =
    useSelectedExperiment(router.query.slug as string);
  async function handleDownloadExperimentResult() {
    const fullExperimentResult = await getExperimentResult(
      experiment.experimentId,
      user!.token
    );
    downloadData(
      `${experiment.experimentName}_full-results`,
      fullExperimentResult
    );
  }
  return (
    <div
      className={clsx("bg-primaryDark h-full pb-14", {
        "overflow-hidden h-screen":
          experiment.status === ExperimentState.Running ||
          experiment.status === ExperimentState.IN_QUEUE,
      })}
    >
      <Head>
        <title>PhotonQ Quantum Computing</title>
      </Head>
      <ExperimentNavbar
        reset={() => undefined}
        experiment={experiment}
        setExperiment={setExperiment}
        isLoading={isLoading}
      />
      <PageLayout>
        <NavbarPadding />
        {experiment.status === ExperimentState.Running ||
        experiment.status === ExperimentState.IN_QUEUE ? (
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
          <div>
            <ExperimentResult
              experimentResult={experimentResult}
              experiment={experiment}
            />
            <div className={"flex justify-end mt-8"}>
              <DownloadButton
                variant="contained"
                onClick={() => {
                  handleDownloadExperimentResult();
                }}
              >
                {t("Results")}
              </DownloadButton>
            </div>
          </div>
        )}
      </PageLayout>
    </div>
  );
}
