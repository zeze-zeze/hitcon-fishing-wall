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
        moment(time).format("MM-DD HH:mm:ss"),
      ]);
      setData(data);
    });
  }, []);

  // useEffect(() => {
  //   window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  // }, [data]);

  return (
    <div>
      <Table headers={["Content", "Username", "Timestamp"]} data={data} />
    </div>
  );
}
