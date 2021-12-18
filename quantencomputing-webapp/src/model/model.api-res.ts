import { Experiment, ExperimentResolution } from "./types/type.experiment";
import { deleteProps } from "../utils/utils.object";
import { getDefaultExperimentConfig } from "./model.experiment";

/**
 *
 * @param experimentResolution
 */
export function convertExperimentResoultionToFrontendObject(
  experimentResolution: ExperimentResolution
): Experiment {
  const experiment = getDefaultExperimentConfig(
    experimentResolution.experimentName,
    experimentResolution.status
  );
  const temp = deleteProps<
    Omit<ExperimentResolution, "user">,
    ExperimentResolution
  >(experimentResolution, ["user"]);

  experiment.ComputeSettings.clusterState = deleteProps(
    temp.ComputeSettings.clusterState,
    ["id"]
  );

  experiment.ComputeSettings.qubitComputing = deleteProps(
    temp.ComputeSettings.qubitComputing,
    ["id"]
  );

  experiment.ComputeSettings.qubitComputing.circuitAngles =
    temp.ComputeSettings.qubitComputing.circuitAngles.map((angle) => ({
      ...deleteProps(angle, ["id", "qubitComputing"]),
      circuitAngleValue: +angle.circuitAngleValue,
    }));

  experiment.ComputeSettings.encodedQubitMeasurements =
    temp.ComputeSettings.encodedQubitMeasurements.map((measurement) => ({
      ...deleteProps(measurement, ["id", "ComputeSettings"]),
      phi: +measurement.phi,
      theta: +measurement.theta,
    }));

  return experiment;
}
