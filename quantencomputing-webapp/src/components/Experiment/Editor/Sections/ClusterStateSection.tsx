import React from "react";
import ContentContainer from "../../../Layout/ContentContainer";
import { secondaryDark } from "../../../../theme/theme.config";
import EditorSectionHeader from "./EditorSectionHeader";
import { useTranslation } from "react-i18next";
import { Button, ButtonGroup, MenuItem, Select } from "@mui/material";
import {
  ExperimentWithConfigs,
  PresetSetting,
} from "../../../../model/types/type.experiment";
import SettingsImage from "./SettingsImage";
import { usePossibleClusterConfigsPresetSettings } from "../../../../hook/hook.experiment";

export interface EditorSectionProps {
  experiment: ExperimentWithConfigs;
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>;
}

export default function ClusterStateSection({
  setExperiment,
  experiment,
}: EditorSectionProps) {
  const { t } = useTranslation();
  const { currentCircuitConfigs: configs } =
    usePossibleClusterConfigsPresetSettings(experiment, setExperiment);

  const setExperimentQubitNr = (nr: number) => {
    if (experiment.clusterState.presetSettings === PresetSetting.Ghz) return;
    setExperiment((prev) => ({
      ...prev,
      clusterState: { ...prev.clusterState, amountQubits: nr },
    }));
  };

  const setExperimentPresetSettings = (value: PresetSetting) => {
    setExperiment((prev) => ({
      ...prev,
      clusterState: {
        amountQubits:
          value === PresetSetting.Ghz ? 4 : prev.clusterState.amountQubits,
        presetSettings: value,
      },
    }));
  };

  const isButtonActive = (nr: number) => {
    return experiment.clusterState.amountQubits === nr
      ? "contained"
      : undefined;
  };

  const getSvgSource = (qubitsImage?: boolean) => {
    if (!configs.length) return "";
    return `/circuitConfig/${
      qubitsImage ? "csp_preset_settings_svg" : "csp_cluster_state"
    }/${
      qubitsImage
        ? configs[0].csp_preset_settings_svg
        : configs[0].csp_cluster_state
    }`;
  };

  return (
    <ContentContainer
      className={"flex justify-between"}
      withPadding
      color={secondaryDark}
    >
      <div className={"space-y-6"}>
        <div>
          <EditorSectionHeader header={"Cluster State Preparation"} />
          <p className={"text-white"}>
            {t(
              "Choose your number of qubits and present settings to see the cluster state."
            )}
          </p>
        </div>
        <div className={"space-y-2"}>
          <h3 className={"text-white font-bold"}>{t("Number of Qubits")}</h3>
          <ButtonGroup>
            {[2, 3, 4].map((nr) => (
              <Button
                disabled={
                  nr !== 4 &&
                  experiment.clusterState.presetSettings === PresetSetting.Ghz
                }
                onClick={() => setExperimentQubitNr(nr)}
                variant={isButtonActive(nr)}
                key={nr}
              >
                {nr}
              </Button>
            ))}
          </ButtonGroup>
        </div>
        <div className="space-y-2">
          <h3 className={"text-white font-bold"}>{t("Preset Settings")}</h3>
          <div className={"flex space-x-1 items-center"}>
            <img className={"max-h-8"} src={getSvgSource(true)} />
            <Select
              size={"small"}
              className={"bg-primaryDark"}
              color={"primary"}
              defaultValue={PresetSetting.Linear}
              style={{ color: "white" }}
              value={experiment.clusterState.presetSettings}
              onChange={(e) =>
                setExperimentPresetSettings(e.target.value as PresetSetting)
              }
            >
              {Object.values(PresetSetting).map((val, index) => (
                <MenuItem key={index} value={val}>
                  {t(`${val} cluster`)}
                </MenuItem>
              ))}
            </Select>
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
