import { rest, RestRequest } from "msw";
import { getDefaultExperimentConfig } from "../model/model.experiment";
import { ExperimentState } from "../model/types/type.experiment";

export const handlers = [
  rest.get("/api/experiments/:experimentId", (req, res, context) => {
    return res(
      context.delay(500),
      context.status(201),
      context.json({
        experimentConfiguration: getDefaultExperimentConfig(
          "Experiment",
          ExperimentState.IN_QUEUE
        ),
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
      context.status(201),
      context.json([
        {
          ...getDefaultExperimentConfig("A"),
          id: "1",
          status: ExperimentState.IN_QUEUE,
        },
        {
          ...getDefaultExperimentConfig("B"),
          id: "2",
          status: ExperimentState.IN_QUEUE,
        },
        {
          ...getDefaultExperimentConfig("C"),
          id: "3",
          status: ExperimentState.IN_QUEUE,
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
