import React, { Fragment, useState, useEffect, useRef } from "react";

//Librerias
import { format, parseISO } from "date-fns";
import validator from "validator";

//Componentes de Mui
import {
    Box,
    Collapse,
    Grid,
    IconButton,
    Paper,
    Tooltip,
    Typography,
} from "@mui/material";

//Iconos
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    Edit as EditIcon,
    Print as PrintIcon,
    CheckCircle as CheckCircleIcon,
    RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";

import ModalEditDiag from "./modalEdit";
import ModalPDF from "./modalPDF";
import ModalFinish from "./modalFinish";
import useGetDiagnExp from "../../../hooks/useGetDiagnExp";
import useGetEmpresarios from "../../../../Empresarios/hooks/useGetEmpresarios";
import ErrorPage from "../../../../../common/components/Error";
import Loader from "../../../../../common/components/Loader";
import { Can } from "../../../../../common/functions/can";

const ResumenExp = ({ onChangeRoute, intIdIdea, intIdDiagnostico }) => {
    //===============================================================================================================================================
    //========================================== Declaracion de estados =============================================================================
    //===============================================================================================================================================
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
        objInfoEmprendimiento: [
            {
                parent: "strUnidadProductiva",
                value: "",
                label: "Nombre de la empresa",
            },
            {
                parent: "strLugarOperacion",
                value: "",
                label: "Lugar de operación de la empresa",
            },
            {
                parent: "arrFormasComercializacion",
                value: "",
                label: "Formas de comercialización",
            },
            {
                parent: "arrMediosDigitales",
                value: "",
                label: "Medios digitales",
            },
            {
                parent: "strTiempoDedicacion",
                value: "",
                label: "Tiempo de dedicación actual a la empresa",
            },
            {
                parent: "strRegistroCamaraComercio",
                value: "",
                label: "¿Cuenta con registro en cámara de comercio?",
            },
            {
                parent: "strSectorEconomico",
                value: "",
                label: "Sector económico",
            },
            {
                parent: "strCategoriaProducto",
                value: "",
                label: "Categoría de los productos",
            },
            {
                parent: "strCategoriaServicio",
                value: "",
                label: "Categoría de los servicios",
            },
            {
                parent: "strDefinineLineasProductoServicios",
                value: "",
                label: "¿Tiene definidas las líneas de productos/servicios del negocio?",
            },
            {
                parent: "arrCategoriasSecundarias",
                value: "",
                label: "Categorías secundarias",
            },
            {
                parent: "strListadoProdServ",
                value: "",
                label: "Listado de los productos o servicios",
            },
            {
                parent: "strLineaProductoServicioDestacada",
                value: "",
                label: "¿Cuál es la línea de productos/servicios más destacada?",
            },
            {
                parent: "btTieneProdServUltimoAn",
                value: "",
                label: "¿Tiene productos/servicios nuevos en el último año o se encuentra renovando los productos actuales?",
            },
            {
                parent: "strProductosNuevos",
                value: "",
                label: "¿Cuáles son estos productos nuevos?",
            },
            {
                parent: "strProductoServiciosEnValidacion",
                value: "",
                label: "¿Cuenta con productos/servicios en prototipado?",
            },
            {
                parent: "strNivelDlloProductoServicios",
                value: "",
                label: "Nivel de desarrollo del producto/servicio",
            },
            {
                parent: "strEtapaValidProductoServicios",
                value: "",
                label: "¿En qué etapa de validación se encuentra el producto/servicio?",
            },
        ],
        objInfoPerfilEco: [
            {
                parent: "PromedioVentas6Meses",
                value: "",
                label: "Promedio de ventas de los últimos 6 meses",
            },
            {
                parent: "strRangoVentas",
                value: "",
                label: "Rango de ventas",
            },

            {
                parent: "strEscojaProductoServicio",
                value: "",
                label: "Escoja uno de los productos/servicios de su empresa",
            },
            {
                parent: "ValorVentaProductoEscogido",
                value: "",
                label: "De acuerdo con el producto/servicio escogido ¿Cuál es el precio de venta de este?",
            },
            {
                parent: "strConoceMargenRentaProductoEscogido",
                value: "",
                label: "Del producto escogido ¿Tiene conocimiento de cuál es el margen de rentabilidad?",
            },
            {
                parent: "strConoceCostosProductoEscogido",
                value: "",
                label: "¿Conoce los costos de producción de este producto?",
            },
            {
                parent: "CostoProduccionProductoEscogido",
                value: "",
                label: "En caso de que la pregunta anterior sea afirmativa, ¿Cuáles son los costos de producción asociados a este producto?",
            },
            {
                parent: "intPorcentajeMargenRentaProductoEscogido",
                value: "",
                label: "En caso de que la pregunta anterior sea afirmativa, ¿Cuál es el margen de utilidad de este producto?",
            },
            {
                parent: "btGeneraEmpleo",
                value: "",
                label: "¿La empresa genera empleo para otras personas?",
            },
            {
                parent: "intNumeroEmpleados",
                value: "",
                label: "¿La empresa genera empleo para otras personas?",
            },
            {
                parent: "strRangoEmpleados",
                value: "",
                label: "Rango de empleados",
            },
            {
                parent: "strOperacionesVentas6Meses",
                value: "",
                label: "¿La empresa tiene operaciones de producción y venta en los últimos 6 meses de manera continua?",
            },
            {
                parent: "strPrecProdServ",
                value: "",
                label: "¿Cómo están definidos los precios de tus productos/servicios?",
            },
            {
                parent: "strUniProdSosFinan",
                value: "",
                label: "Mi unidad productiva es sostenible financieramente",
            },
        ],
        objInfoMercado: [
            {
                parent: "strTieneBaseDatosClientes",
                value: "",
                label: "Cuento con una base de datos de clientes",
            },
            {
                parent: "strActivIncreVentClient",
                value: "",
                label: "Realizo actividades enfocadas en incrementar el nivel de ventas y clientes",
            },
            {
                parent: "strPlanAtraccionRelacionamientoFidelizacionClientes",
                value: "",
                label: "Tengo un plan de atracción, relacionamiento y fidelización con mis clientes",
            },
            {
                parent: "strEquipTrabEstruct",
                value: "",
                label: "Tengo un equipo de trabajo estructurado",
            },
            {
                parent: "strEmprFormaAcuerNormLab",
                value: "",
                label: "Mi empresa está formalizada de acuerdo con la normatividad laboral",
            },
            {
                parent: "strPlaneaEstraEmpPlanPlani",
                value: "",
                label: "Tengo una planeación estratégica para mi empresa, mas que estrategica plan de trabajo, planificación",
            },
            {
                parent: "strIdentidadMarca",
                value: "",
                label: "Identidad de la marca",
            },
            {
                parent: "strComunicacionMarca",
                value: "",
                label: "Comunicación de la marca",
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
        objInfoEncuestaHumanas: [
            {
                parent: "strTomaDesiciones",
                value: "",
                label: "¿Cómo se siente al momento de tomar las decisiones en su emprendimiento?",
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
                parent: "strHabilidadesComunicacion",
                value: "",
                label: "Comunicación efectiva con los clientes, con los empleados, los proveedores",
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
        ],
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [openModalFinish, setOpenModalFinish] = useState(false);
    const [finalizado, setFinalizado] = useState(false);

    const [openModalPDF, setOpenModalPDF] = useState(false);

    const [openCollapseInfoGeneral, setOpenCollapseInfoGeneral] =
        useState(true);
    const [openCollapseInfoFamiliar, setOpenCollapseInfoFamiliar] =
        useState(true);
    const [openCollapseInfoEmprendimiento, setOpenCollapseInfoEmprendimiento] =
        useState(true);
    const [openCollapseInfoEmpresa, setOpenCollapseInfoEmpresa] =
        useState(true);
    const [openCollapseInfoPerfilEco, setOpenCollapseInfoPerfilEco] =
        useState(true);
    const [openCollapseInfoAdicional, setOpenCollapseInfoAdicional] =
        useState(true);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { getUniqueData: getUniqueDataGen } = useGetDiagnExp({
        autoLoad: false,
        intIdDiagnostico,
        intIdIdea,
    });

    const { getUniqueData } = useGetEmpresarios({ autoLoad: false, intIdIdea });

    const refFntGetData = useRef(getUniqueData);
    const refFntGetDataGen = useRef(getUniqueDataGen);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================
    const handlerChangeOpenModalEdit = () => {
        setOpenModalEdit(!openModalEdit);
    };

    const handlerChangeOpenModalFinish = () => {
        setOpenModalFinish(!openModalFinish);
    };

    async function getData() {
        await refFntGetData
            .current({ intIdIdea })
            .then(async (res) => {
                const resData = await refFntGetDataGen.current({
                    intIdDiagnostico,
                    intIdIdea,
                });

                if (res.data.error || resData.data.error) {
                    throw new Error(res.data.msg || resData.data.msg);
                }

                if (res.data && resData.data) {
                    let dataEmpr = res.data.data?.[0];
                    const objEmprPrincipal = dataEmpr.objEmpresario.find(
                        (emp) => emp.strTipoEmpresario === "Principal"
                    );

                    let data = resData.data.data[0];

                    setFinalizado(data.objInfoGeneral.btFinalizado);

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
                            data.objInfoGeneral.strUsuarioActualizacion || "",
                    };

                    const objInfoEmprendimiento = {
                        ...data.objInfoEmprendimiento,
                        strRedesSociales:
                            data.objInfoEmprendimiento.arrMediosDigitales
                                ?.length > 0
                                ? "Sí"
                                : "No",
                        arrMediosDigitales:
                            data.objInfoEmprendimiento.arrMediosDigitales || [],
                        strTiempoDedicacion:
                            data.objInfoEmprendimiento.strTiempoDedicacion ||
                            "",
                        strSectorEconomico:
                            data.objInfoEmprendimiento.strSectorEconomico || "",
                        strCategoriaProducto:
                            data.objInfoEmprendimiento.strCategoriaProducto ||
                            "",
                        strCategoriaServicio:
                            data.objInfoEmprendimiento.strCategoriaServicio ||
                            "",
                        arrCategoriasSecundarias:
                            data.objInfoEmprendimiento
                                .arrCategoriasSecundarias || [],
                        strOtraCategoria:
                            data.objInfoEmprendimiento.strOtraCategoria || "",
                        btGeneraEmpleo:
                            typeof data.objInfoEmprendimiento.btGeneraEmpleo ===
                            "boolean"
                                ? data.objInfoEmprendimiento.btGeneraEmpleo
                                : "",
                    };

                    const objInfoPerfilEco = {
                        ...data.objInfoPerfilEco,
                    };

                    const objInfoMercado = data.objInfoMercado;
                    const objInfoNormatividad = data.objInfoNormatividad;
                    const objInfoEncuestaHumanas = data.objInfoEncuestaHumanas;

                    setData((prevState) => {
                        let prevInfoGeneral = prevState.objInfoGeneral;

                        let prevInfoEmprendimiento =
                            prevState.objInfoEmprendimiento;

                        let prevInfoPerfilEco = prevState.objInfoPerfilEco;
                        let prevInfoMercado = prevState.objInfoMercado;
                        let prevInfoNormatividad =
                            prevState.objInfoNormatividad;
                        let prevInfoEncuestaHumanas =
                            prevState.objInfoEncuestaHumanas;

                        for (const key in objInfoGeneral) {
                            if (
                                Object.hasOwnProperty.call(objInfoGeneral, key)
                            ) {
                                prevInfoGeneral.forEach((e) => {
                                    if (e.parent === key) {
                                        e.value = objInfoGeneral[key];

                                        if (key === "dtActualizacion") {
                                            e.value = validator.isDate(e.value)
                                                ? format(e.value, "yyyy-MM-dd")
                                                : "No diligenciado";
                                        }

                                        if (key === "dtmFechaSesion") {
                                            e.value = validator.isDate(e.value)
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

                        for (const key in objInfoEmprendimiento) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoEmprendimiento,
                                    key
                                )
                            ) {
                                prevInfoEmprendimiento.forEach((e) => {
                                    if (
                                        e.parent === key &&
                                        key === "arrDepartamento"
                                    ) {
                                        e.value =
                                            objInfoEmprendimiento[
                                                key
                                            ].region_name;
                                    } else if (
                                        e.parent === key &&
                                        key === "arrCiudad"
                                    ) {
                                        e.value =
                                            objInfoEmprendimiento[
                                                key
                                            ].city_name;
                                    } else if (e.parent === key) {
                                        if (objInfoEmprendimiento[key]?.map) {
                                            const json =
                                                objInfoEmprendimiento[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value =
                                                objInfoEmprendimiento[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoPerfilEco) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoPerfilEco,
                                    key
                                )
                            ) {
                                prevInfoPerfilEco.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoPerfilEco[key]?.map) {
                                            const json = objInfoPerfilEco[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoPerfilEco[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoMercado) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoMercado,
                                    key
                                )
                            ) {
                                prevInfoMercado.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoMercado[key]?.map) {
                                            const json = objInfoMercado[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoMercado[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoNormatividad) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoMercado,
                                    key
                                )
                            ) {
                                prevInfoNormatividad.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoNormatividad[key]?.map) {
                                            const json = objInfoNormatividad[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoNormatividad[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoEncuestaHumanas) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoMercado,
                                    key
                                )
                            ) {
                                prevInfoEncuestaHumanas.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoEncuestaHumanas[key]?.map) {
                                            const json = objInfoEncuestaHumanas[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoEncuestaHumanas[key];
                                        }
                                    }
                                });
                            }
                        }

                        return {
                            ...prevState,
                            objInfoGeneral: prevInfoGeneral,
                            objInfoEmprendimiento: prevInfoEmprendimiento,
                            objInfoPerfilEco: prevInfoPerfilEco,
                            objInfoMercado: prevInfoMercado,
                            objInfoNormatividad: prevInfoNormatividad,
                            objInfoEncuestaHumanas: prevInfoEncuestaHumanas
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

    const handlerChangeOpenModalPDF = () => {
        setOpenModalPDF(!openModalPDF);
    };

    const handlerChangeOpenCollapseInfoGeneral = () => {
        setOpenCollapseInfoGeneral(!openCollapseInfoGeneral);
    };

    const handlerChangeOpenCollapseInfoFamiliar = () => {
        setOpenCollapseInfoFamiliar(!openCollapseInfoFamiliar);
    };

    const handlerChangeOpenCollapseInfoEmprendimiento = () => {
        setOpenCollapseInfoEmprendimiento(!openCollapseInfoEmprendimiento);
    };

    const handlerChangeOpenCollapseInfoEmpresa = () => {
        setOpenCollapseInfoEmpresa(!openCollapseInfoEmpresa);
    };

    const handlerChangeOpenCollapseInfoPerfilEco = () => {
        setOpenCollapseInfoPerfilEco(!openCollapseInfoPerfilEco);
    };

    const handlerChangeOpenCollapseInfoAdicional = () => {
        setOpenCollapseInfoAdicional(!openCollapseInfoAdicional);
    };

    //===============================================================================================================================================
    //========================================== useEffects =========================================================================================
    //===============================================================================================================================================
    useEffect(() => {
        if (intIdIdea) {
            setLoadingGetData(true);
            getData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [intIdIdea, intIdDiagnostico]);

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
                intId={intIdDiagnostico}
                handleOpenDialog={handlerChangeOpenModalEdit}
                open={openModalEdit}
                onChangeRoute={onChangeRoute}
                intIdIdea={intIdIdea}
                intIdDiagnostico={intIdDiagnostico}
            />

            <ModalFinish
                handleOpenDialog={handlerChangeOpenModalFinish}
                open={openModalFinish}
                onChangeRoute={onChangeRoute}
                intIdIdea={intIdIdea}
                intIdDiagnostico={intIdDiagnostico}
                refresh={getData}
            />

            <ModalPDF
                handleOpenDialog={handlerChangeOpenModalPDF}
                open={openModalPDF}
                intIdIdea={intIdIdea}
                intIdDiagnostico={intIdDiagnostico}
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
                        <Box sx={{ flexGrow: 1 }}></Box>

                        <Box>
                            <Tooltip title="Finalizar diagnóstico">
                                <IconButton
                                    color="error"
                                    disabled={finalizado}
                                    onClick={() =>
                                        handlerChangeOpenModalFinish()
                                    }
                                >
                                    <CheckCircleIcon />
                                </IconButton>
                            </Tooltip>

                            <Can I="edit" a="Diag">
                                <Tooltip title="Editar diagnóstico">
                                    <IconButton
                                        color="success"
                                        disabled={finalizado}
                                        onClick={() =>
                                            handlerChangeOpenModalEdit()
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                            </Can>

                            <Tooltip title="Imprimir diagnóstico">
                                <IconButton
                                    color="inherit"
                                    onClick={() => handlerChangeOpenModalPDF()}
                                >
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                            {finalizado ? (
                                <Tooltip title="Previsualizar diagnóstico">
                                    <IconButton
                                        color="inherit"
                                        onClick={() =>
                                            onChangeRoute(
                                                "DiagEmpresarialPrev",
                                                {
                                                    intIdIdea,
                                                    intIdDiagnostico,
                                                    isPreview: true,
                                                }
                                            )
                                        }
                                    >
                                        <RemoveRedEyeIcon />
                                    </IconButton>
                                </Tooltip>
                            ) : null}
                        </Box>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Typography
                        sx={{ color: "#F5B335", textTransform: "uppercase" }}
                        textAlign="center"
                    >
                        <b>detalle diagnóstico exprés</b>
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
                                    <b>Información familiar</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoFamiliar()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoFamiliar
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoFamiliar ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseInfoFamiliar} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoFamiliar.map((e, i) => (
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

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Información del emprendimiento</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoEmprendimiento()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoEmprendimiento
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoEmprendimiento ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoEmprendimiento}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoEmprendimiento.map((e, i) => (
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

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>
                                        Profundización información de la empresa
                                    </b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoEmpresa()
                                    }
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
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoEmpresa.map((e, i) => (
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

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b> Perfil económico y productivo</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoPerfilEco()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoPerfilEco
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoPerfilEco ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseInfoPerfilEco} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoPerfilEco.map((e, i) => (
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

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>
                                        Información adicional (Concluciones,
                                        observaciones y registro fotográfico)
                                    </b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoAdicional()
                                    }
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
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoAdicional.map((e, i) => (
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

export default ResumenExp;
