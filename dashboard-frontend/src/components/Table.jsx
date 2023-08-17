// https://stackoverflow.com/questions/9789723/css-text-overflow-in-a-table-cell
/**
 * A styled table, for widthClasses, see https://tailwindcss.com/docs/width
 * @param {{
 *   headers: string[],
 *   data: any[][],
 *   widthClasses: string[],
 *   holders: string[],
 * }} props
 * @returns
 */
export default function Table({
  headers,
  data,
  widthClasses = [],
  holders = [],
}) {
  return (
    <table className="border-collapse table-auto w-full text-sm mb-2">
      <thead>
        <tr className="text-center border-b border-zinc-900 font-medium text-lg">
          {headers.map((header, i) => (
            <th key={header} className={widthClasses[i]}>
              <div className="bg-lime-400 rounded-lg m-1 p-2">{header}</div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr
            key={i}
            className="text-center border-b border-zinc-400 hover:bg-zinc-100/30"
          >
            {row.map((cell, j) => (
              <td key={j} className="p-2 relative">
                <span className="absolute truncate right-3 left-3">{cell}</span>
                <span className="invisible">
                  {typeof holders[j] === "string" && holders[j].length > 0
                    ? holders[j]
                    : "a"}
                </span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
