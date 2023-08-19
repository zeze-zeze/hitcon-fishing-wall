import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import api from "../services";

export default function TreasureHuntPage() {
  const [data, setData] = useState([]);
  useEffect(() => {
    api.getAllTreasureHunt().then((tsdata) => {
      const data = ["level_0", "level_1", "level_2", "level_3"].map(
        (lineKey) => ({
          id: lineKey,
          data: tsdata.map((o) => ({
            x: o.createdAt,
            y: o[lineKey],
          })),
        })
      );
      setData(data);
    });
  }, []);
  // example time graph
  // https://github.com/plouc/nivo/issues/865
  // https://nivo.rocks/storybook/?path=/docs/line--docs
  return (
    <div className="h-[60vh]">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
        xScale={{
          type: "time",
          format: "%Y-%m-%dT%H:%M:%S.%LZ",
          precision: "minute",
        }}
        yScale={{
          type: "linear",
          min: 0,
          max: "auto",
          reverse: false,
        }}
        xFormat="time:%m-%d %H:%M"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          format: "%m-%d %H:%M",
          // tickValues: "every 10 minutes",
          legend: "Time",
          legendOffset: -12,
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Headcount",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
}
