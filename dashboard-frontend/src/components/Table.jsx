/**
 * @param {{
 *   headers: string[],
 *   data: any[][],
 * }} props
 * @returns
 */
export default function Table({ headers, data }) {
  return (
    <table className="border-collapse table-auto w-full text-sm">
      <thead>
        <tr className="border-b border-zinc-900 font-medium text-left text-lg">
          {headers.map((header) => (
            <th
              key={header}
            >
              <div className="bg-lime-400 rounded-lg m-1 px-2 pt-2">{header}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-b border-zinc-400">
            {row.map((cell, j) => (
              <td key={j} className="p-2 pl-4">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}