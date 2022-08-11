import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const CardGrafica = ({ values }) => {
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
                text: "",
            },
        },
    };

    const data = {
        labels: ["1", "2", "3", "4"],
        datasets: [
            {
                label: "Valores",
                data: [0,1,2,3],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    return <Line options={options} data={data} />;
};

export default CardGrafica;
