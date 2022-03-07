/**
 *
 * @param fileName
 * @param data
 */
export function downloadData<T extends Object>(fileName: string, data: T) {
  const blob = new Blob([JSON.stringify(data, null, "\t")]);
  const href = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = href;
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
