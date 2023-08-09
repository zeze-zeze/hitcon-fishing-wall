import moment from "moment/moment";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { jsonToTable } from "../lib";
import api from "../services";

export default function PopcatPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getAllPopcat().then((data) => {
      data = jsonToTable({
        headers: ["username", "score", "updatedAt"],
        data,
      }).map(([name, score, time]) => [
        name === null ? "Anonymous" : name,
        score,
        moment(time).format("MM-DD HH:mm:ss"),
      ]);
      setData(data);
    });
  }, []);
  return (
    <div>
      <Table headers={["Username", "Score", "Timestamp"]} data={data} />
    </div>
  );
}
