import { Experiment, ExperimentResult } from "./type.experiment";

export enum MockEndpoint {
  Experiment = "/experiment",
  Experiments = "/experiments",
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface BaseApiFetchPayload<T> {
  body?: T;
  endpoint: MockEndpoint;
  method: Method;
  params?: string;
}

export interface GetExperimentResponse {
  experimentConfiguration: Experiment;
  experimentResult: ExperimentResult;
}
