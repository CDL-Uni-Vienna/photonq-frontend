import React, { useMemo, useState } from "react";
import ContentContainer from "../../../Layout/ContentContainer";
import { secondaryDark, primaryDark } from "../../../../theme/theme.config";
import EditorSectionHeader from "./EditorSectionHeader";
import { useTranslation } from "react-i18next";
import { EditorSectionProps } from "./ClusterStateSection";
import {
  Button,
  ClickAwayListener,
  Paper,
  Popper,
  Switch,
} from "@mui/material";
import SettingsImage from "./SettingsImage";
import { usePossibleClusterConfigsQubitComputing } from "../../../../hook/hook.experiment";
import { CircuitConfig } from "../../../../circuitConfig/circuits4Dv004";

export default function QubitComputingSection({
  setExperiment,
  experiment,
}: EditorSectionProps) {
  const { currentConfigs: configs } = usePossibleClusterConfigsQubitComputing(
    experiment,
    setExperiment
  );

  const { t } = useTranslation();

  const getSrc = () => {
    return `/circuitConfig/qc_circuit_model/${experiment.config?.qc_circuit_model}`;
  };

  return (
    <ContentContainer
      withPadding
      color={secondaryDark}
      className={"relative space-y-6"}
    >
      <div className={"flex text-white"}>
        <div>
          <EditorSectionHeader header={"Qubit Computing"} />
          <p>
            {t(
              "Implement different quantum circuits byu rearranging the prepared cluster state"
            )}
          </p>
        </div>
        <div className={"absolute top-0 right-0 p-4"}>
          <Switch
            defaultChecked
            onChange={() => {
              setExperiment((prev) => ({
                ...prev,
                withQubitConfig: !prev.withQubitConfig,
              }));
            }}
          />
        </div>
      </div>
      {configs.length && experiment.withQubitConfig && (
        <div className={"flex justify-between text-white"}>
          <div className={"space-y-3"}>
            <h3 className={"font-bold"}>{t("Circuit Configuration")}</h3>
            <div className={"flex space-x-6"}>
              <div>
                <CircuitConfigSelector
                  currentConfig={experiment.config}
                  configs={configs}
                  setCurrentConfig={(circuit: CircuitConfig) => {
                    setExperiment((prev) => ({
                      ...prev,
                      config: circuit,
                    }));
                  }}
                />
              </div>
              <div>
                <p>{`${t("Encoded quibits:")} ${
                  experiment.config?.qc_encoded_qubits || "0"
                }`}</p>
                <p>{`${t("CPhase gate:")} ${
                  experiment.config?.qc_cphase_gates || "0"
                }`}</p>
              </div>
            </div>
          </div>
          <div className={"flex flex-col justify-center text-white space-y-4"}>
            <h3 className={"font-bold text-lg"}>{t("Circuit")}</h3>
            <div className={"border border-gray-500 p-2"}>
              <SettingsImage normal src={getSrc()} />
            </div>
          </div>
        </div>
      )}
    </ContentContainer>
  );
}

/**
 *
 * @param configs
 * @param currentConfig
 * @param setCurrentConfig
 * @constructor
 */
function CircuitConfigSelector({
  configs,
  currentConfig,
  setCurrentConfig,
}: {
  configs: CircuitConfig[];
  currentConfig: CircuitConfig | undefined;
  setCurrentConfig: (config: CircuitConfig) => void;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getSrc = (config?: CircuitConfig) => {
    if (!config) return "";
    return `/circuitConfig/qc_circuit_conf/${config.qc_circuit_conf}`;
  };

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const groupConfigs = () => {
    const groupedConfigs: { [key: number]: CircuitConfig[] } = {
      1: [],
      2: [],
      3: [],
      4: [],
    };
    configs.forEach((config?) => {
      if (config.qc_encoded_qubits) {
        // @ts-ignore
        groupedConfigs[config.qc_encoded_qubits].push(config);
      }
    });
    return groupedConfigs;
  };

  const groupedConfigs = useMemo(() => groupConfigs(), [configs]);

  return (
    <React.Fragment>
      <Button onClick={handleOnClick} className={"p-1 bg-primaryDark"}>
        <img src={getSrc(currentConfig)} />
      </Button>
      <Popper open={!!anchorEl} anchorEl={anchorEl} placement={"right"}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Paper
            className={"overflow-auto space-y-8 p-4"}
            style={{ backgroundColor: primaryDark }}
          >
            {Object.keys(groupedConfigs)
              .filter((key) => groupedConfigs[key as any].length)
              .map((key) => (
                <div key={key}>
                  <h3 className={"font-bold text-white"}>{`Encoded Qubits ${
                    groupedConfigs[key as any][0]?.qc_encoded_qubits
                  }`}</h3>
                  <div className={"flex"}>
                    {groupedConfigs[key as any].map((config) => (
                      <Button
                        onClick={() => {
                          setCurrentConfig(config);
                          setAnchorEl(null);
                        }}
                        key={config.circuit_id}
                      >
                        <img src={getSrc(config)} />
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </React.Fragment>
  );
}
