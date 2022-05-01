import React from "react";
import ContentContainer from "../../../Layout/ContentContainer";
import { secondaryDark } from "../../../../theme/theme.config";
import EditorSectionHeader from "./EditorSectionHeader";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, MenuItem, Select } from "@mui/material";
import {
  Experiment,
  ExperimentWithConfigs,
  PresetSetting,
} from "../../../../model/types/type.experiment";
import SettingsImage from "./SettingsImage";
import { CircuitConfig, circuitConfigs } from "../../../../circuitConfig/circuits4Dv004";

export interface EditorSectionProps {
  experiment: ExperimentWithConfigs;
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>;
  inputsDisabled?: boolean;
  currentConfig?: CircuitConfig,
}

export default function ClusterStateSection({
  setExperiment,
  experiment,
  inputsDisabled,
}: EditorSectionProps) {
  const { t } = useTranslation();

  const setExperimentQubitNr = (nr: number) => {
    if (
      experiment.ComputeSettings.clusterState.presetSettings ===
      PresetSetting.Ghz
    )
      return;
    setExperiment((prev) => ({
      ...prev,
      ComputeSettings: {
        ...prev.ComputeSettings,
        clusterState: {
          ...prev.ComputeSettings.clusterState,
          amountQubits: nr,
        },
      },
    }));
  };

  const setExperimentPresetSettings = (value: PresetSetting) => {
    setExperiment((prev) => ({
      ...prev,
      ComputeSettings: {
        ...prev.ComputeSettings,
        clusterState: {
          amountQubits:
            value === PresetSetting.Ghz
              ? 4
              : prev.ComputeSettings.clusterState.amountQubits,
          presetSettings: value,
        },
      },
    }));
  };

  const isButtonActive = (nr: number) => {
    return experiment.ComputeSettings.clusterState.amountQubits === nr
      ? "contained"
      : undefined;
  };

  const getSvgSource = (qubitsImage?: boolean) => {
    const config = circuitConfigs.find(
      (c) =>
        c.csp_number_of_qubits ===
        experiment.ComputeSettings.clusterState.amountQubits &&
        c.csp_preset_settings_name ===
        experiment.ComputeSettings.clusterState.presetSettings
    );
    if (!config) return "";
    return `/circuitConfig/${qubitsImage ? "csp_preset_settings_svg" : "csp_cluster_state"
      }/${qubitsImage
        ? config.csp_preset_settings_svg
        : config.csp_cluster_state
      }`;
  };

  return (
    <ContentContainer
      className={"flex space-x-10"}
      withPadding
      color={secondaryDark}
    >
      <div className={"space-y-6 w-1/2"}>
        <div>
          <EditorSectionHeader header={"Cluster State Preparation"} />
          <p className={"text-white"}>
            {t(
              "Choose your preferred number of qubits and preset settings to prepare the cluster state."
            )}
          </p>
        </div>
        <div className={"space-y-2"}>
          <h3 className={"text-white font-bold"}>{t("Number of Qubits")}</h3>
          <ButtonGroup>
            {[2, 3, 4].map((nr) =>
              inputsDisabled ||
                (nr !== 4 &&
                  experiment.ComputeSettings.clusterState.presetSettings ===
                  PresetSetting.Ghz) ? (
                experiment.ComputeSettings.clusterState.amountQubits === nr ? (
                  <Button variant="contained" key={nr}>
                    {nr}
                  </Button>
                ) : (
                  <Button key={nr} variant={"outlined"}>
                    {nr}
                  </Button>
                )
              ) : (
                <Button
                  onClick={() => setExperimentQubitNr(nr)}
                  variant={isButtonActive(nr)}
                  key={nr}
                >
                  {nr}
                </Button>
              )
            )}
          </ButtonGroup>
        </div>
        <div className="space-y-2">
          <h3 className={"text-white font-bold"}>{t("Preset Settings")}</h3>
          <div className={"flex space-x-1 items-center"}>
            {inputsDisabled ? (
              <Button variant="outlined">
                {experiment.ComputeSettings.clusterState.presetSettings}
              </Button>
            ) : (
              <Select
                size={"small"}
                className={"bg-primaryDark"}
                color={"primary"}
                defaultValue={PresetSetting.Linear}
                style={{ color: "white" }}
                value={experiment.ComputeSettings.clusterState.presetSettings}
                onChange={(e) =>
                  setExperimentPresetSettings(e.target.value as PresetSetting)
                }
              >
                {Object.values(PresetSetting).map((val, index) => (
                  <MenuItem key={index} value={val}>
                    {t(
                      `${val !== "ghz"
                        ? val.substring(0, 1).toUpperCase() + val.substring(1)
                        : val.toUpperCase()
                      } Cluster`
                    )}
                  </MenuItem>
                ))}
              </Select>
            )}
            {/*eslint-disable-next-line*/}
            <img
              className={"max-h-8"}
              src={getSvgSource(true)}
              alt={"Cluster State configuration image"}
            />
          </div>
        </div>
      </div>
      <div className={"flex flex-col justify-center text-white space-y-4"}>
        <h3 className={"font-bold text-lg"}>{t("Cluster State")}</h3>
        <div className={"border border-gray-500 p-2"}>
          <SettingsImage src={getSvgSource()} />
        </div>
      </div>
    </ContentContainer>
  );
}
