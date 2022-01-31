import { ExperimentResolution } from "./type.experiment";

export const BASE_ENDPOINT_URL =
  process.env.NEXT_PUBLIC_MOCK_API === "True"
    ? "/api"
    : process.env.NEXT_PUBLIC_BASE_URL || "/api";

export enum Endpoint {
  Experiment = "/experiments",
  Experiments = "/experiments",
  Login = "/login",
  Register = "/register",
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

export interface GetExperimentResponse extends ExperimentResolution {}

export interface ResolutionType {}
