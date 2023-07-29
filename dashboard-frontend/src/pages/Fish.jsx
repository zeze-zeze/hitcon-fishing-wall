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
      });
      setData(data);
    });
  }, []);
  return (
    <div>
      <Table
        headers={["time", "username", "description", "flagCount"]}
        data={data}
        widthClasses={["w-3/12", "w-3/12", "w-5/12", "w-1/12"]}
      />
      <h2 className="text-lg m-4">Table Data</h2>
    </div>
  );
}
