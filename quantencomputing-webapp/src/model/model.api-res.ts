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
  experiment.experimentId = experimentResolution.experimentId;
  experiment.circuitId = experimentResolution.circuitId;
  experiment.maxRuntime = experimentResolution.maxRuntime;
  experiment.projectId = experimentResolution.projectId;

  experiment.ComputeSettings.clusterState = deleteProps(
    experimentResolution.ComputeSettings.clusterState,
    ["id"]
  );

  experiment.ComputeSettings.qubitComputing = deleteProps(
    experimentResolution.ComputeSettings.qubitComputing,
    ["id"]
  );

  experiment.ComputeSettings.qubitComputing.circuitAngles =
    experimentResolution.ComputeSettings.qubitComputing.circuitAngles.map(
      (angle) => ({
        ...deleteProps(angle, ["id", "qubitComputing"]),
        circuitAngleValue: +angle.circuitAngleValue,
      })
    );

  experiment.ComputeSettings.encodedQubitMeasurements =
    experimentResolution.ComputeSettings.encodedQubitMeasurements.map(
      (measurement) => ({
        ...deleteProps(measurement, ["id", "ComputeSettings"]),
        phi: +measurement.phi,
        theta: +measurement.theta,
      })
    );

  return experiment;
}
