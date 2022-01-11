import React, { useEffect, useState } from "react";
import {
  ExperimentResult,
  ExperimentWithConfigs,
} from "../model/types/type.experiment";
import {
  filterSingleCircuitConfigClusterState,
  filterSingleCircuitConfigQubitComputing,
  getConfig,
  getDefaultExperimentConfig,
} from "../model/model.experiment";
import { CircuitConfig, circuitConfigs } from "../circuitConfig/circuits4Dv004";
import { getExperiment } from "../model/model.api";
import { useConnectedUser } from "./hook.user";
import { convertExperimentResoultionToFrontendObject } from "../model/model.api-res";

/**
 * This hook is used to get the experiment from the server.
 *
 * @param id
 */
export function useSelectedExperiment(id: string) {
  const user = useConnectedUser();
  const getDefaultData = (name: string): ExperimentWithConfigs => ({
    ...getDefaultExperimentConfig(name),
    experimentId: name,
    withQubitConfig: true,
  });

  const [experimentResult, setExperimentResult] = useState<ExperimentResult>();
  const [experiment, setExperiment] = useState<ExperimentWithConfigs>(
    getDefaultData(id)
  );
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const res = await getExperiment(id, user!.token);
      const { experiment: temp, result } =
        convertExperimentResoultionToFrontendObject(res);
      setExperiment((prev) => ({
        ...prev,
        ...temp,
        config: getConfig(temp),
      }));
      if (result) {
        setExperimentResult(result);
      }
    } catch (e) {
      // This case means that the id is a name of an experiment not an actual Id.
      // So we use the default data and let the user edit his newly created experiment.
      const currentName = window.localStorage.getItem(
        "experimentName"
      ) as string;
      window.localStorage.removeItem("experimentName");
      setExperiment((prev) => ({ ...prev, experimentName: currentName }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return {
    experiment,
    experimentResult,
    setExperiment,
    isLoading,
  };
}

/**
 * This hook returns all possible configs for the preset settings section.
 * The experiment that is passed as prop is updated accordingly.
 *
 * @param experiment
 * @param setExperiment
 */
export function usePossibleClusterConfigsPresetSettings(
  experiment: ExperimentWithConfigs,
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>
) {
  const [currentCircuitConfigs, setCurrentCircuitConfigs] = useState<
    CircuitConfig[]
  >([]);

  useEffect(() => {
    const filteredConfigs = circuitConfigs.filter((config) =>
      filterSingleCircuitConfigClusterState(config, experiment)
    );
    setCurrentCircuitConfigs(filteredConfigs);

    if (filteredConfigs.length) {
      setExperiment((prev) => ({
        ...prev,
        config:
          filteredConfigs.find(
            (config) => config.circuit_id === experiment.circuitId
          ) || filteredConfigs[0],
        circuitId:
          filteredConfigs.find(
            (config) => config.circuit_id === experiment.circuitId
          )?.circuit_id || filteredConfigs[0].circuit_id,
      }));
    }
    // eslint-disable-next-line
  }, [
    experiment.ComputeSettings.clusterState.amountQubits,
    experiment.ComputeSettings.clusterState.presetSettings,
  ]);

  return { currentCircuitConfigs };
}

/**
 * This hook returns all possible configs for the qubit computing section.
 * The experiment that is passed as prop is updated accordingly.
 *
 * @param experiment
 * @param setExperiment
 */
export function usePossibleClusterConfigsQubitComputing(
  experiment: ExperimentWithConfigs,
  setExperiment: React.Dispatch<React.SetStateAction<ExperimentWithConfigs>>
) {
  const { currentCircuitConfigs } = usePossibleClusterConfigsPresetSettings(
    experiment,
    setExperiment
  );

  const [currentConfigs, setCurrentConfigs] = useState(currentCircuitConfigs);

  const adaptData = () => {
    const filteredConfigs = currentCircuitConfigs.filter((config) =>
      filterSingleCircuitConfigQubitComputing(config, experiment, true)
    );
    setCurrentConfigs(filteredConfigs);
    const config =
      filteredConfigs.find(
        (config) => config.circuit_id === experiment.circuitId
      ) ||
      filteredConfigs.find((config) =>
        filterSingleCircuitConfigQubitComputing(config, experiment, false)
      );
    if (config) {
      setExperiment((prev) => ({
        ...prev,
        config: config,
        circuitId: config.circuit_id,
      }));
    }
  };

  useEffect(() => {
    adaptData();
    // eslint-disable-next-line
  }, [currentCircuitConfigs, experiment.withQubitConfig]);

  return { currentConfigs };
}
