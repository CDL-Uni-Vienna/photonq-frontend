import { CircuitConfig } from "../../circuitConfig/circuits4Dv004";

export interface AddExperimentDialogProps {
  open: boolean;
  projectId: string;
}

export enum PresetSetting {
  Linear = "linear",
  Ghz = "ghz",
}

export enum ExperimentState {
  Running = "RUNNING",
  Failed = "FAILED",
  Done = "DONE",
}

export interface EncodedQubitMeasurement {
  encodedQubitIndex: number;
  theta: number;
  phi: number;
}

interface CircuitAngle {
  circuitAngleName: string;
  circuitAngleValue: number;
}

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
export type CreateExperimentPayload = Omit<Experiment, "status" | "id">;

/**
 * Represents the Object that is returned from the api
 */
export interface Experiment {
  createdAt: number;
  clusterState: {
    amountQubits: number;
    presetSettings: PresetSetting;
  };
  qubitComputing: {
    circuitConfiguration: string;
    circuitAngles: CircuitAngle[];
  };
  encodedQubitMeasurements: EncodedQubitMeasurement[];
  circuitId: number;
  experimentName: string;
  projectId?: string;
  maxRuntime: number;
  id: string;
  status: ExperimentState;
}

export interface ExperimentWithConfigs extends Experiment {
  config?: CircuitConfig;
  withQubitConfig: boolean;
}
