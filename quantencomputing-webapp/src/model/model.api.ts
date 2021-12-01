import {
  BASE_ENDPOINT_URL,
  BaseApiFetchPayload,
  Endpoint,
  GetExperimentResponse,
  Method,
} from "./types/type.api";
import { CreateExperimentPayload, Experiment } from "./types/type.experiment";
import {
  LoginCredentials,
  LoginResponse,
  RegisterCredentials,
} from "./types/type.auth";

/**
 *
 * @param params
 * @param method
 * @param endpoint
 * @param stringifiedBody
 */
async function baseApiFetch<T>({
  params,
  method,
  endpoint,
  body,
}: BaseApiFetchPayload<T>) {
  return fetch(`${BASE_ENDPOINT_URL}${endpoint}${params ? "/" + params : ""}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    body: JSON.stringify(body),
  });
}

/**
 *
 * @param id
 */
export async function getExperiment(
  id: string
): Promise<GetExperimentResponse> {
  const response = await baseApiFetch({
    method: Method.GET,
    params: id,
    endpoint: Endpoint.Experiment,
  });
  if (!response.ok) throw new Error("Could not get Experiment " + id);
  return response.json();
}

/**
 *
 */
export async function getExperiments(): Promise<Experiment[]> {
  const response = await baseApiFetch({
    method: Method.GET,
    endpoint: Endpoint.Experiments,
  });
  if (!response.ok) throw new Error("Could not get Experiments");
  return response.json();
}

/**
 *
 * @param id
 * @param newExperiment
 */
export async function updateExperiment(
  id: string,
  newExperiment: CreateExperimentPayload
): Promise<Experiment> {
  await deleteExperiment(id);
  return createExperiment(newExperiment);
}

/**
 *
 * @param id
 */
export async function deleteExperiment(id: string) {
  const response = await baseApiFetch({
    method: Method.DELETE,
    params: id,
    endpoint: Endpoint.Experiment,
  });
  if (!response.ok) throw new Error("Could not delete Experiment: " + id);
  return response;
}

/**
 *
 * @param experimentPayload
 */
export async function createExperiment(
  experimentPayload: CreateExperimentPayload
): Promise<Experiment> {
  const response = await baseApiFetch<CreateExperimentPayload>({
    method: Method.POST,
    endpoint: Endpoint.Experiment,
    body: experimentPayload,
  });
  if (!response.ok) {
    throw new Error("Could not create Experiment: " + experimentPayload);
  }
  return response.json();
}

/**
 *
 * @param credentials
 */
export async function loginWthUserNameAndPassword(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response = await baseApiFetch({
    method: Method.POST,
    endpoint: Endpoint.Login,
    body: credentials,
  });
  if (!response.ok) {
    throw new Error("Could not login with credentials: " + credentials);
  }
  return response.json();
}

/**
 *
 * @param credentials
 */
export async function register(
  credentials: RegisterCredentials
): Promise<LoginResponse> {
  const response = await baseApiFetch({
    method: Method.POST,
    endpoint: Endpoint.Register,
    body: credentials,
  });
  if (!response.ok) {
    throw new Error(
      "Authorization information is missing or invalid. " + credentials
    );
  }
  return response.json();
}
