import { Tab } from "@headlessui/react";
import { clsx } from "clsx";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import Table from "../components/Table";
import { jsonToTable } from "../lib";
import api from "../services";

export default function DinoPage() {
  const dates = ["2023-08-18", "2023-08-19"];
  const [ranks, setRanks] = useState([]);

  useEffect(() => {
    Promise.all(dates.map((date) => api.getDinoRank({ date }))).then(
      (rankArr) => {
        rankArr = rankArr.map((data) =>
          jsonToTable({
            headers: ["username", "score", "timestamp"],
            data,
          }).map(([name, score, time]) => [
            name === null ? "Anonymous" : name,
            score,
            moment(time).format("HH:mm:ss"),
          ])
        );
        setRanks(rankArr);
      }
    );
  }, []);

  return (
    <div>
      <Tab.Group
        defaultIndex={moment().isBefore("2023-08-19T00:00:00+08:00") ? 0 : 1}
      >
        <Tab.List className="flex space-x-1 rounded-xl bg-zinc-900/20 p-1">
          {dates.map((date) => (
            <Tab
              key={date}
              className={({ selected }) =>
                clsx(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-zinc-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-zinc-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-zinc-100 shadow font-semibold"
                    : "text-zinc-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {date}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {ranks.map((rank, idx) => (
            <Tab.Panel key={idx} className="p-3">
              <Table headers={["Username", "Score", "Timestamp"]} data={rank} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
