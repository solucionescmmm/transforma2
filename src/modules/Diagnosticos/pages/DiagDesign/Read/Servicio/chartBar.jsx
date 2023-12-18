import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartBar = ({ values, labels, title, maxValues }) => {
    const options = {
        indexAxis: "y",
        elements: {
            bar: {
                borderWidth: 2,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: "right",
            },
            title: {
                display: true,
                text: title,
            },
        },
    };

    const data = {
        type:"radar",
        labels,
        datasets: [
            {
                label: 'Puntaje',
                data: values,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            },
            {
                label: 'Ideal',
                data: maxValues,
                fill:false,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            },
        ],
    };

    return <Radar options={options} data={data} />;
};

export default ChartBar;
