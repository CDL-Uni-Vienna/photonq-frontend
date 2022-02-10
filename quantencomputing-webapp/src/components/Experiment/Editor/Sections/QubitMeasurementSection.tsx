import React, { useEffect } from "react";
import { EditorSectionProps } from "./ClusterStateSection";
import ContentContainer from "../../../Layout/ContentContainer";
import { secondaryDark } from "../../../../theme/theme.config";
import EditorSectionHeader from "./EditorSectionHeader";
import { useTranslation } from "react-i18next";
import SettingsImage from "./SettingsImage";
import clsx from "clsx";
import { getEmptyEncodedQubitMeasurement } from "../../../../model/model.experiment";
import {
  EncodedQubitMeasurement,
  ExperimentState,
} from "../../../../model/types/type.experiment";
import TextFieldWithIcon from "../../../TextFieldWithIcon";

export default function QubitMeasurementSection({
  setExperiment,
  experiment,
  inputsDisabled,
}: EditorSectionProps) {
  const { t } = useTranslation();

  const getSrc = () => {
    return `/circuitConfig/qm_circuit_model/${experiment.config?.qm_circuit_model}`;
  };

  const getEncodedQubits = () => {
    return experiment.withQubitConfig
      ? experiment.config?.qm_number_of_qubits || 0
      : experiment.config?.csp_number_of_qubits || 0;
  };

  const setInitialEncodedQubitMeasurements = () => {
    if (experiment.status !== ExperimentState.DRAFT) {
      return;
    }
    setExperiment((prev) => ({
      ...prev,
      ComputeSettings: {
        ...prev.ComputeSettings,
        encodedQubitMeasurements: Array.from({
          length: getEncodedQubits(),
        }).map((_, index) => getEmptyEncodedQubitMeasurement(index + 1)),
      },
    }));
  };

  useEffect(() => {
    // adds array of empty EncodedQubitMeasurments to the experiment
    setInitialEncodedQubitMeasurements();
    // eslint-disable-next-line
  }, [experiment.config?.qm_number_of_qubits, experiment.withQubitConfig]);

  return (
    <ContentContainer withPadding color={secondaryDark} className={"space-y-6"}>
      <div>
        <EditorSectionHeader header={"Qubit Measurements"} />
        <p className={"text-white"}>
          {t(
            "Choose the basis on which to measure each qubit and perform a measurement based quantum computation."
          )}
        </p>
      </div>
      <div className={"flex space-x-10 text-white"}>
        <div className={"flex space-x-5 w-1/2"}>
          <div className={"space-y-7"}>
            <EncodedQubitInput
              inputsDisabled={inputsDisabled}
              nr={1}
              experiment={experiment}
              encodedQubits={getEncodedQubits()}
              setExperiment={setExperiment}
            />
            <EncodedQubitInput
              inputsDisabled={inputsDisabled}
              nr={2}
              experiment={experiment}
              encodedQubits={getEncodedQubits()}
              setExperiment={setExperiment}
            />
          </div>
          <div className={"space-y-7"}>
            <EncodedQubitInput
              inputsDisabled={inputsDisabled}
              nr={3}
              experiment={experiment}
              encodedQubits={getEncodedQubits()}
              setExperiment={setExperiment}
            />
            <EncodedQubitInput
              inputsDisabled={inputsDisabled}
              nr={4}
              experiment={experiment}
              encodedQubits={getEncodedQubits()}
              setExperiment={setExperiment}
            />
          </div>
        </div>
        <div>
          <div
            className={
              "flex flex-col justify-center text-white space-y-4 h-full"
            }
          >
            <div className={"border border-gray-500 p-2"}>
              <SettingsImage normal src={getSrc()} />
            </div>
          </div>
        </div>
      </div>
    </ContentContainer>
  );
}

/**
 *
 * @param nr
 * @param encodedQubits
 * @param experiment
 * @param setExperiment
 * @param inputsDisabled
 * @constructor
 */
function EncodedQubitInput({
  nr,
  encodedQubits,
  experiment,
  setExperiment,
  inputsDisabled,
}: {
  nr: number;
  encodedQubits?: number | null;
} & EditorSectionProps) {
  const { t } = useTranslation();

  const isDisabled = () => !!encodedQubits && nr > encodedQubits;

  const handleOnChange = (
    value: string,
    variant: keyof Omit<EncodedQubitMeasurement, "nr">
  ) => {
    setExperiment((prev) => ({
      ...prev,
      ComputeSettings: {
        ...prev.ComputeSettings,
        encodedQubitMeasurements:
          prev.ComputeSettings.encodedQubitMeasurements.map((measurement) => {
            if (measurement.encodedQubitIndex === nr) {
              return {
                ...measurement,
                [variant]: Math.min(Math.abs(Number(value)), 360),
              };
            }
            return measurement;
          }),
      },
    }));
  };

  const getValue = (
    nr: number,
    angle: keyof Omit<EncodedQubitMeasurement, "nr">
  ) => {
    return experiment.ComputeSettings.encodedQubitMeasurements.find(
      (measurement) => measurement.encodedQubitIndex === nr
    )?.[angle];
  };

  return (
    <div className={"space-y-3"}>
      <h3
        className={clsx("font-bold", {
          "text-gray-500": isDisabled(),
        })}
      >{`${t("Encoded Qubit")} ${nr}`}</h3>
      <div
        className={clsx("space-y-3", {
          "text-gray-500": isDisabled(),
        })}
      >
        <TextFieldWithIcon
          isDisabled={isDisabled() || inputsDisabled}
          iconsSrc={"/images/theta.svg"}
          value={"" + (getValue(nr, "theta") || "0")}
          setValue={(value) => {
            handleOnChange(value, "theta");
          }}
        />
        <TextFieldWithIcon
          isDisabled={isDisabled() || inputsDisabled}
          iconsSrc={"/images/phi.svg"}
          value={"" + (getValue(nr, "phi") || "0")}
          setValue={(value) => handleOnChange(value, "phi")}
        />
      </div>
    </div>
  );
}
