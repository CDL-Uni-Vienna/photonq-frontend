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
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    variant: keyof Omit<EncodedQubitMeasurement, "nr">
  ) => {
    setExperiment((prev) => ({
      ...prev,
      encodedQubitMeasurements: prev.encodedQubitMeasurements.map(
        (measurement) => {
          if (measurement.encodedQubitIndex === nr) {
            return {
              ...measurement,
              [variant]: Math.min(Math.abs(Number(e.target.value)), 360),
            };
          }
          return measurement;
        }
      ),
    }));
  };

  return (
    <div className={"space-y-3"}>
      <h3
        className={clsx("font-bold", {
          ["text-gray-500"]: isDisabled(),
        })}
      >{`${t("Encoded Qubit")} ${nr}`}</h3>
      <div
        className={clsx("flex items-center space-x-2", {
          ["text-gray-500"]: isDisabled(),
        })}
      >
        <embed src="/images/theta.svg" />
        <TextField
          inputProps={{
            style: {
              color: "white",
            },
          }}
          value={
            experiment.encodedQubitMeasurements.find(
              (measurement) => measurement.encodedQubitIndex === nr
            )?.theta || ""
          }
          type={"number"}
          disabled={isDisabled()}
          size={"small"}
          onChange={(e) => handleOnChange(e, "theta")}
          color={"primary"}
          className={clsx({
            ["bg-primaryDark rounded-sm"]: !isDisabled(),
          })}
        />
      </div>
      <div className={"flex items-center space-x-2"}>
        <embed src="/images/phi.svg" />
        <TextField
          inputProps={{
            style: {
              color: "white",
            },
          }}
          value={
            experiment.encodedQubitMeasurements.find(
              (measurement) => measurement.encodedQubitIndex === nr
            )?.phi || ""
          }
          type={"number"}
          onChange={(e) => handleOnChange(e, "phi")}
          disabled={isDisabled()}
          size={"small"}
          color={"primary"}
          className={clsx({
            ["bg-primaryDark rounded-sm"]: !isDisabled(),
          })}
        />
      </div>
    </div>
  );
}
