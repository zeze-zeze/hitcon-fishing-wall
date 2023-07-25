import moment from "moment/moment";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { jsonToTable } from "../lib";
import api from "../services";

export default function DinoPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getAllDino().then((data) => {
      data = jsonToTable({
        headers: ["username", "score", "updatedAt"],
        data,
      }).map(([name, score, time]) => [
        name === null ? "Anonymous" : name,
        score,
        moment(time).format("YYYY-MM-DD HH:mm:ss"),
      ]);
      setData(data);
    });
  }, []);
  return (
    <div>
      <Table headers={["Username", "Score", "Timestamp"]} data={data} />
      <h2 className="text-lg m-4">Table Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
