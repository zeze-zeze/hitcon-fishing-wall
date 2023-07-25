import moment from "moment/moment";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { jsonToTable } from "../lib";
import api from "../services";

export default function EmojiPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getAllEmoji().then((data) => {
      data = jsonToTable({
        headers: ["content", "username", "timestamp"],
        data,
      }).map(([txt, user, time]) => [
        txt,
        user,
        moment(time).format("YYYY-MM-DD HH:mm:ss"),
      ]);
      setData(data);
    });
  }, []);
  return (
    <div>
      <Table headers={["Content", "Username", "Timestamp"]} data={data} />
      <h2 className="text-lg m-4">Table Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
