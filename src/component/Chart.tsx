import { FC, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto'

import { CategoryScale} from "chart.js";
import { Categories, Category } from "../store/types";

Chart.register(CategoryScale);

type ChartProps = {
    data: Categories
}


export const ChartComponent: FC<ChartProps> = (props: ChartProps) => {

    const cfg = {
        labels: [
            Object.values(props.data).map((el: Category) => el.name)
        ],
        data: {
            datasets: [
                {
                    label: "dataset-1",
                    data: Object.values(props.data).map((el: Category) => el.dates.red)
                }
            ]
        }
    }
    

    return (
        <Pie  data={{labels: cfg.labels, datasets: cfg.data.datasets}}></Pie>
    )
}