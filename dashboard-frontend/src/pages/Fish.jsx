import moment from "moment/moment";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { jsonToTable } from "../lib";
import api from "../services";

export default function FishPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getAllFish().then((data) => {
      data = jsonToTable({
        headers: ["time", "username", "description", "flagCount"],
        data,
      }).map(([time, ...rest]) => [
        moment(time).format("MM-DD HH:mm:ss"),
        ...rest,
      ]);
      setData(data);
    });
  }, []);
  return (
    <div>
      <Table
        headers={["Time", "Username", "Description", "FlagCount"]}
        holders={["08_18M12:00:00"]}
        data={data}
        widthClasses={["w-4/12", "w-2/12", "w-5/12", "w-1/12"]}
      />
    </div>
  );
}
