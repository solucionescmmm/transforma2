import React from "react";
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";

import { Radar } from "react-chartjs-2";

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const ChartBar = ({ values, labels, title, maxValues }) => {
    const options = {
        elements: {
            line: {
                borderWidth: 3
            },
            font:{
                size: 20
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: false
                },
                suggestedMin: 10,
                suggestedMax: 50
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: "right",
                labels: {
                    display:true,
                    font: {
                        size: 15
                    }
                },
            },
            title: {
                display: true,
                text: title,
                font: {
                    size: 15
                }
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

    return <Radar data={data} options={options}  />;
};

export default ChartBar;
