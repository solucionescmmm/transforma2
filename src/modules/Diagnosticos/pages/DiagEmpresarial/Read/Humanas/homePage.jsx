import React, { Fragment, useState, useEffect, useRef } from "react";

//Librerias
import { Link as RouterLink, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import validator from "validator";
import html2canvas from "html2canvas";

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
    Delete as DeleteIcon,
    Edit as EditIcon,
    Print as PrintIcon,
} from "@mui/icons-material";

import Loader from "../../../../../../common/components/Loader";
import ErrorPage from "../../../../../../common/components/Error";
import useGetDiagnHumano from "../../../../hooks/useGetDiagnHumano";
import ModalEditDiag from "./modalEdit";
import ModalPDF from "./modalPDF";

const ResumenHumanas = () => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
    const [intIdEmpresario, setIntIdEmpresario] = useState(null);

    const [data, setData] = useState({
        objInfoGeneral: [
            {
                parent: "dtmFechaSesion",
                value: "",
                label: "Fecha y hora de la sesión",
            },
            {
                parent: "strLugarSesion",
                value: "",
                label: "Lugar de la sesión",
            },
            {
                parent: "dtActualizacion",
                value: null,
                label: "Fecha de ultima actualización",
            },
            {
                parent: "strUsuarioCreacion",
                value: "",
                label: "Responsable del diagnóstico",
            },
            {
                parent: "strUsuarioActualizacion",
                value: "",
                label: "Responsable de actualizar la información",
            },
        ],
        objInfoEncuestaHumanas: [
            {
                parent: "strTomaDesiciones",
                value: "",
                label: "¿Cómo se siente al momento de tomar las decisiones en su emprendimiento?",
            },
            {
                parent: "strMotivaciones",
                value: "",
                label: "¿Cuál es tú principal motivación para emprender?",
            },
            {
                parent: "strNivelVida",
                value: "",
                label: "¿Desde que inició su empresa hasta hoy, cuánto ha influido en el nivel de vida de su familia(ingresos, salud, educación…)",
            },
            {
                parent: "strRedesApoyoOtros",
                value: "",
                label: "¿En quiénes usted ha encontrado apoyo para salir adelante con su emprendimiento?",
            },
            {
                parent: "strProyectoVidaEmpresa",
                value: "",
                label: "¿En su momento actual de desarrollo, cuánto diría que su empresa se ha convertido en su proyecto de vida?",
            },
            {
                parent: "strHabilidadesAutonomia",
                value: "",
                label: "Autonomía para el manejo de su negocio",
            },
            {
                parent: "strHabilidadesCapacidad",
                value: "",
                label: "Capacidad de adaptarse a los cambios",
            },
            {
                parent: "strHabilidadesComuniacion",
                value: "",
                label: "Comunicación efectiva con los clientes, con los empleados, los proveedores",
            },
            {
                parent: "strProyectoVidaEmprendimiento",
                value: "",
                label: "Consideras que el emprendimiento, te permite cumplir tus aspiraciones y proyectos",
            },
            {
                parent: "strHabilidadesCreatividad",
                value: "",
                label: "Creatividad en productos y en procesos productivos",
            },
            {
                parent: "strConfianza",
                value: "",
                label: "De acuerdo con las experiencias y el conocimiento adquirido en su actuar empresarial, en la siguiente escala en qué nivel confianza se ubicaría",
            },
            {
                parent: "strEquilibrioVida",
                value: "",
                label: "En tú rutina realizas actividades de descanso y esparcimiento (Ejemplos: leer, tocar un instrumento, bailar, compartir con amistades, estudiar, orar, deportivas, entre otros)",
            },
            {
                parent: "strRedesApoyoPropia",
                value: "",
                label: "En tú rutina realizas actividades de descanso y esparcimiento (Ejemplos: leer, tocar un instrumento, bailar, compartir con amistades, estudiar, orar, deportivas, entre otros)",
            },
        ],
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [openModalPDF, setOpenModalPDF] = useState(false);

    const [openCollapseInfoGeneral, setOpenCollapseInfoGeneral] =
        useState(false);

    const [
        openCollapseInfoEncuestaHumanas,
        setOpenCollapseInfoEncuestaHumanas,
    ] = useState(false);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();

    const { getUniqueData } = useGetDiagnHumano({ autoLoad: false });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerChangeOpenModalEdit = () => {
        setOpenModalEdit(!openModalEdit);
    };

    const handlerChangeOpenModalPDF = () => {
        const divChart = window.document.getElementById("chart-diag-serv");

        html2canvas(divChart).then((canvas) => {
            const img = canvas.toDataURL("image/png");

            setData((prevState) => ({
                ...prevState,
                imgChart: img,
            }));

            setOpenModalPDF(!openModalPDF);
        });
    };

    const handlerChangeOpenCollapseInfoGeneral = () => {
        setOpenCollapseInfoGeneral(!openCollapseInfoGeneral);
    };

    const handlerChangeOpenCollapseInfoEncuestaHumanas = () => {
        setOpenCollapseInfoEncuestaHumanas(!openCollapseInfoEncuestaHumanas);
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
                        let data = res.data.data[0];

                        setIntIdEmpresario(data.objInfoGeneral.intIdEmpresario);

                        const objInfoGeneral = {
                            dtmFechaSesion: data.objInfoGeneral.dtmFechaSesion
                                ? parseISO(data.objInfoGeneral.dtmFechaSesion)
                                : null,
                            strLugarSesion:
                                data.objInfoGeneral.strLugarSesion || "",
                            strUsuarioCreacion:
                                data.objInfoGeneral.strUsuarioCreacion || "",
                            dtActualizacion: data.objInfoGeneral.dtActualizacion
                                ? parseISO(data.objInfoGeneral.dtActualizacion)
                                : null,
                            strUsuarioActualizacion:
                                data.objInfoGeneral.strUsuarioActualizacion ||
                                "",
                        };

                        const objInfoEncuestaHumanas =
                            data.objInfoEncuestaHumanas;

                        setData((prevState) => {
                            let prevInfoGeneral = prevState.objInfoGeneral;
                            let prevInfoEncuestaHumanas =
                                prevState.objInfoEncuestaHumanas;

                            for (const key in objInfoGeneral) {
                                if (
                                    Object.hasOwnProperty.call(
                                        objInfoGeneral,
                                        key
                                    )
                                ) {
                                    prevInfoGeneral.forEach((e) => {
                                        if (e.parent === key) {
                                            e.value = objInfoGeneral[key];

                                            if (key === "dtActualizacion") {
                                                e.value = validator.isDate(
                                                    e.value
                                                )
                                                    ? format(
                                                          e.value,
                                                          "yyyy-MM-dd"
                                                      )
                                                    : "No diligenciado";
                                            }

                                            if (key === "dtmFechaSesion") {
                                                e.value = validator.isDate(
                                                    e.value
                                                )
                                                    ? format(
                                                          e.value,
                                                          "yyyy-MM-dd hh:mm"
                                                      )
                                                    : "No diligenciado";
                                            }
                                        }
                                    });
                                }
                            }

                            for (const key in objInfoEncuestaHumanas) {
                                if (
                                    Object.hasOwnProperty.call(
                                        objInfoEncuestaHumanas,
                                        key
                                    )
                                ) {
                                    prevInfoEncuestaHumanas.forEach((e) => {
                                        if (e.parent === key) {
                                            e.value =
                                                objInfoEncuestaHumanas[key];
                                        }
                                    });
                                }
                            }

                            return {
                                ...prevState,
                                objInfoGeneral: prevInfoGeneral,
                                objInfoEncuestaHumanas: prevInfoEncuestaHumanas,
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
            <ErrorPage
                severity="error"
                msg="Ha ocurrido un error al obtener los datos del empresario seleccionado, por favor escala al área de TI para más información."
                title={errorGetData.msg}
            />
        );
    }

    return (
        <Fragment>
            <ModalEditDiag
                intId={intId}
                handleOpenDialog={handlerChangeOpenModalEdit}
                open={openModalEdit}
            />

            <ModalPDF
                handleOpenDialog={handlerChangeOpenModalPDF}
                open={openModalPDF}
                intId={intIdEmpresario}
                values={data}
            />

            <Grid container direction="row" spacing={2}>
                <Grid item xs={12}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            <Button
                                component={RouterLink}
                                to={`/diagnosticos/diagEmpresarial`}
                                startIcon={<ChevronLeftIcon />}
                                size="small"
                                color="inherit"
                            >
                                regresar
                            </Button>
                        </Box>

                        <Box>
                            <Tooltip title="Eliminar diagnóstico">
                                <IconButton color="error">
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Editar diagnóstico">
                                <IconButton
                                    color="success"
                                    onClick={() => handlerChangeOpenModalEdit()}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Imprimir diagnóstico">
                                <IconButton
                                    color="inherit"
                                    onClick={() => handlerChangeOpenModalPDF()}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        sx={{ color: "#F5B335", textTransform: "uppercase" }}
                        textAlign="center"
                    >
                        <b>resumen diagnóstico de competencias humanas</b>
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
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
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoGeneral.map((e, i) => (
                                    <Grid item xs={12} md={6} key={i}>
                                        <p
                                            style={{
                                                margin: "0px",
                                                fontSize: "13px",
                                                display: "flex",
                                                alignContent: "center",
                                            }}
                                        >
                                            <b style={{ marginRight: "5px" }}>
                                                {e.label}:{" "}
                                            </b>
                                            {e.value || "No diligenciado"}
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
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Componente humano</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoEncuestaHumanas()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoEncuestaHumanas
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoEncuestaHumanas ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoEncuestaHumanas}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoEncuestaHumanas.map((e, i) => (
                                    <Grid item xs={12} md={12} key={i}>
                                        <p
                                            style={{
                                                margin: "0px",
                                                fontSize: "13px",
                                                display: "flex",
                                                alignContent: "center",
                                            }}
                                        >
                                            <b style={{ marginRight: "5px" }}>
                                                {e.label}:{" "}
                                            </b>
                                        </p>

                                        <p
                                            style={{
                                                margin: "0px",
                                                fontSize: "13px",
                                                display: "flex",
                                                alignContent: "center",
                                            }}
                                        >
                                            {e.value || "No diligenciado"}
                                        </p>
                                    </Grid>
                                ))}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ResumenHumanas;
