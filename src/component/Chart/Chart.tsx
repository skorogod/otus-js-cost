import { FC, useRef } from "react";
import { Pie } from "react-chartjs-2";
import Chart from "chart.js/auto";

import { CategoryScale } from "chart.js";
import { Categories, Category, CostDate } from "../../store/types";


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

type ChartProps = {
  data: {name: string, count: number}[]
};



export const ChartComponent: FC<ChartProps> = (props: ChartProps) => {
  const chartRef = useRef<Chart>();

  const cfg = {
    labels: Object.values(props.data).map((el) => el.name),

    data: {
      datasets: [
        {
          label: "dataset-1",
          data: props.data.map(el => el.count),
          backgroundColor: [CHART_COLORS.red, CHART_COLORS.purple],
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
