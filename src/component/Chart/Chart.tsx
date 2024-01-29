import { FC, useRef } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { CategoryScale } from "chart.js";
import { Categories, Category, CostDate } from "../../store/types";
import { Colors } from "chart.js";

const CHART_COLORS = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)",
};

Chart.register(CategoryScale);
Chart.register(Colors);

type ChartProps = {
  data: { name: string; count: number }[];
};

export const ChartComponent: FC<ChartProps> = (props: ChartProps) => {
  const chartRef = useRef<Chart>();

  const cfg = {
    labels: Object.values(props.data).map((el) => el.name),

    data: {
      datasets: [
        {
          label: "dataset-1",
          data: props.data.map((el) => el.count),
          backgroundColor: [
            "#0074D9",
            "#FF4136",
            "#2ECC40",
            "#FF851B",
            "#7FDBFF",
            "#B10DC9",
            "#FFDC00",
            "#001f3f",
            "#39CCCC",
            "#01FF70",
            "#85144b",
            "#F012BE",
            "#3D9970",
            "#111111",
            "#AAAAAA",
          ],
        },
      ],
    },
  };

  return (
    <Pie
      className="statistics__chart"
      data={{ labels: cfg.labels, datasets: cfg.data.datasets }}
    ></Pie>
  );
};

let a = { mgkfhdmlhnh: { dates: { dkngdk: { total: 200 } } } };

export default ChartComponent;
