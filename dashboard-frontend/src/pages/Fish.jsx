import { useEffect, useState } from "react";
import Table from "../components/Table";
import { jsonToTable } from "../lib";
import api from "../services";

export default function FishPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getAllFish().then((data) => {
      data = jsonToTable({
        headers: ["time", "username", "description"],
        data,
      });
      setData(data);
    });
  }, []);
  return (
    <div>
      <Table headers={["time", "username", "description"]} data={data} />
      <h2 className="text-lg m-4">Table Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
