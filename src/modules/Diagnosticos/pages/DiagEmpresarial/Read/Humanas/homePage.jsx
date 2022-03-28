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
import useGetDiagnServ from "../../../../hooks/useGetDiagnServ";
import ModalEditDiagServ from "./modalEdit";
import ModalPDF from "./modalPDF";
import { ImageViewer } from "../../../../../../common/components/ImageViewer";
import ChartBar from "./chartBar";

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

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();

    const { getUniqueData } = useGetDiagnServ({ autoLoad: false });

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

                        const strConclusiones =
                            data.objInfoAdicional.strConclusiones;

                        const arrImagenes =
                            data.objInfoAdicional?.strURLSFotos?.split(";");

                        let newArrImagenes = [];

                        if (arrImagenes) {
                            newArrImagenes = arrImagenes.map((url) => {
                                return {
                                    src: `${process.env.REACT_APP_API_BACK_PROT}://${process.env.REACT_APP_API_BACK_HOST}${process.env.REACT_APP_API_BACK_PORT}${url}`,
                                    width: 4,
                                    height: 3,
                                };
                            });
                        }

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

                        const objInfoServicios = {
                            strServicio:
                                data.objInfoEvaluacion.strServicio || "",
                            strHerramientasServicio:
                                data.objInfoEvaluacion
                                    .strHerramientasServicio || "",
                        };

                        const objInfoNormatividad = {
                            strPermisoFuncionamiento:
                                data.objInfoNormatividad
                                    .strPermisoFuncionamiento || "",
                            strCertificadosRequeridos:
                                data.objInfoNormatividad
                                    .strCertificadosRequeridos || "",
                            strCertificadosActuales:
                                data.objInfoNormatividad
                                    .strCertificadosActuales || "",
                            strRegistroMarca:
                                data.objInfoNormatividad.strRegistroMarca || "",
                            strPatentesUtilidad:
                                data.objInfoNormatividad.strPatentesUtilidad ||
                                "",
                            strCualPatenteUtilidad:
                                data.objInfoNormatividad
                                    .strCualPatenteUtilidad || "",
                        };

                        const objInfoEvaluacion = data.objInfoEvaluacion;

                        setData((prevState) => {
                            let prevInfoGeneral = prevState.objInfoGeneral;
                            let prevInfoServicios = prevState.objInfoServicios;
                            let prevInfoNormatividad =
                                prevState.objInfoNormatividad;
                            let prevInfoTemasFortalecer =
                                prevState.objInfoTemasFortalecer;
                            let prevInfoFortalezas =
                                prevState.objInfoFortalezas;

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

                            for (const key in objInfoServicios) {
                                if (
                                    Object.hasOwnProperty.call(
                                        objInfoServicios,
                                        key
                                    )
                                ) {
                                    prevInfoServicios.forEach((e) => {
                                        if (e.parent === key) {
                                            e.value = objInfoServicios[key];
                                        }
                                    });
                                }
                            }

                            for (const key in objInfoNormatividad) {
                                if (
                                    Object.hasOwnProperty.call(
                                        objInfoNormatividad,
                                        key
                                    )
                                ) {
                                    prevInfoNormatividad.forEach((e) => {
                                        if (e.parent === key) {
                                            e.value = objInfoNormatividad[key];
                                        }
                                    });
                                }
                            }

                            const objInnovacionFortalecer = [];
                            const objInnovacionFortalezas = [];

                            const objExperienciaFortalecer = [];
                            const objExperienciaFortalezas = [];

                            const objMarcaFortalecer = [];
                            const objMarcaFortalezas = [];

                            const getLabel = (key) => {
                                switch (key) {
                                    case "strObjetivoProposito":
                                        return "Objetivo o propósito";

                                    case "strRenovacionPortafolio":
                                        return "Renovación de portafolio";

                                    case "strProcesoInteraccion":
                                        return "Procesos de interacción";

                                    case "strPuntosContacto":
                                        return "Puntos de contacto";

                                    case "strExperienciaDiseñada":
                                        return "Experiencia diseñada";

                                    case "strRecursosServicio":
                                        return "Recursos del servicio";

                                    case "strPostVenta":
                                        return "Post venta";

                                    case "strLineaGrafica":
                                        return "Línea gráfica de la marca";

                                    case "strIdentidadMarca":
                                        return "Identidad de la marca";

                                    case "strComunicacionMarca":
                                        return "Comunicación de la marca";

                                    default:
                                        return null;
                                }
                            };

                            for (const key in objInfoEvaluacion) {
                                if (
                                    Object.hasOwnProperty.call(
                                        objInfoEvaluacion,
                                        key
                                    )
                                ) {
                                    if (
                                        (key === "strObjetivoProposito" ||
                                            key === "strRenovacionPortafolio" ||
                                            key === "strProcesoInteraccion" ||
                                            key === "strPuntosContacto") &&
                                        objInfoEvaluacion[key] !== ""
                                    ) {
                                        if (
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                                "BAJO" ||
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                                "MEDIO"
                                        ) {
                                            objInnovacionFortalecer.push({
                                                parent: key,
                                                value: objInfoEvaluacion[key],
                                                detalle:
                                                    objInfoEvaluacion[
                                                        `${key}Detalle`
                                                    ],
                                                nivel: objInfoEvaluacion[
                                                    `${key}Nivel`
                                                ],
                                                label: getLabel(key),
                                            });
                                        }

                                        if (
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                            "ALTO"
                                        ) {
                                            objInnovacionFortalezas.push({
                                                parent: key,
                                                value: objInfoEvaluacion[key],
                                                detalle:
                                                    objInfoEvaluacion[
                                                        `${key}Detalle`
                                                    ],
                                                nivel: objInfoEvaluacion[
                                                    `${key}Nivel`
                                                ],
                                                label: getLabel(key),
                                            });
                                        }
                                    }

                                    if (
                                        (key === "strExperienciaDiseñada" ||
                                            key === "strRecursosServicio" ||
                                            key === "strPostVenta") &&
                                        objInfoEvaluacion[key] !== ""
                                    ) {
                                        if (
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                                "BAJO" ||
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                                "MEDIO"
                                        ) {
                                            objExperienciaFortalecer.push({
                                                parent: key,
                                                value: objInfoEvaluacion[key],
                                                detalle:
                                                    objInfoEvaluacion[
                                                        `${key}Detalle`
                                                    ],
                                                nivel: objInfoEvaluacion[
                                                    `${key}Nivel`
                                                ],
                                                label: getLabel(key),
                                            });
                                        }

                                        if (
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                            "ALTO"
                                        ) {
                                            objExperienciaFortalezas.push({
                                                parent: key,
                                                value: objInfoEvaluacion[key],
                                                detalle:
                                                    objInfoEvaluacion[
                                                        `${key}Detalle`
                                                    ],
                                                nivel: objInfoEvaluacion[
                                                    `${key}Nivel`
                                                ],
                                                label: getLabel(key),
                                            });
                                        }
                                    }

                                    if (
                                        (key === "strLineaGrafica" ||
                                            key === "strIdentidadMarca" ||
                                            key === "strComunicacionMarca") &&
                                        objInfoEvaluacion[key] !== ""
                                    ) {
                                        if (
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                                "BAJO" ||
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                                "MEDIO"
                                        ) {
                                            objExperienciaFortalecer.push({
                                                parent: key,
                                                value: objInfoEvaluacion[key],
                                                detalle:
                                                    objInfoEvaluacion[
                                                        `${key}Detalle`
                                                    ],
                                                nivel: objInfoEvaluacion[
                                                    `${key}Nivel`
                                                ],
                                                label: getLabel(key),
                                            });
                                        }

                                        if (
                                            objInfoEvaluacion[`${key}Nivel`] ===
                                            "ALTO"
                                        ) {
                                            objExperienciaFortalezas.push({
                                                parent: key,
                                                value: objInfoEvaluacion[key],
                                                detalle:
                                                    objInfoEvaluacion[
                                                        `${key}Detalle`
                                                    ],
                                                nivel: objInfoEvaluacion[
                                                    `${key}Nivel`
                                                ],
                                                label: getLabel(key),
                                            });
                                        }
                                    }
                                }
                            }

                            if (objInnovacionFortalecer.length > 0) {
                                prevInfoTemasFortalecer.push({
                                    objInnovacionFortalecer,
                                });
                            }

                            if (objInnovacionFortalezas.length > 0) {
                                prevInfoFortalezas.push({
                                    objInnovacionFortalezas,
                                });
                            }

                            if (objExperienciaFortalecer.length > 0) {
                                prevInfoTemasFortalecer.push({
                                    objExperienciaFortalecer,
                                });
                            }

                            if (objExperienciaFortalezas.length > 0) {
                                prevInfoFortalezas.push({
                                    objExperienciaFortalezas,
                                });
                            }

                            if (objMarcaFortalecer.length > 0) {
                                prevInfoTemasFortalecer.push({
                                    objMarcaFortalecer,
                                });
                            }

                            if (objMarcaFortalezas.length > 0) {
                                prevInfoFortalezas.push({
                                    objMarcaFortalezas,
                                });
                            }

                            return {
                                ...prevState,
                                objInfoGeneral: prevInfoGeneral,
                                objInfoServicios: prevInfoServicios,
                                objInfoNormatividad: prevInfoNormatividad,
                                objInfoTemasFortalecer: prevInfoTemasFortalecer,
                                objInfoFortalezas: prevInfoFortalezas,
                                strConclusiones,
                                arrImagenes: newArrImagenes,
                                objResultServicio: data.objResultServicio,
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
            <ModalEditDiagServ
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
                                to={`/diagnosticos/diagDesign`}
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
                                spacing={1}
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
            </Grid>
        </Fragment>
    );
};

export default ResumenHumanas;
