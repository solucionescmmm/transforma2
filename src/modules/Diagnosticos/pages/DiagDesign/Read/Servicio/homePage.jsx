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

const ResumenProducto = () => {
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
        objInfoServicios: [
            {
                parent: "strServicio",
                value: "",
                label: "Servicio",
            },
            {
                parent: "strHerramientasServicio",
                value: "",
                label: "Herramientas y componentes del servicio",
            },
        ],
        objInfoNormatividad: [
            {
                parent: "strPermisoFuncionamiento",
                value: "",
                label: "¿La unidad productiva o empresa requiere algún permiso, registro, licencia de funcionamiento o similares para su operación?",
            },
            {
                parent: "strCertificadosRequeridos",
                value: "",
                label: "¿Cuáles son las certificaciones que requieren?",
            },
            {
                parent: "strCertificadosActuales",
                value: "",
                label: "¿Cuáles son las certificaciones que tiene actualmente?",
            },
            {
                parent: "strRegistroMarca",
                value: "",
                label: "¿Cuenta con registro de marca?",
            },
            {
                parent: "strPatentesUtilidad",
                value: "",
                label: "¿Cuenta con patentes de modelo de utilidad?",
            },
            {
                parent: "strCualPatenteUtilidad",
                value: "",
                label: "¿Cuál?",
            },
        ],
        objInfoTemasFortalecer: [],
        objInfoFortalezas: [],
        arrImagenes: [],
        strConclusiones: "",
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

    const [openCollapseInfoProductos, setOpenCollapseInfoProductos] =
        useState(false);

    const [openCollapseTemasFortalecer, setOpenCollapseTemasFortalecer] =
        useState(false);

    const [openCollapseFortalezas, setOpenCollapseFortalezas] = useState(false);

    const [openCollapseInfoNormatividad, setOpenCollapseInfoNormatividad] =
        useState(false);

    const [openCollapseConclusiones, setOpenCollapseConclusiones] =
        useState(false);

    const [openCollapseFotos, setOpenCollapseFotos] = useState(false);

    
    const [openCollapseGrafico, setOpenCollapseGrafico] = useState(false);


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
        const divChart = window.document.getElementById("chart-diag-prod");

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

    const handlerChangeOpenCollapseConclusiones = () => {
        setOpenCollapseConclusiones(!openCollapseConclusiones);
    };

    const handlerChangeOpenCollapseFotos = () => {
        setOpenCollapseFotos(!openCollapseFotos);
    };

    const handlerChangeOpenCollapseGrafico = () => {
        setOpenCollapseGrafico(!openCollapseGrafico);
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
                        <b>resumen diagnóstico de servicio</b>
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

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Servicios evaluados en el diagnóstico</b>
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
                            >
                                {data.objInfoServicios.map((e, i) => (
                                    <Grid item xs={12} key={i}>
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
                                    <b>Temas a fortalecer</b>
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
                            >
                                {data.objInfoTemasFortalecer.map((e, i) => {
                                    if (e.objInnovacionFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Innovación
                                                    </Typography>
                                                </Grid>

                                                {e.objInnovacionFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>Nivel</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            {e.detalle && (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objExperienciaFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Experiencia
                                                    </Typography>
                                                </Grid>

                                                {e.objExperienciaFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>Nivel</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            {e.detalle && (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objMarcaFortalecer) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Marca
                                                    </Typography>
                                                </Grid>

                                                {e.objMarcaFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>Nivel</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            {e.detalle && (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    return null;
                                })}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Fortalezas</b>
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

                        <Collapse in={openCollapseFortalezas} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoFortalezas.map((e, i) => {
                                    if (e.objInnovacionFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Innovación
                                                    </Typography>
                                                </Grid>

                                                {e.objInnovacionFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>Nivel</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            {e.detalle && (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objExperienciaFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Experiencia
                                                    </Typography>
                                                </Grid>

                                                {e.objExperienciaFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>Nivel</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            {e.detalle && (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    if (e.objMarcaFortalezas) {
                                        return (
                                            <Fragment key={i}>
                                                <Grid item xs={12}>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "18px",
                                                            fontWeight: "bold",
                                                            color: "#F5B335",
                                                        }}
                                                    >
                                                        Marca
                                                    </Typography>
                                                </Grid>

                                                {e.objMarcaFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={8}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b
                                                                        style={{
                                                                            marginRight:
                                                                                "5px",
                                                                        }}
                                                                    >
                                                                        {
                                                                            e.label
                                                                        }
                                                                        :{" "}
                                                                    </b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                        maxWidth:
                                                                            "600px",
                                                                    }}
                                                                >
                                                                    {e.value ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={2}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    <b>Nivel</b>
                                                                </p>

                                                                <p
                                                                    style={{
                                                                        margin: "0px",
                                                                        fontSize:
                                                                            "13px",
                                                                        display:
                                                                            "flex",
                                                                        alignContent:
                                                                            "center",
                                                                    }}
                                                                >
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>

                                                            {e.detalle && (
                                                                <Grid
                                                                    item
                                                                    xs={12}
                                                                    md={2}
                                                                >
                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        <b>
                                                                            Detalle
                                                                        </b>
                                                                    </p>

                                                                    <p
                                                                        style={{
                                                                            margin: "0px",
                                                                            fontSize:
                                                                                "13px",
                                                                            display:
                                                                                "flex",
                                                                            alignContent:
                                                                                "center",
                                                                        }}
                                                                    >
                                                                        {e.detalle ||
                                                                            "No diligenciado"}
                                                                    </p>
                                                                </Grid>
                                                            )}
                                                        </Fragment>
                                                    )
                                                )}
                                            </Fragment>
                                        );
                                    }

                                    return null;
                                })}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
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
                            >
                                {data.objInfoNormatividad.map((e, i) => {
                                    if (e.value) {
                                        return (
                                            <Grid item xs={12} key={i}>
                                                <p
                                                    style={{
                                                        margin: "0px",
                                                        fontSize: "13px",
                                                        display: "flex",
                                                        alignContent: "center",
                                                    }}
                                                >
                                                    <b
                                                        style={{
                                                            marginRight: "5px",
                                                        }}
                                                    >
                                                        {e.label}:{" "}
                                                    </b>
                                                    {e.value ||
                                                        "No diligenciado"}
                                                </p>
                                            </Grid>
                                        );
                                    }

                                    return null;
                                })}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid id item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Conluciones </b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseConclusiones()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseConclusiones
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseConclusiones ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseConclusiones} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            >
                                <Grid item xs={12}>
                                    <p
                                        style={{
                                            margin: "0px",
                                            fontSize: "13px",
                                            display: "flex",
                                            alignContent: "center",
                                        }}
                                    >
                                        {data.strConclusiones}
                                    </p>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Registro fotográfico </b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseFotos()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseFotos
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseFotos ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseFotos} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={1}
                                sx={{ padding: "15px" }}
                            >
                                <Grid item xs={12}>
                                    <p
                                        style={{
                                            margin: "0px",
                                            fontSize: "13px",
                                            display: "flex",
                                            alignContent: "center",
                                        }}
                                    >
                                        {data.arrImagenes.length > 0 && (
                                            <ImageViewer
                                                images={data.arrImagenes}
                                            />
                                        )}
                                    </p>
                                </Grid>
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Grafíco de resultados</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseGrafico()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseGrafico
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseGrafico ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseGrafico} timeout="auto">

                        </Collapse>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ResumenProducto;
