import {
  EncodedQubitMeasurement,
  Experiment,
  ExperimentResult,
  ExperimentState,
  ExperimentWithConfigs,
  PresetSetting,
  ResultParameters,
} from "./types/type.experiment";
import { CircuitConfig, circuitConfigs } from "../circuitConfig/circuits4Dv004";
import { format } from "date-fns";

/**
 * Returns an Experiment with default configuration
 *
 * @param experimentName
 */
export function getDefaultExperimentConfig(
  experimentName: string,
  status?: ExperimentState
): Experiment {
  return {
    ComputeSettings: {
      clusterState: {
        amountQubits: 2,
        presetSettings: PresetSetting.Linear,
      },
      qubitComputing: {
        circuitAngles: [
          {
            circuitAngleName: "alpha",
            circuitAngleValue: 0,
          }
        ],
      },
      encodedQubitMeasurements: [
        {
          encodedQubitIndex: 1,
          theta: 0,
          phi: 0,
        },
      ],
    },
    circuitId: 5,
    experimentName,
    projectId: "",
    maxRuntime: 120,
    experimentId: "83a5b1c7-6076-43a0-9f5a-a15b711e8b6c",
    status: status || ExperimentState.DRAFT,
  };
}

/**
 *
 * @param experiment
 */
export function getConfig(experiment: Experiment) {
  return circuitConfigs.find((config) => {
    return config.circuit_id === experiment.circuitId;
  });
}

/**
 *
 * @param circuitConfig
 * @param experiment
 */
export function filterSingleCircuitConfigClusterState(
  circuitConfig: CircuitConfig,
  experiment: ExperimentWithConfigs
) {
  if (
    circuitConfig.csp_number_of_qubits !==
    experiment.ComputeSettings.clusterState.amountQubits
  ) {
    return false;
  }
  return (
    circuitConfig.csp_preset_settings_name ===
    experiment.ComputeSettings.clusterState.presetSettings
  );
}

/**
 *
 * @param circuitConfig
 * @param experiment
 * @param list
 */
export function filterSingleCircuitConfigQubitComputing(
  circuitConfig: CircuitConfig,
  experiment: ExperimentWithConfigs,
  list?: boolean
) {
  if (!experiment.withQubitConfig) {
    return true;
  }
  if (!circuitConfig.qm_circuit_model || !circuitConfig.qc_circuit_model) {
    return false;
  }
  if (!experiment.config?.qc_circuit_model || list) {
    return true;
  }
  if (
    experiment.config &&
    Number(experiment.withQubitConfig) !== circuitConfig.qc_encoded_onoff
  ) {
    return false;
  }
  return !(
    experiment.config &&
    experiment.config.qm_circuit_model === circuitConfig.qm_circuit_model
  );
}

/**
 *
 * @param index
 */
export function getEmptyEncodedQubitMeasurement(
  index: number
): EncodedQubitMeasurement {
  return {
    encodedQubitIndex: index,
    phi: 0,
    theta: 0,
  };
}

/**
 *
 * @param experimentId
 * @param experimentResult
 */
export function getExecutionIndicators(
  experimentId: string,
  experimentResult: ExperimentResult
): ResultParameters[] {
  return [
    {
      label: "Execution Start Time",
      value: format(new Date(experimentResult.startTime), "Ppp"),
    },
    {
      label: "Total Counts",
      value: experimentResult.totalCounts,
    },
    {
      label: "Number of Detectors Used",
      value: experimentResult.numberOfDetectors,
    },
    {
      label: "Single Photon Rate",
      value: experimentResult.singlePhotonRate,
    },
    {
      label: "Expected Execution ID",
      value: experimentId,
    },
    {
      label: "Total Time",
      value: experimentResult.totalTime,
    },
  ];
}

/**
 *
 * @param experiment
 * @param config
 */
export function getComputationParameters(
  experiment: Experiment,
  config: CircuitConfig
): ResultParameters[] {
  return [
    {
      label: "Physical Qubits",
      value: experiment.ComputeSettings.clusterState.amountQubits,
    },
    {
      label: "Encoded Qubits",
      value: config.qc_encoded_qubits || 0,
    },
    {
      label: "Circuit ID",
      value: experiment.circuitId || 0,
    },
    {
      label: "CPhase Gates",
      value: config.qc_cphase_gates || 0,
    },
    {
      label: "Computing Parameters",
      value: convertToAngleString(
        experiment.ComputeSettings.qubitComputing.circuitAngles.map(
          (val) => val.circuitAngleValue
        )
      ),
    },
    {
      label: "Projection Parameters",
      value: convertToAngleString(
        experiment.ComputeSettings.encodedQubitMeasurements
      ),
    },
  ];
}

function convertToAngleString(angles: number[] | EncodedQubitMeasurement[]) {
  return `[${angles
    .map((angle) => {
      if (typeof angle === "number") {
        return `${angle}°`;
      }
      return `[${angle.phi}°, ${angle.theta}°]`;
    })
    .join(", ")}]`;
}
