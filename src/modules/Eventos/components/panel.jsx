import React, { useState, useEffect } from "react";

//Librerias
import CountUp from "react-countup";

//Componentes de Material UI
import { Paper, Box, Grid, Typography } from "@mui/material";

//Iconos de Material UI
import {
    PlaylistAddCheck as TotalIcon,
    PlayArrow as PlayIcon,
    Stop as StopIcon,
} from "@mui/icons-material";

//Estilos de Material UI
import { makeStyles } from "@mui/styles";

const panelStyles = makeStyles((theme) => ({
    paperTotal: {
        padding: "8px",
        backgroundColor: "#00BAB3",
        color: "white",
    },
    paperEjecucion: {
        padding: "8px",
        backgroundColor: "#5CB660",
        color: "white",
    },
    paperFiltrados: {
        padding: "8px",
        backgroundColor: "#676767",
        color: "white",
    },
}));

const Panel = ({ data }) => {
    const [count, setCount] = useState({
        intActivos: 0,
        intEjecucion: 0,
        intSuspendido: 0,
        intTotal: 0,
    });

    useEffect(() => {
        if (data) {
            let intActivos = 0;
            let intTotal = 0;
            let intEjecucion = 0;
            let intSuspendido = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i].strNombreEstado === "Activo") {
                    intActivos++;
                }

                if (data[i].strNombreEstado === "En ejecución") {
                    intEjecucion++;
                }

                if (data[i].strNombreEstado === "Suspendido") {
                    intSuspendido++;
                }

                intTotal++;
            }

            setCount({
                intActivos,
                intEjecucion,
                intSuspendido,
                intTotal,
            });
        }
    }, [data]);

    const classes = panelStyles();

    return (
        <Grid
            container
            direction="row"
            spacing={2}
            style={{ marginTop: "10px", marginBottom: "15px" }}
        >
            <Grid item xs={12} md={4}>
                <Paper className={classes.paperTotal}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <TotalIcon
                                sx={{
                                    float: "left",
                                    marginRight: "5px",
                                }}
                            />
                            <Typography>Registrados</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                <b>
                                    <CountUp end={count.intTotal} duration={3} />
                                </b>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper className={classes.paperEjecucion}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <PlayIcon
                                sx={{
                                    float: "left",
                                    marginRight: "5px",
                                }}
                            />
                            <Typography>En ejecución</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                <b>
                                    <CountUp end={count.intEjecucion} duration={3} />
                                </b>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper className={classes.paperFiltrados}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <StopIcon
                                sx={{
                                    float: "left",
                                    marginRight: "5px",
                                }}
                            />
                            <Typography>Suspendidos</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                <b>
                                    <CountUp end={count.intSuspendido} duration={3} />
                                </b>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Panel;
