import React, { Fragment, useState, useEffect, useRef } from "react";

//Librerias
import { Link as RouterLink, useParams } from "react-router-dom";

//Componentes de Mui
import {
    Box,
    Button,
    Collapse,
    Grid,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";

//Iconos
import {
    ChevronLeft as ChevronLeftIcon,
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

import Loader from "../../../../../../common/components/Loader";
import ErrorPage from "../../../../../../common/components/Error";
import useGetDiagnProd from "../../../../hooks/useGetDiagnProd";

const ResumenProducto = () => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [loadingGetData, setLoadingGetData] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [openCollapseInfoGeneral, setOpenCollapseInfoGeneral] =
        useState(false);

    const [openCollapseInfoProductos, setOpenCollapseInfoProductos] =
        useState(false);

    const [openCollapseTemasFortalecer, setOpenCollapseTemasFortalecer] =
        useState(false);

    const [openCollapseFortalezas, setOpenCollapseFortalezas] =
        useState(false);

    const [openCollapseInfoNormatividad, setOpenCollapseInfoNormatividad] =
        useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();

    const { getUniqueData } = useGetDiagnProd({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerChangeOpenCollapseInfoGeneral = () => {
        setOpenCollapseInfoGeneral(!openCollapseInfoGeneral);
    };

    const handlerChangeOpenCollapseInfoProductos = () => {
        setOpenCollapseInfoProductos(!openCollapseInfoProductos);
    };

    const handlerChangeopenCollapseTemasFortalecer = () => {
        setOpenCollapseTemasFortalecer(!openCollapseTemasFortalecer);
    };

    const handlerChangeopenCollapseFortalezas = () => {
        setOpenCollapseFortalezas(!openCollapseFortalezas);
    };

    const handlerChangeOpenCollapseInfoNormatividad = () => {
        setOpenCollapseInfoNormatividad(!openCollapseInfoNormatividad);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoadingGetData(true);

        async function getData() {
            await refFntGetData
                .current({ intIdEmpresario: intId })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    // if (res.data) {
                    //     let data = res.data.data[0];
                    // }

                    setLoadingGetData(false);
                    setErrorGetData({ flag: false, msg: "" });
                })
                .catch((error) => {
                    setErrorGetData({ flag: true, msg: error.message });
                    setLoadingGetData(false);
                });
        }

        getData();
    }, [intId]);

    //===============================================================================================================================================
    //========================================== Renders ============================================================================================
    //===============================================================================================================================================
    if (loadingGetData) {
        return <Loader />;
    }

    if (errorGetData.flag) {
        return (
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    return (
        <Fragment>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Button
                        component={RouterLink}
                        to={`/diagnosticos/diagDesign`}
                        startIcon={<ChevronLeftIcon />}
                        size="small"
                        color="inherit"
                    >
                        regresar
                    </Button>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography>
                                    <b>Información general</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoGeneral()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoGeneral
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoGeneral ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseInfoGeneral} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            ></Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography>
                                    <b>Productos evaluados en el diagnóstico</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoProductos()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoProductos
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoProductos ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseInfoProductos} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            ></Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography>
                                    <b>
                                        Temas a fortalecer
                                    </b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeopenCollapseTemasFortalecer()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseTemasFortalecer
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseTemasFortalecer ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseTemasFortalecer}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            ></Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography>
                                    <b>
                                      Fortalezas
                                    </b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeopenCollapseFortalezas()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseFortalezas
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseFortalezas ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseFortalezas}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            ></Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography>
                                    <b>Normatividad </b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoNormatividad()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoNormatividad
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoNormatividad ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoNormatividad}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            ></Grid>
                        </Collapse>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ResumenProducto;
