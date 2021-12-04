import { Experiment, ExperimentResult } from "./type.experiment";

export const BASE_ENDPOINT_URL =
  process.env.REACT_APP_MOCK_API === "True"
    ? ""
    : process.env.REACT_APP_BASE_URL;

export enum Endpoint {
  Experiment = "/experiment",
  Experiments = "/experiments",
  Login = "/login/",
  Register = "/register/",
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
  token?: string;
}

export interface GetExperimentResponse {
  experimentConfiguration: Experiment;
  experimentResult: ExperimentResult;
}
