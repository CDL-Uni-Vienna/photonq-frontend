import { rest, RestRequest } from "msw";
import { getDefaultExperimentConfig } from "../model/model.experiment";
import { ExperimentState } from "../model/types/type.experiment";

export const handlers = [
  rest.get("/api/experiments/:experimentId", (req, res, context) => {
    return res(
      context.delay(500),
      context.status(201),
      context.json({
        experimentConfiguration: {
          user: "test@test.at",
          status: "DONE",
          created: "2021-12-22T12:11:45.461307Z",
          experimentName: "test-new-backend",
          projectId: "",
          maxRuntime: 120,
          experimentId: "fd6da011-0668-496c-8457-5686ec187a03",
          circuitId: 6,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 12,
                encodedQubitIndex: 1,
                theta: "33.00",
                phi: "66.00",
                ComputeSettings: 18,
              },
            ],
            qubitComputing: {
              id: 18,
              circuitAngles: [
                {
                  id: 36,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "1.000",
                  qubitComputing: 18,
                },
                {
                  id: 37,
                  circuitAngleName: "beta",
                  circuitAngleValue: "2.000",
                  qubitComputing: 18,
                },
                {
                  id: 38,
                  circuitAngleName: "gamma",
                  circuitAngleValue: "3.000",
                  qubitComputing: 18,
                },
              ],
            },
            clusterState: {
              id: 18,
              presetSettings: "linear",
              amountQubits: 2,
            },
          },
        },
        experimentResult: {
          startTime: new Date().toISOString(),
          totalCounts: 400,
          numberOfDetectors: 7,
          singlePhotonRate: 50000,
          totalTime: 2999,
        },
      })
    );
  }),
  rest.get("/api/experiments", (req, res, context) => {
    return res(
      context.delay(500),
      context.status(200),
      context.json([
        {
          user: "test@test.at",
          status: "DONE",
          created: "2022-03-16T16:01:10.390592Z",
          experimentName: "Linear Test Omar",
          projectId: "",
          maxRuntime: 120,
          experimentId: "19897287-7cee-4e39-aac1-ee5fca158e50",
          circuitId: 11,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 49,
                encodedQubitIndex: 1,
                theta: "4.00",
                phi: "5.00",
                ComputeSettings: 42,
              },
            ],
            qubitComputing: {
              id: 42,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 91,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "1.000",
                  qubitComputing: 42,
                },
                {
                  id: 92,
                  circuitAngleName: "beta",
                  circuitAngleValue: "2.000",
                  qubitComputing: 42,
                },
                {
                  id: 93,
                  circuitAngleName: "gamma",
                  circuitAngleValue: "3.000",
                  qubitComputing: 42,
                },
              ],
            },
            clusterState: { id: 42, presetSettings: "linear", amountQubits: 4 },
          },
        },
        {
          user: "test@test.at",
          status: "DONE",
          created: "2022-03-16T16:13:10.195796Z",
          experimentName: "Linear Cluster Juan1",
          projectId: "",
          maxRuntime: 120,
          experimentId: "28565d0e-e6e2-458e-9e7b-88ef9d2fd877",
          circuitId: 11,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 50,
                encodedQubitIndex: 1,
                theta: "4.00",
                phi: "5.00",
                ComputeSettings: 43,
              },
            ],
            qubitComputing: {
              id: 43,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 94,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "1.000",
                  qubitComputing: 43,
                },
                {
                  id: 95,
                  circuitAngleName: "beta",
                  circuitAngleValue: "2.000",
                  qubitComputing: 43,
                },
                {
                  id: 96,
                  circuitAngleName: "gamma",
                  circuitAngleValue: "3.000",
                  qubitComputing: 43,
                },
              ],
            },
            clusterState: { id: 43, presetSettings: "linear", amountQubits: 4 },
          },
        },
        {
          user: "test@test.at",
          status: "DONE",
          created: "2021-12-22T15:20:04.049574Z",
          experimentName: "TestFinal",
          projectId: "",
          maxRuntime: 120,
          experimentId: "bc9b82de-ce8f-440d-a3de-3ab636b611d8",
          circuitId: 11,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 17,
                encodedQubitIndex: 1,
                theta: "22.50",
                phi: "44.60",
                ComputeSettings: 22,
              },
            ],
            qubitComputing: {
              id: 22,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 47,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "45.000",
                  qubitComputing: 22,
                },
                {
                  id: 48,
                  circuitAngleName: "beta",
                  circuitAngleValue: "22.500",
                  qubitComputing: 22,
                },
                {
                  id: 49,
                  circuitAngleName: "gamma",
                  circuitAngleValue: "45.000",
                  qubitComputing: 22,
                },
              ],
            },
            clusterState: { id: 22, presetSettings: "linear", amountQubits: 4 },
          },
        },
        {
          user: "test@test.at",
          status: "DONE",
          created: "2022-03-16T16:29:28.250519Z",
          experimentName: "horseshoe juan1",
          projectId: "",
          maxRuntime: 120,
          experimentId: "c6292dc4-59e8-4546-9f86-d69d0fd44f4c",
          circuitId: 12,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 51,
                encodedQubitIndex: 1,
                theta: "5.00",
                phi: "6.00",
                ComputeSettings: 44,
              },
              {
                id: 52,
                encodedQubitIndex: 2,
                theta: "7.00",
                phi: "8.00",
                ComputeSettings: 44,
              },
            ],
            qubitComputing: {
              id: 44,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 97,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "3.000",
                  qubitComputing: 44,
                },
                {
                  id: 98,
                  circuitAngleName: "beta",
                  circuitAngleValue: "4.000",
                  qubitComputing: 44,
                },
              ],
            },
            clusterState: { id: 44, presetSettings: "linear", amountQubits: 4 },
          },
        },
        {
          user: "test@test.at",
          status: "DONE",
          created: "2021-12-22T12:11:45.461307Z",
          experimentName: "Correct experiment",
          projectId: "",
          maxRuntime: 50,
          experimentId: "dbea25c7-dfad-47bd-8718-c76ab94346f0",
          circuitId: 6,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 11,
                encodedQubitIndex: 1,
                theta: "45.20",
                phi: "22.00",
                ComputeSettings: 17,
              },
            ],
            qubitComputing: {
              id: 17,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 33,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "45.000",
                  qubitComputing: 17,
                },
                {
                  id: 34,
                  circuitAngleName: "beta",
                  circuitAngleValue: "34.000",
                  qubitComputing: 17,
                },
                {
                  id: 35,
                  circuitAngleName: "gamma",
                  circuitAngleValue: "3.000",
                  qubitComputing: 17,
                },
              ],
            },
            clusterState: { id: 17, presetSettings: "linear", amountQubits: 2 },
          },
        },
        {
          user: "test@test.at",
          status: "DONE",
          created: "2021-12-22T12:11:45.461307Z",
          experimentName: "Ohne Project Expirement",
          projectId: "",
          maxRuntime: 50,
          experimentId: "e4edca42-ad17-4852-9364-36dc0de65036",
          circuitId: 6,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 9,
                encodedQubitIndex: 1,
                theta: "45.20",
                phi: "22.00",
                ComputeSettings: 16,
              },
              {
                id: 10,
                encodedQubitIndex: 2,
                theta: "90.00",
                phi: "20.90",
                ComputeSettings: 16,
              },
            ],
            qubitComputing: {
              id: 16,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 31,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "45.000",
                  qubitComputing: 16,
                },
                {
                  id: 32,
                  circuitAngleName: "beta",
                  circuitAngleValue: "34.000",
                  qubitComputing: 16,
                },
              ],
            },
            clusterState: { id: 16, presetSettings: "linear", amountQubits: 2 },
          },
        },
        {
          user: "test@test.at",
          status: "DONE",
          created: "2021-12-22T12:11:45.461307Z",
          experimentName: "test-new-backend",
          projectId: "",
          maxRuntime: 120,
          experimentId: "fd6da011-0668-496c-8457-5686ec187a03",
          circuitId: 5,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 12,
                encodedQubitIndex: 1,
                theta: "33.00",
                phi: "66.00",
                ComputeSettings: 18,
              },
            ],
            qubitComputing: {
              id: 18,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 36,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "1.000",
                  qubitComputing: 18,
                },
                {
                  id: 37,
                  circuitAngleName: "beta",
                  circuitAngleValue: "2.000",
                  qubitComputing: 18,
                },
                {
                  id: 38,
                  circuitAngleName: "gamma",
                  circuitAngleValue: "3.000",
                  qubitComputing: 18,
                },
              ],
            },
            clusterState: { id: 18, presetSettings: "linear", amountQubits: 2 },
          },
        },
        {
          user: "test@test.at",
          status: "DONE",
          created: "2022-03-17T18:56:20.420963Z",
          experimentName: "Test",
          projectId: "",
          maxRuntime: 120,
          experimentId: "62051d3c-3a9f-43ff-99bd-ba4394a11cd8",
          circuitId: 7,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 123,
                encodedQubitIndex: 1,
                theta: "0.00",
                phi: "0.00",
                ComputeSettings: 72,
              },
            ],
            qubitComputing: {
              id: 72,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 120,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "0.000",
                  qubitComputing: 72,
                },
                {
                  id: 121,
                  circuitAngleName: "beta",
                  circuitAngleValue: "0.000",
                  qubitComputing: 72,
                },
              ],
            },
            clusterState: { id: 72, presetSettings: "linear", amountQubits: 3 },
          },
        },
        {
          user: "test@test.at",
          status: "IN QUEUE",
          created: "2022-03-18T21:19:28.886801Z",
          experimentName: "test Felix",
          projectId: "",
          maxRuntime: 120,
          experimentId: "3deb084d-77d5-4eae-b6ae-8ea839427e09",
          circuitId: 11,
          ComputeSettings: {
            encodedQubitMeasurements: [
              {
                id: 155,
                encodedQubitIndex: 1,
                theta: "0.00",
                phi: "0.00",
                ComputeSettings: 86,
              },
            ],
            qubitComputing: {
              id: 86,
              circuitConfiguration: "horseshoe",
              circuitAngles: [
                {
                  id: 140,
                  circuitAngleName: "alpha",
                  circuitAngleValue: "0.000",
                  qubitComputing: 86,
                },
                {
                  id: 141,
                  circuitAngleName: "beta",
                  circuitAngleValue: "0.000",
                  qubitComputing: 86,
                },
                {
                  id: 142,
                  circuitAngleName: "gamma",
                  circuitAngleValue: "0.000",
                  qubitComputing: 86,
                },
              ],
            },
            clusterState: { id: 86, presetSettings: "linear", amountQubits: 4 },
          },
        },
      ])
    );
  }),
  rest.post("/api/experiments", (req: RestRequest<any>, res, context) => {
    console.warn(req);
    return res(
      context.delay(500),
      context.status(201),
      context.json({
        ...req.body,
        id: "jdfklsalfjaklsjdlflsak",
        status: "RUNNING",
      })
    );
  }),
  rest.delete("/api/experiment/:experimentId", (req, res, context) => {
    return res(context.delay(500), context.status(201));
  }),
  rest.post("/api/login", (req: RestRequest<any>, res, context) => {
    return res(
      context.delay(500),
      context.status(201),
      context.json({
        expires: new Date().toISOString(),
        token: "jdfklsjdflassshdflaksj",
        id: 1,
        email: req.body.username,
        name: req.body.name,
      })
    );
  }),
  rest.post("/api/register", (req: RestRequest<any>, res, context) => {
    return res(
      context.delay(500),
      context.status(201),
      context.json({
        id: 1,
        ...req.body,
      })
    );
  }),
];
