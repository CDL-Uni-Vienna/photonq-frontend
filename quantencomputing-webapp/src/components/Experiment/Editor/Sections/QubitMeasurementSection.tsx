import React, { useEffect } from "react";
import { EditorSectionProps } from "./ClusterStateSection";
import ContentContainer from "../../../Layout/ContentContainer";
import { secondaryDark } from "../../../../theme/theme.config";
import EditorSectionHeader from "./EditorSectionHeader";
import { useTranslation } from "react-i18next";
import SettingsImage from "./SettingsImage";
import { TextField } from "@mui/material";
import clsx from "clsx";
import { getEmptyEncodedQubitMeasurement } from "../../../../model/model.experiment";
import { EncodedQubitMeasurement } from "../../../../model/types/type.experiment";
import TextFieldWithIcon from "../../../TextFieldWithIcon";

export default function QubitMeasurementSection({
  setExperiment,
  experiment,
}: EditorSectionProps) {
  const { t } = useTranslation();

  const getSrc = () => {
    return `/circuitConfig/qm_circuit_model/${experiment.config?.qm_circuit_model}`;
  };

  useEffect(() => {
    // adds array of empty EncodedQubitMeasurments to the experiment
    setExperiment((prev) => ({
      ...prev,
      encodedQubitMeasurements: Array.from({
        length: experiment.config?.qm_number_of_qubits || 0,
      }).map((_, index) => getEmptyEncodedQubitMeasurement(index + 1)),
    }));
  }, [experiment.config?.qm_number_of_qubits]);

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
              nr={1}
              experiment={experiment}
              encodedQubits={experiment.config?.qm_number_of_qubits}
              setExperiment={setExperiment}
            />
            <EncodedQubitInput
              nr={2}
              experiment={experiment}
              encodedQubits={experiment.config?.qm_number_of_qubits}
              setExperiment={setExperiment}
            />
          </div>
          <div className={"space-y-7"}>
            <EncodedQubitInput
              nr={3}
              experiment={experiment}
              encodedQubits={experiment.config?.qm_number_of_qubits}
              setExperiment={setExperiment}
            />
            <EncodedQubitInput
              nr={4}
              experiment={experiment}
              encodedQubits={experiment.config?.qm_number_of_qubits}
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
 * @constructor
 */
function EncodedQubitInput({
  nr,
  encodedQubits,
  experiment,
  setExperiment,
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
      encodedQubitMeasurements: prev.encodedQubitMeasurements.map(
        (measurement) => {
          if (measurement.encodedQubitIndex === nr) {
            return {
              ...measurement,
              [variant]: Math.min(Math.abs(Number(value)), 360),
            };
          }
          return measurement;
        }
      ),
    }));
  };

  const getValue = (
    nr: number,
    angle: keyof Omit<EncodedQubitMeasurement, "nr">
  ) => {
    return experiment.encodedQubitMeasurements.find(
      (measurement) => measurement.encodedQubitIndex === nr
    )?.[angle];
  };

  return (
    <div className={"space-y-3"}>
      <h3
        className={clsx("font-bold", {
          ["text-gray-500"]: isDisabled(),
        })}
      >{`${t("Encoded Qubit")} ${nr}`}</h3>
      <div
        className={clsx("space-y-3", {
          ["text-gray-500"]: isDisabled(),
        })}
      >
        <TextFieldWithIcon
          isDisabled={isDisabled()}
          iconsSrc={"/images/theta.svg"}
          value={"" + getValue(nr, "theta") || "0"}
          setValue={(value) => {
            handleOnChange(value, "theta");
          }}
        />
        <TextFieldWithIcon
          isDisabled={isDisabled()}
          iconsSrc={"/images/phi.svg"}
          value={"" + getValue(nr, "phi") || "0"}
          setValue={(value) => handleOnChange(value, "phi")}
        />
      </div>
    </div>
  );
}
