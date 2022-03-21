import React, { useMemo } from "react";
import {
  Experiment,
  ExperimentResult,
} from "../../model/types/type.experiment";
import ContentContainer from "../Layout/ContentContainer";
import { secondaryDark } from "../../theme/theme.config";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import SettingsImage from "./Editor/Sections/SettingsImage";
import {
  getComputationParameters,
  getConfig,
  getExecutionIndicators,
} from "../../model/model.experiment";
import AnimatedLoadingIcon from "../AnimatedLoadingIcon";
import DownloadButton from "../DownloadButton";
import { downloadData } from "../../utils/utils.download";

interface ExperimentResultProps {
  experiment: Experiment;
  experimentResult?: ExperimentResult;
}

export default function ExperimentResultContainer({
  experiment,
  experimentResult,
}: ExperimentResultProps) {
  const config = useMemo(() => getConfig(experiment), [experiment]);
  const { t } = useTranslation();

  if (!experimentResult)
    return (
      <div className={"h-screen flex items-center justify-center"}>
        <AnimatedLoadingIcon />
      </div>
    );

  const getResultSvgSrc = (fallback?: boolean) => {
    if (fallback) {
      return `/circuitConfig/qm_circuit_model/${
        config?.results_circuit_model || ""
      }`;
    }
    return `/circuitConfig/results_circuit_model/${
      config?.results_circuit_model || ""
    }`;
  };

  const getQubitConfigSrc = () => {
    return `/circuitConfig/qc_circuit_conf/${config?.qc_circuit_conf || ""}`;
  };

  return (
    <ContentContainer
      withPadding
      color={secondaryDark}
      className={"space-y-10 mt-16"}
    >
      <div className={"text-white"}>
        <h2 className={"text-2xl font-bold"}>{t("Results")}</h2>
        <p className={"font-bold"}>
          {format(new Date(experimentResult.startTime), "Pp")}
        </p>
      </div>
      <div className={"flex"}>
        <div className={"border border-gray-500 p-2"}>
          <SettingsImage
            normal
            onError={(setSrc) => setSrc(getResultSvgSrc(true))}
            src={getResultSvgSrc()}
          />
        </div>
      </div>
      <div style={{ width: "fit-content" }} className={"bg-primaryDark p-1"}>
        {config?.qc_circuit_model && (
          // eslint-disable-next-line jsx-a11y/img-redundant-alt
          <img src={getQubitConfigSrc()} alt={"Circuit Modal config image"} />
        )}
      </div>
      <div className={"flex space-x-32 text-white"}>
        <div className={"space-y-5"}>
          <h3 className={"font-bold text-xl"}>{t("Computation parameters")}</h3>
          {getComputationParameters(experiment, config!).map((param, index) => (
            <div key={index} className={"flex justify-between space-x-12"}>
              <p>{param.label}</p>
              <p>{param.value}</p>
            </div>
          ))}
          <DownloadButton
            onClick={() => downloadData(experiment.experimentName, experiment)}
          >
            {t("Computation Configuration File")}
          </DownloadButton>
        </div>
        <div className={"space-y-5"}>
          <h3 className={"font-bold text-xl"}>{t("Execution Indicators")}</h3>
          {getExecutionIndicators(
            experiment.experimentId,
            experimentResult!
          ).map((param, index) => (
            <div key={index} className={"flex justify-between space-x-12"}>
              <p>{param.label}</p>
              <p>{param.value}</p>
            </div>
          ))}
        </div>
      </div>
    </ContentContainer>
  );
}
