import { Experiment, ExperimentResult } from "./type.experiment";

export const BASE_ENDPOINT_URL = "https://quantum.univie.ac.at/api/v1";

export enum Endpoint {
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
  endpoint: Endpoint;
  method: Method;
  params?: string;
}

export interface GetExperimentResponse {
  experimentConfiguration: Experiment;
  experimentResult: ExperimentResult;
}
