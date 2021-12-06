import React, { createContext, ReactNode, useEffect, useState } from "react";
import { BaseProviderType } from "../model/types/type.provider";
import { CircularProgress } from "@mui/material";
import { Experiment } from "../model/types/type.experiment";
import { getExperiments } from "../model/model.api";
import { useConnectedUser } from "../hook/hook.user";
import SystemAlert from "../components/SystemAlert";

export interface ProjectExperimentDataProviderProps<
  P extends Array<any>,
  E extends Array<any>
> {
  projects: BaseProviderType<P>;
  experiments: BaseProviderType<E>;
}

export const ProjectExperimentDataContext = createContext<
  // TODO: REPLACING ANY WITH REAL TYPE
  ProjectExperimentDataProviderProps<any, Experiment[]>
>({
  experiments: { value: [], setValue: () => {} },
  projects: { value: [], setValue: () => {} },
});

interface Props {
  children: ReactNode;
}

export default function ProjectExperimentDataContextProvider({
  children,
}: Props) {
  const user = useConnectedUser();
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [error, setError] = useState<boolean>(false);

  const getData = async () => {
    try {
      const res = await getExperiments(user!.token);
      setExperiments(res);
      setError(false);
    } catch (e) {
      console.error(e);
      setError(true);
    } finally {
      setIsLoading(() => false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className={"flex justify-center items-center"}>
        <CircularProgress size={50} />
      </div>
    );
  }

  return (
    <ProjectExperimentDataContext.Provider
      value={{
        projects: { value: projects, setValue: setProjects },
        experiments: { value: experiments, setValue: setExperiments },
      }}
    >
      {children}
      {error && !isLoading && (
        <SystemAlert severity="error">Could not get Experiments</SystemAlert>
      )}
    </ProjectExperimentDataContext.Provider>
  );
}
