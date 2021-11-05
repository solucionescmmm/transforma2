import React, { useEffect, useState, useRef } from "react";

//Librerias
import { useParams } from "react-router-dom";
import { parseISO, format } from "date-fns";
import validator from "validator";

//Hooks
import useGetEmpresarios from "../../hooks/useGetEmpresarios";

//Componentes de MUI
import {
    Grid,
    Box,
    Paper,
    Collapse,
    IconButton,
    Tooltip,
    Typography,
} from "@mui/material";

//Iconos
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

// Componentes
import Loader from "../../../../common/components/Loader";
import PageError from "../../../../common/components/Error";

const InfoRegistro = () => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [data, setData] = useState({
        objInfoPrincipal: [
            {
                parent: "strSede",
                value: "",
                label: "Sede",
            },
            {
                parent: "strModalidadIngreso",
                value: "",
                label: "Modalidad de ingreso",
            },
            {
                parent: "dtFechaVinculacion",
                value: null,
                label: "Fecha de vinculación",
            },
            {
                parent: "strEstadoVinculacion",
                value: "",
                label: "Estado de vinculación",
            },
            {
                parent: "strTipoVinculacion",
                value: "",
                label: "Tipo de vinculación",
            },
        ],
        objInfoEmpresarioPr: [
            {
                parent: "strNombres",
                value: "",
                label: "Nombres",
            },
            {
                parent: "strApellidos",
                value: "",
                label: "Apellidos",
            },
            {
                parent: "dtFechaVinculacion",
                value: null,
                label: "Fecha de vinculación",
            },
            {
                parent: "strEstadoVinculacion",
                value: "",
                label: "Estado de vinculación",
            },
            {
                parent: "strTipoVinculacion",
                value: "",
                label: "Tipo de vinculación",
            },
        ],
        arrInfoEmpresarioSec: [],
        objInfoEmpresa: {},
        objInfoAdicional: {},
    });

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [openCollapseInfoPrincipal, setOpenCollapseInfoPrincipal] = useState(false);

    const [openCollapseInfoEmpresarioPr, setOpenCollapseInfoEmpresarioPr] =
        useState(false);

    const [openCollapseInfoEmpresarioSec, setOpenCollapseInfoEmpresarioSec] =
        useState(false);

    const [openCollapseInfoEmpresa, setOpenCollapseInfoEmpresa] = useState(false);
    const [openCollapseInfoAdicional, setOpenCollapseInfoAdicional] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();
    const { getUniqueData } = useGetEmpresarios({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerChangeOpenCollapseInfoPrincipal = () => {
        setOpenCollapseInfoPrincipal(!openCollapseInfoPrincipal);
    };

    const handlerChangeOpenCollapseInfoEmpresarioPr = () => {
        setOpenCollapseInfoEmpresarioPr(!openCollapseInfoEmpresarioPr);
    };

    const handlerChangeOpenCollapseInfoEmpresarioSec = () => {
        setOpenCollapseInfoEmpresarioSec(!openCollapseInfoEmpresarioSec);
    };

    const handlerChangeOpenCollapseInfoEmpresa = () => {
        setOpenCollapseInfoEmpresa(!openCollapseInfoEmpresa);
    };

    const handlerChangeOpenCollapseInfoAdicional = () => {
        setOpenCollapseInfoAdicional(!openCollapseInfoAdicional);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        setLoadingGetData(true);

        async function getData() {
            await refFntGetData
                .current({ intId })
                .then((res) => {
                    if (res.data.error) {
                        throw new Error(res.data.msg);
                    }

                    if (res.data) {
                        let response = res.data.data[0];

                        let newObjInfoPrincipal = {
                            strSede: response.objEmpresario.strSede,
                            strModalidadIngreso:
                                response.objEmpresario.strModalidadIngreso,
                            dtFechaVinculacion: response.objEmpresario.dtFechaVinculacion
                                ? parseISO(response.objEmpresario.dtFechaVinculacion)
                                : null,
                            strEstadoVinculacion:
                                response.objEmpresario.strEstadoVinculacion,
                            strTipoVinculacion: response.objEmpresario.strTipoVinculacion,
                        };

                        setData((prevState) => {
                            let prevObjInfoPrincipal = prevState.objInfoPrincipal;

                            for (const key in newObjInfoPrincipal) {
                                if (
                                    Object.hasOwnProperty.call(newObjInfoPrincipal, key)
                                ) {
                                    prevObjInfoPrincipal.forEach((element) => {
                                        if (element.parent === key) {
                                            element.value = newObjInfoPrincipal[key];
                                        }
                                    });
                                }
                            }

                            console.log(response);

                            return {
                                ...prevState,
                                objInfoPrincipal: prevObjInfoPrincipal,
                            };
                        });
                    }

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
            <PageError
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    return (
        <Grid container direction="row" spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{ padding: "10px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>Información principal</Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() => handlerChangeOpenCollapseInfoPrincipal()}
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoPrincipal
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoPrincipal ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={openCollapseInfoPrincipal} timeout="auto">
                        <Grid container direction="row" spacing={1}>
                            {data.objInfoPrincipal.map((e, i) => (
                                <Grid item xs={12} md={6} key={i}>
                                    <p
                                        style={{
                                            margin: "0px",
                                            fontSize: "14px",
                                            display: "flex",
                                            alignContent: "center",
                                        }}
                                    >
                                        <b>{e.label}: </b>
                                        {validator.isDate(e.value)
                                            ? format(e.value, "yyyy-MM-dd")
                                            : e.value || "No disponible"}
                                    </p>
                                </Grid>
                            ))}
                        </Grid>
                    </Collapse>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: "10px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>
                                Información de la persona empresaria principal
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() =>
                                    handlerChangeOpenCollapseInfoEmpresarioPr()
                                }
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoEmpresarioPr
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoEmpresarioPr ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={openCollapseInfoEmpresarioPr} timeout="auto">
                        <Grid container direction="row" spacing={1}></Grid>
                    </Collapse>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: "10px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>
                                Información de personas empresarias secundarias
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() =>
                                    handlerChangeOpenCollapseInfoEmpresarioSec()
                                }
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoEmpresarioSec
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoEmpresarioSec ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={openCollapseInfoEmpresarioSec} timeout="auto">
                        <Grid container direction="row" spacing={1}></Grid>
                    </Collapse>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: "10px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>Información de la empresa</Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() => handlerChangeOpenCollapseInfoEmpresa()}
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoEmpresa
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoEmpresa ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={openCollapseInfoEmpresa} timeout="auto">
                        <Grid container direction="row" spacing={1}></Grid>
                    </Collapse>
                </Paper>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ padding: "10px" }}>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography>Información adicional</Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() => handlerChangeOpenCollapseInfoAdicional()}
                                size="large"
                            >
                                <Tooltip
                                    title={
                                        openCollapseInfoAdicional
                                            ? "Contraer detalle"
                                            : "Expandir detalle"
                                    }
                                >
                                    {openCollapseInfoAdicional ? (
                                        <ExpandLessIcon />
                                    ) : (
                                        <ExpandMoreIcon />
                                    )}
                                </Tooltip>
                            </IconButton>
                        </Box>
                    </Box>

                    <Collapse in={openCollapseInfoAdicional} timeout="auto">
                        <Grid container direction="row" spacing={1}></Grid>
                    </Collapse>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default InfoRegistro;
