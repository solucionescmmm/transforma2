import React, { useState, useEffect } from "react";

//Librerias
import CountUp from "react-countup";

//Componentes de Material UI
import { Paper, Box, Grid, Typography } from "@mui/material";

//Iconos de Material UI
import {
    Group as GroupIcon,
    PersonAdd as PersonAddIcon,
} from "@mui/icons-material";

//Estilos de Material UI
import { makeStyles } from "@mui/styles";

const panelEmpresariosStyles = makeStyles((theme) => ({
    paperTotal: {
        padding: "8px",
        backgroundColor: "#00BAB3",
        color: "white",
    },
    paperActivos: {
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

const PanelEmpresarios = ({ data }) => {
    const [count, setCount] = useState({
        intActivos: 0,
        intTotal: 0,
    });

    useEffect(() => {
        if (data) {
            let intActivos = 0;
            let intTotal = 0;

            for (let i = 0; i < data.length; i++) {
                if (data[i].strEstado === "Activo") {
                    intActivos++;
                }

                intTotal++;
            }

            setCount({
                intActivos,
                intTotal,
            });
        }
    }, [data]);

    const classes = panelEmpresariosStyles();

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
                            <GroupIcon
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
                                    <CountUp
                                        end={count.intTotal}
                                        duration={3}
                                    />
                                </b>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper className={classes.paperActivos}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <PersonAddIcon
                                sx={{
                                    float: "left",
                                    marginRight: "5px",
                                }}
                            />
                            <Typography>Filtrados</Typography>
                        </Box>
                        <Box>
                            <Typography variant="h6">
                                <b>
                                    <CountUp
                                        end={count.intActivos}
                                        duration={3}
                                    />
                                </b>
                            </Typography>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default PanelEmpresarios;
