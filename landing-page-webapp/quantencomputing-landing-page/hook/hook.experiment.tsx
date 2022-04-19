import { useEffect, useState } from "react";
import { getExperiment } from "../model/model.api";
import { convertExperimentResoultionToFrontendObject } from "../model/model.api-res";
import { getDefaultExperimentConfig } from "../model/model.experiment";
import {
  Experiment,
  ExperimentResult,
  ExperimentWithConfigs,
} from "../model/types/type.experiment";
import { useConnectedUser } from "./hook.user";

/**
 * This hook is used to get the experiment from the server.
 *
 * @param id
 */
export function useSelectedExperiment(id: string | "new") {
  const user = useConnectedUser();

  const [experimentResult, setExperimentResult] = useState<ExperimentResult>();
  const [experiment, setExperiment] = useState<Experiment>(
    getDefaultExperimentConfig("")
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
      }));
      if (result) {
        setExperimentResult(result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user && id) {
      if (id !== "new") {
        getData();
      } else {
        const sp = new URLSearchParams(window.location.search);
        setExperiment({
          ...experiment,
          experimentName: sp.get("name") || "",
        });
        setIsLoading(false);
      }
    }
    // eslint-disable-next-line
  }, [user, id]);

  return {
    experiment,
    experimentResult,
    setExperiment,
    isLoading,
  };
}
