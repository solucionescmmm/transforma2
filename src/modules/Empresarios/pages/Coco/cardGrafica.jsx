import React, {
    Fragment,
    useCallback,
    useContext,
    useEffect,
    useState,
} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    TimeScale,
    TimeSeriesScale,
} from "chart.js";

import { Line } from "react-chartjs-2";

import axios from "axios";
import toast from "react-hot-toast";

//Librerias
import { parseISO, format } from "date-fns";

import { AuthContext } from "../../../../common/middlewares/Auth";
import { Box } from "@mui/system";
import { CircularProgress, Grid } from "@mui/material";
import "chartjs-adapter-moment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
    TimeSeriesScale
);

const CardGrafica = ({ intIdIdea, type }) => {
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

    const fntRenderLine = () => {
        if (type === "Desarrollo" && state) {
            const { arrEtapaDllo } = state;

            const ejeX = [];
            const ejeY = [];

            arrEtapaDllo?.forEach((v, i) => {
                console.log(v)
                ejeX.push({
                    x: parseISO(v.dtmCreacion),
                    y: v.intIdPuntaje,
                });

                ejeY.push(format(parseISO(v.dtmCreacion), "yyyy MM dd"));
            });

            const options = {
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            gridLines: {
                                lineWidth: 2,
                            },
                            title: {
                                display: true,
                                text: "Fecha",
                            },
                            time: {
                                tooltipFormat: "YYYY MM DD",
                                unit: "month",
                            },
                        },
                    ],
                    y: {
                        ticks: {
                            beginAtZero: true,
                            callback: (value, index, values) => {

                                console.log(values)
                                switch (value) {
                                    case 2:
                                        return "Fortalecimiento empresarial I";
                                    case 4:
                                        return "Desarrollo";
                                    case 6:
                                        return "Etiqueta para 6"; // Reemplaza con tu etiqueta
                                    // Continúa para los demás valores
                                    default:
                                        return value;
                                }
                            },
                        },
                    },
                },
            };

            const data = {
                labels: ejeY,
                datasets: [
                    {
                        label: "Etapa de desarrollo",
                        data: ejeX,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderWidth: 1,
                    },
                ],
            };

            return (
                <Fragment>
                    <Grid item xs={12}>
                        <Line options={options} data={data} />
                    </Grid>
                </Fragment>
            );
        }

        if (type === "Empleados" && state) {
            const { arrNumeroEmpleados } = state;

            const ejeX = [];
            const ejeY = [];

            arrNumeroEmpleados?.forEach((v) => {
                ejeX.push({
                    x: parseISO(v.dtmCreacion),
                    y: v.intNumeroEmpleados,
                });

                ejeY.push(format(parseISO(v.dtmCreacion), "yyyy MM dd"));
            });

            const options = {
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            gridLines: {
                                lineWidth: 2,
                            },
                            title: {
                                display: true,
                                text: "Fecha",
                            },
                            time: {
                                tooltipFormat: "YYYY MM DD",
                                unit: "month",
                            },
                        },
                    ],
                },
            };

            const data = {
                labels: ejeY,
                datasets: [
                    {
                        label: "Empleados",
                        data: ejeX,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderWidth: 1,
                    },
                ],
            };

            return (
                <Fragment>
                    <Grid item xs={12}>
                        <Line options={options} data={data} />
                    </Grid>
                </Fragment>
            );
        }

        if (type === "Ventas" && state) {
            const { arrValorVentas } = state;

            const ejeX = [];
            const ejeY = [];

            arrValorVentas?.forEach((v) => {
                ejeX.push({
                    x: parseISO(v.dtmCreacion),
                    y: v.ValorVentas,
                });

                ejeY.push(format(parseISO(v.dtmCreacion), "yyyy MM dd"));
            });

            const options = {
                responsive: true,
                scales: {
                    xAxes: [
                        {
                            type: "time",
                            gridLines: {
                                lineWidth: 2,
                            },
                            title: {
                                display: true,
                                text: "Fecha",
                            },
                            time: {
                                tooltipFormat: "YYYY MM DD",
                                unit: "month",
                            },
                        },
                    ],
                },
            };

            const data = {
                labels: ejeY,
                datasets: [
                    {
                        label: "Ventas",
                        data: ejeX,
                        borderColor: "rgb(255, 99, 132)",
                        backgroundColor: "rgba(255, 99, 132, 0.5)",
                        borderWidth: 1,
                    },
                ],
            };

            return (
                <Fragment>
                    <Grid item xs={12}>
                        <Line options={options} data={data} />
                    </Grid>
                </Fragment>
            );
        }
    };

    return (
        <Fragment>
            <Grid container>{fntRenderLine()}</Grid>
        </Fragment>
    );
};

export default CardGrafica;
