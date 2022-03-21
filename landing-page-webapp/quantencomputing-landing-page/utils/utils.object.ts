/**
 *
 * @param obj
 * @param props
 */
export function deleteProps<T, V>(obj: V, props: (keyof V)[]): T {
  const objCopy: V = Object.assign({}, obj);
  for (const prop of props) {
    delete objCopy[prop];
  }
  return objCopy as unknown as T;
}

export const prepareExperiment = (experiment: any, props: string[]) => {
  if (!experiment["withQubitConfig"]) {
    experiment.ComputeSettings.qubitComputing.circuitAngles = [];
  }

  // @ts-ignore
  return { ...deleteProps(experiment, props) };
};
