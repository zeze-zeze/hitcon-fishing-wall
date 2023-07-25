/**
 * @param {{
 *   headers: string[],
 *   data: {[key: string]: any}[],
 * }}
 */
export function jsonToTable({ headers, data }) {
  const rows = data.map((item) => {
    return headers.map((key) => item[key]);
  });
  return rows;
}
