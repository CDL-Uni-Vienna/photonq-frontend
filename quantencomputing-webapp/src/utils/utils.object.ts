/**
 *
 * @param obj
 * @param props
 */
export function deleteProps<T, V>(obj: V, props: (keyof V)[]): T {
  for (const prop of props) {
    delete obj[prop];
  }
  return obj as unknown as T;
}
