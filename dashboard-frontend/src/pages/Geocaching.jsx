import { useEffect, useState } from "react";
import Table from "../components/Table";
import { jsonToTable } from "../lib";
import api from "../services";

export default function GeocachingPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getAllGeocaching().then((data) => {
      data = jsonToTable({
        headers: ["h1", "h2", "h3"],
        data,
      });
      setData(data);
    });
  }, []);
  return (
    <div>
      <Table headers={["h1", "h2", "h3"]} data={data} />
      <h2 className="text-lg m-4">Table Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
