import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import TextFieldWithIcon from "../../../TextFieldWithIcon";
import { CircuitAngleName } from "../../../../model/types/type.experiment";

const greekIconSources = [
  "/images/phi.svg",
  "/images/phi.svg",
  "/images/phi.svg",
];

const angleNames: CircuitAngleName[] = ["alpha", "beta", "gamma"];

export default function QubitComputingSection({
  setExperiment,
  experiment,
  inputsDisabled,
}: EditorSectionProps) {
  const { currentConfigs: configs } = usePossibleClusterConfigsQubitComputing(
    experiment,
    setExperiment
  );

  const { t } = useTranslation();

  const getSrc = () => {
    return `/circuitConfig/qc_circuit_model/${experiment.config?.qc_circuit_model}`;
  };

  const getAngleValue = (angleName: CircuitAngleName) => {
    return (
      experiment.qubitComputing.circuitAngles.find(
        (angle) => angle.circuitAngleName === angleName
      )?.circuitAngleValue || "0"
    );
  };

  const handleAngleInputChange = (
    value: string,
    angleName: CircuitAngleName
  ) => {
    setExperiment((prev) => ({
      ...prev,
      qubitComputing: {
        ...prev.qubitComputing,
        circuitAngles: prev.qubitComputing.circuitAngles.map((angle) =>
          angle.circuitAngleName === angleName
            ? {
                ...angle,
                circuitAngleValue: Math.min(Math.abs(Number(value)), 360),
              }
            : angle
        ),
      },
    }));
  };

  useEffect(() => {
    // adds array of empty Angles to the experiment
    setExperiment((prev) => ({
      ...prev,
      qubitComputing: {
        ...prev.qubitComputing,
        circuitAngles: Array.from({
          length: 4 - (experiment.config?.qc_encoded_qubits || 4),
        }).map((_, index) => ({
          circuitAngleName: angleNames[index],
          circuitAngleValue: 0,
        })),
      },
    }));
    // eslint-disable-next-line
  }, [experiment.config?.qc_encoded_qubits]);

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
          <div className={"flex items-center space-x-4"}>
            <p>{experiment.withQubitConfig ? "On" : "Off"}</p>
            <Switch
              disabled={inputsDisabled}
              checked={experiment.withQubitConfig}
              onChange={() => {
                setExperiment((prev) => ({
                  ...prev,
                  withQubitConfig: !prev.withQubitConfig,
                }));
              }}
            />
          </div>
        </div>
      </div>
      {configs.length && experiment.withQubitConfig && (
        <div className={"flex space-x-10 text-white"}>
          <div className={"space-y-3 w-1/2"}>
            <h3 className={"font-bold"}>{t("Circuit Configuration")}</h3>
            <div className={"flex space-x-6"}>
              <div>
                <CircuitConfigSelector
                  inputsDisabled={inputsDisabled}
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
                <p>{`${t("Encoded quibts:")} ${
                  experiment.config?.qc_encoded_qubits || "0"
                }`}</p>
                <p>{`${t("CPhase gate:")} ${
                  experiment.config?.qc_cphase_gates || "0"
                }`}</p>
                <div className={"space-y-3 mt-2"}>
                  {Array.from({
                    length: 4 - (experiment.config?.qc_encoded_qubits || 4),
                  }).map((_, index) => (
                    <TextFieldWithIcon
                      isDisabled={inputsDisabled}
                      key={index}
                      iconsSrc={greekIconSources[index]}
                      value={"" + getAngleValue(angleNames[index])}
                      setValue={(value) => {
                        handleAngleInputChange(value, angleNames[index]);
                      }}
                    />
                  ))}
                </div>
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
 * @param inputsDisabled
 * @constructor
 */
function CircuitConfigSelector({
  configs,
  currentConfig,
  setCurrentConfig,
  inputsDisabled,
}: {
  configs: CircuitConfig[];
  currentConfig: CircuitConfig | undefined;
  setCurrentConfig: (config: CircuitConfig) => void;
  inputsDisabled?: boolean;
}) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getSrc = (config?: CircuitConfig) => {
    if (!config) return "";
    return `/circuitConfig/qc_circuit_conf/${config.qc_circuit_conf}`;
  };

  const handleOnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const groupConfigs = useCallback(() => {
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
  }, [configs]);

  const groupedConfigs = useMemo(() => groupConfigs(), [groupConfigs]);

  return (
    <React.Fragment>
      <Button
        disabled={inputsDisabled}
        style={{ backgroundColor: primaryDark }}
        onClick={handleOnClick}
        className={"p-1"}
      >
        <img src={getSrc(currentConfig)} alt={""} />
      </Button>
      <Popper open={!!anchorEl} anchorEl={anchorEl} placement={"right"}>
        <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
          <Paper
            className={"overflow-auto space-y-8 p-4"}
            style={{ backgroundColor: secondaryDark }}
          >
            {Object.keys(groupedConfigs)
              .filter((key) => groupedConfigs[key as any].length)
              .map((key) => (
                <div className={"space-y-2"} key={key}>
                  <h3 className={"font-bold text-white"}>{`Encoded Qubits ${
                    groupedConfigs[key as any][0]?.qc_encoded_qubits
                  }`}</h3>
                  <div className={"flex space-x-2"}>
                    {groupedConfigs[key as any].map((config) => (
                      <Button
                        style={{ backgroundColor: primaryDark }}
                        onClick={() => {
                          setCurrentConfig(config);
                          setAnchorEl(null);
                        }}
                        key={config.circuit_id}
                      >
                        <img src={getSrc(config)} alt={""} />
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
