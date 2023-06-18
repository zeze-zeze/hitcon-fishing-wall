import { useEffect, useState } from "react";
import api from "../services";
import { jsonToTable } from "../lib";

export default function GeocachingPage() {
  const [data, setData] = useState({ headers: [], data: [] });
  useEffect(() => {
    api.getAllGeocaching().then((data) => {
      const rows = jsonToTable({
        headers: ["h1", "h2", "h3"],
        data,
      });
      setData(rows);
    });
  }, []);
  return (
    <div>
      <h2 className="text-lg m-4">Geocaching Page</h2>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            {data.headers.map((header) => (
              <th
                key={header}
                className="border-b font-medium p-4 pl-8 pt-0 pb-3 text-left"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className="border-b p-4 pl-8">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="text-lg m-4">Table Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
