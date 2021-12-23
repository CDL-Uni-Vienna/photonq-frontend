import {
  Experiment,
  ExperimentResolution,
  ExperimentResolutionWithResult,
  ExperimentResult,
} from "./types/type.experiment";
import { deleteProps } from "../utils/utils.object";
import { getDefaultExperimentConfig } from "./model.experiment";

function getPropsFromResolution(
  resolution: ExperimentResolution | ExperimentResolutionWithResult,
  key: keyof ExperimentResolution
): any {
  if ("experimentConfiguration" in resolution) {
    return resolution.experimentConfiguration[key];
  }
  return resolution[key];
}

/**
 *
 * @param experimentResolution
 */
export function convertExperimentResoultionToFrontendObject(
  experimentResolution: ExperimentResolution | ExperimentResolutionWithResult
): { experiment: Experiment; result?: ExperimentResult } {
  const experiment = getDefaultExperimentConfig(
    getPropsFromResolution(experimentResolution, "experimentName"),
    getPropsFromResolution(experimentResolution, "status")
  );
  experiment.experimentId = getPropsFromResolution(
    experimentResolution,
    "experimentId"
  );
  experiment.circuitId = getPropsFromResolution(
    experimentResolution,
    "circuitId"
  );
  experiment.maxRuntime = getPropsFromResolution(
    experimentResolution,
    "maxRuntime"
  );
  experiment.projectId = getPropsFromResolution(
    experimentResolution,
    "projectId"
  );

  experiment.ComputeSettings.clusterState = deleteProps(
    getPropsFromResolution(experimentResolution, "ComputeSettings")
      .clusterState,
    ["id"]
  );

  experiment.ComputeSettings.qubitComputing = deleteProps(
    getPropsFromResolution(experimentResolution, "ComputeSettings")
      .qubitComputing,
    ["id"]
  );

  experiment.ComputeSettings.qubitComputing.circuitAngles =
    getPropsFromResolution(
      experimentResolution,
      "ComputeSettings"
    ).qubitComputing.circuitAngles.map((angle: any) => ({
      // @ts-ignore
      ...deleteProps(angle, ["id", "qubitComputing"]),
      circuitAngleValue: +angle.circuitAngleValue,
    }));

  experiment.ComputeSettings.encodedQubitMeasurements = getPropsFromResolution(
    experimentResolution,
    "ComputeSettings"
  ).encodedQubitMeasurements.map((measurement: any) => ({
    // @ts-ignore
    ...deleteProps(measurement, ["id", "ComputeSettings"]),
    phi: +measurement.phi,
    theta: +measurement.theta,
  }));

  return { experiment, result: (experimentResolution as any).experimentResult };
}
