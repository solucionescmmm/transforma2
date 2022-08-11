import React, { useCallback, useContext, useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from "chart.js";

import { Line } from "react-chartjs-2";

import axios from "axios";
import toast from "react-hot-toast";

import { AuthContext } from "../../../../common/middlewares/Auth";
import { Box } from "@mui/system";
import { CircularProgress } from "@mui/material";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const CardGrafica = ({ intIdIdea }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState([]);

    //===============================================================================================================================================
    //========================================== Context ============================================================================================
    //===============================================================================================================================================
    const { token } = useContext(AuthContext);

    const getData = useCallback(
        async ({ signalSubmitData, intIdIdea }) => {
            setIsLoading(true);

            return await axios(
                {
                    method: "GET",
                    baseURL: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}`,
                    url: `${process.env.REACT_APP_API_TRANSFORMA_HISTORICOS_GET}`,
                    headers: {
                        token,
                    },
                    params: {
                        intIdIdea,
                    },
                },
                {
                    cancelToken: signalSubmitData.token,
                }
            )
                .then((res) => {
                    setState(res.data.data);

                    setIsLoading(false);

                    return res;
                })
                .catch((error) => {
                    if (!axios.isCancel(error)) {
                        let msg;

                        if (error.response) {
                            msg = error.response.data.msg;
                        } else if (error.request) {
                            msg = error.message;
                        } else {
                            msg = error.message;
                        }

                        toast.error(msg);

                        setState({
                            error: true,
                            msg,
                        });

                        setIsLoading(false);

                        return error;
                    }
                });
        },
        [token]
    );

    useEffect(() => {
        let signalSubmitData = axios.CancelToken.source();

        getData({ intIdIdea, signalSubmitData });

        return () => {
            signalSubmitData.cancel("Petición abortada.");
        };
    }, [getData, intIdIdea]);

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
                position: "top",
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
                data: [0, 1, 2, 3],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return <Line options={options} data={data} />;
};

export default CardGrafica;
