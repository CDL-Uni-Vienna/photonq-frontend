import { CircuitConfig } from "../../circuitConfig/circuits4Dv004";

export interface AddExperimentDialogProps {
  open: boolean;
  projectId: string;
}

/**
 *
 */
export enum PresetSetting {
  Linear = "linear",
  Ghz = "ghz",
}

/**
 *
 */
export enum ExperimentState {
  IN_QUEUE = "IN QUEUE",
  Running = "RUNNING",
  Failed = "FAILED",
  Done = "DONE",
  DRAFT = "DRAFT",
}

/**
 *
 */
export interface ResultParameters {
  label: string;
  value: string | number;
}

/**
 *
 */
export type CircuitAngleName = "alpha" | "beta" | "gamma";

/**
 *
 */
export interface EncodedQubitMeasurement {
  encodedQubitIndex: number;
  theta: number;
  phi: number;
}

/**
 *
 */
export interface EncodedQubitMeasurementResolution
  extends EncodedQubitMeasurement {
  id: number;
  ComputeSettings: number;
}

/**
 *
 */
interface CircuitAngle<T> {
  circuitAngleName: CircuitAngleName;
  circuitAngleValue: T;
}

/**
 *
 */
interface CircuitAngleResolution extends CircuitAngle<string> {
  id: number;
  qubitComputing: number;
}

/**
 *
 */
export interface BaseExperimentInformation {
  circuitId: number;
  experimentName: string;
  projectId?: string;
  maxRuntime: number;
  experimentId: string;
  status: ExperimentState;
}

/**
 *
 */
export interface ExperimentResult {
  startTime: string;
  totalCounts: number;
  numberOfDetectors: number;
  singlePhotonRate: number;
  totalTime: number;
}

/**
 * Used to create a new experiment
 */
export type CreateExperimentPayload = Omit<
  Experiment,
  "status" | "experimentId"
>;

/**
 * Represents the Object that is returned from the api
 */
export interface ExperimentResolution extends BaseExperimentInformation {
  ComputeSettings: {
    clusterState: {
      amountQubits: number;
      presetSettings: PresetSetting;
      id: number;
    };
    qubitComputing: {
      circuitConfiguration: string;
      circuitAngles: CircuitAngleResolution[];
      id: number;
    };
    encodedQubitMeasurements: EncodedQubitMeasurementResolution[];
  };
  user: string;
}

export interface ExperimentResolutionWithResult {
  experimentConfiguration: ExperimentResolution;
  experimentResult: ExperimentResult;
}

/**
 * Represents the Object that is used in the frontend
 */
export interface Experiment extends BaseExperimentInformation {
  ComputeSettings: {
    clusterState: {
      amountQubits: number;
      presetSettings: PresetSetting;
    };
    qubitComputing: {
      circuitAngles: CircuitAngle<number>[];
    };
    encodedQubitMeasurements: EncodedQubitMeasurement[];
  };
}

/**
 *
 */
export interface ExperimentWithConfigs extends Experiment {
  config?: CircuitConfig;
  withQubitConfig?: boolean;
}
