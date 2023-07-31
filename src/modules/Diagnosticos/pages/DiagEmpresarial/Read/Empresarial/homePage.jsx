import React, { Fragment, useState, useEffect, useRef } from "react";

//Librerias
import { format, parseISO } from "date-fns";
import validator from "validator";
import html2canvas from "html2canvas";

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
} from "@mui/icons-material";

import Loader from "../../../../../../common/components/Loader";
import ErrorPage from "../../../../../../common/components/Error";
import useGetDiagnGeneral from "../../../../hooks/useGetDiagnGeneral";
import ModalEditDiag from "./modalEdit";
import ModalPDF from "./modalPDF";
import ModalFinish from "./modalFinish";

const ResumenEmp = ({ onChangeRoute, intIdIdea, intIdDiagnostico }) => {
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
        objInfoFamiliar: [
            {
                parent: "strCabezaHogar",
                value: "",
                label: "¿Es cabeza de hogar?",
            },
            {
                parent: "intNumPersonasCargo",
                value: "",
                label: "Número de personas que dependen económicamente de usted",
            },
            {
                parent: "intHijos",
                value: "",
                label: "Número de hijos",
            },
            {
                parent: "intHijosEstudiando",
                value: "",
                label: "¿Cuántos de ellos están estudiando?",
            },
            {
                parent: "strMaxNivelEducativoHijos",
                value: "",
                label: "Nivel educativo máximo de los hijos",
            },
            {
                parent: "strEstadoCivil",
                value: "",
                label: "Estado Civil",
            },
            {
                parent: "strSituacionVivienda",
                value: "",
                label: "Situación de vivienda",
            },
            {
                parent: "strGrupoVulnerable",
                value: "",
                label: "Grupo poblacional vulnerable (no preguntar de observación)",
            },
            {
                parent: "strPoblacionEtnica",
                value: "",
                label: "Población étnica",
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
                label: "¿En qué año inició la operación?",
            },
            {
                parent: "arrDepartamento",
                value: "",
                label: "Lugar de operación de la empresa",
            },
            {
                parent: "arrCiudad",
                value: "",
                label: "Departamento",
            },
            {
                parent: "strBarrio",
                value: "",
                label: "Ciudad",
            },
            {
                parent: "strDireccionResidencia",
                value: "",
                label: "Barrio/Corregimiento/Vereda",
            },
            {
                parent: "strUbicacionUP",
                value: "",
                label: "Dirección de la empresa",
            },
            {
                parent: "strCelular",
                value: "",
                label: "Ubicación de la UP (Urbana o Rural)",
            },
            {
                parent: "strCorreoElectronico",
                value: "",
                label: "Correo electrónico",
            },
            {
                parent: "strRedesSociales",
                value: "",
                label: "¿Tiene presencia en redes sociales?",
            },
            {
                parent: "arrMediosDigitales",
                value: "",
                label: "Medios digitales",
            },
            {
                parent: "strRegistroCamaraComercio",
                value: "",
                label: "¿Cuenta con registro en cámara de comercio?",
            },
            {
                parent: "strTiempoDedicacion",
                value: "",
                label: "Tiempo de dedicación actual a la empresa",
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
                parent: "arrCategoriasSecundarias",
                value: "",
                label: "Categorías secundarias",
            },
            {
                parent: "strOtraCategoria",
                value: "",
                label: "Otra categoría ¿cuál?",
            },
            {
                parent: "strListadoProdServ",
                value: "",
                label: "Listado de los productos o servicios",
            },
            {
                parent: "btGeneraEmpleo",
                value: "",
                label: "¿La empresa genera empleo para otras personas?",
            },
            {
                parent: "strProductoServiciosEnValidacion",
                value: "",
                label: "¿Tiene definidas las líneas de productos/servicios del negocio?",
            },
            {
                parent: "strNivelDlloProductoServicios",
                value: "",
                label: "¿Cuál es la línea de productos/servicios más destacada?",
            },
            {
                parent: "strEtapaValidProductoServicios",
                value: "",
                label: "¿Cuenta con productos/servicios en validación?",
            },
            {
                parent: "MinimoValorProducto",
                value: "",
                label: "Nivel de desarrollo del producto/servicio",
            },
            {
                parent: "MaximoValorProducto",
                value: "",
                label: "¿En qué etapa de validación se encuentra el producto/servicio?",
            },
            {
                parent: "intCantidadUnidadesProducidasMes",
                value: "",
                label: "Rango de precios de productos mínimo",
            },
            {
                parent: "strEscojaProductoServicio",
                value: "",
                label: "Rango de precios de productos máximo",
            },
            {
                parent: "ValorVentaProductoEscogido",
                value: "",
                label: "Cantidad de unidades producidas al mes actualmente",
            },
            {
                parent: "strConoceCostosProductoEscogido",
                value: "",
                label: "Escoja uno de los productos/servicios de su empresa",
            },
            {
                parent: "CostoProduccionProductoEscogido",
                value: "",
                label: "De acuerdo con el producto/servicio escogido ¿Cuál es el precio de venta de este?",
            },
            {
                parent: "strDefinePorcentajesCanal",
                value: "",
                label: "Del producto escogido ¿Tiene conocimiento de cuál es el margen de rentabilidad?",
            },
            {
                parent: "strDefinineLineasProductoServicios",
                value: "",
                label: "¿Tiene definidas las líneas de productos/servicios del negocio?",
            },
            {
                parent: "strLineaProductoServicioDestacada",
                value: "",
                label: "¿Cuál es la línea de productos/servicios más destacada?",
            },
            {
                parent: "intCantidadUnidadesProducidasMes",
                value: "",
                label: "Cantidad de unidades producidas al mes actualmente",
            },
            {
                parent: "strEscojaProductoServicio",
                value: "",
                label: "Escoja uno de los productos/servicios de su empresa",
            },
            {
                parent: "strConoceCostosProductoEscogido",
                value: "",
                label: "¿Conoce los costos de producción de este producto?",
            },
        ],
        objInfoEmpresa: [
            {
                parent: "strHistoriaEmpresa",
                value: "",
                label: "¿Cómo nace la empresa? - Historia",
            },
            {
                parent: "strSuenioEmpresa",
                value: "",
                label: "¿Cómo sueña su empresa?/¿Cómo se ve usted en cinco años?",
            },
            {
                parent: "strEstudioEmprendimiento",
                value: "",
                label: "¿Tiene estudio o aprendizaje sobre el tema de emprendimiento? ",
            },
            {
                parent: "strExperienciaEmprendimiento",
                value: "",
                label: "¿Tiene experiencia en este tipo de emprendimiento?",
            },
            {
                parent: "strTipoContribuyente",
                value: "",
                label: "Tipo de contribuyente",
            },
            {
                parent: "strRut",
                value: "",
                label: "N° de Identificación del RUT (NIT)",
            },
            {
                parent: "strPresupuestoFamiliar",
                value: "",
                label: "¿Los ingresos de esta inicativa son una fuente fundamental para el presupuesto familiar?",
            },
            {
                parent: "strIngresosDistintos",
                value: "",
                label: "¿Tu familia recibe ingresos por origen de otras fuentes distintas del emprendimiento?",
            },
            {
                parent: "strTrabajanFamiliares",
                value: "",
                label: "¿En la empresa participan familiares?",
            },
        ],
        objInfoPerfilEco: [
            {
                parent: "strOperacionesVentas6Meses",
                value: "",
                label: "¿La empresa tiene operaciones de producción y venta en los últimos 6 meses de manera continúa?",
            },
            {
                parent: "strEtapaValidacion",
                value: "",
                label: "¿En qué etapa de validación se encuentra tu producto?",
            },
            {
                parent: "strPromedioVentas6Meses",
                value: "",
                label: "Promedio de ventas de los últimos 6 meses",
            },
            {
                parent: "dblValorVentasMes",
                value: "",
                label: "Valor promedio de las ventas mensuales",
            },
            {
                parent: "strRangoVentas",
                value: "",
                label: "Rango de ventas",
            },
            {
                parent: "intNumeroEmpleados",
                value: "",
                label: "Número de empleos generados",
            },
            {
                parent: "strRangoEmpleados",
                value: "",
                label: "Rango de empleados",
            },
            {
                parent: "strTipoEmpleoGenerado",
                value: "",
                label: "¿Qué tipo de empleo genera?",
            },
            {
                parent: "strDlloAcitividadesContratados",
                value: "",
                label: "¿Cuáles actividades desarrollan las personas contratadas?",
            },
            {
                parent: "strPromedioTiempoInvertido",
                value: "",
                label: "En promedio, cuánto tiempo durante el día puede invertir para su emprendimiento entre las diferentes activiades que realiza",
            },
            {
                parent: "strRolesEmprendimiento",
                value: "",
                label: "¿Cuál son tus roles en la operación de tú emprendimiento?",
            },
            {
                parent: "strDiasProduccion",
                value: "",
                label: "¿En promedio al día cuántas horas dispones para la producción:?",
            },
            {
                parent: "strGeneraEmpleoRiesgoPobreza",
                value: "",
                label: "¿Genera empleo o ingresos para personas que se encuentren en riesgo de pobreza o de exclusión socia?",
            },
            {
                parent: "strActivos",
                value: "",
                label: "¿Qué activos tiene la unidad productiva a la fecha?",
            },
            {
                parent: "dblValorActivos",
                value: "",
                label: "Valor estimado de los activos",
            },
            {
                parent: "dblValorGananciasMes",
                value: "",
                label: "Valor de las ganancias mensuales",
            },
        ],
        objInfoAdicional: [
            {
                parent: "strConclusiones",
                value: "",
                label: "Conclusiones y observaciones",
            },
            {
                parent: "strURLSFotosProducto",
                value: "",
                label: "Registro fotográfico",
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
    const { getUniqueData } = useGetDiagnGeneral({
        autoLoad: false,
        intIdDiagnostico,
    });

    const refFntGetData = useRef(getUniqueData);

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
            .current({ intIdDiagnostico })
            .then((res) => {
                if (res.data.error) {
                    throw new Error(res.data.msg);
                }

                if (res.data) {
                    let data = res.data.data[0];

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

                    const objInfoFamiliar = data.objInfoFamiliar;
                    const objInfoEmprendimiento = data.objInfoEmprendimiento;
                    const objInfoEmpresa = data.objInfoEmpresa;
                    const objInfoPerfilEco = data.objInfoPerfilEco;
                    const objInfoAdicional = data.objInfoAdicional;

                    setData((prevState) => {
                        let prevInfoGeneral = prevState.objInfoGeneral;
                        let prevInfoFamiliar = prevState.objInfoFamiliar;
                        let prevInfoEmprendimiento =
                            prevState.objInfoEmprendimiento;
                        let prevInfoEmpresa = prevState.objInfoEmpresa;
                        let prevInfoPerfilEco = prevState.objInfoPerfilEco;
                        let prevInfoAdicional = prevState.objInfoAdicional;

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

                        for (const key in objInfoFamiliar) {
                            if (
                                Object.hasOwnProperty.call(objInfoFamiliar, key)
                            ) {
                                prevInfoFamiliar.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoFamiliar[key]?.map) {
                                            const json = objInfoFamiliar[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoFamiliar[key];
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
                                    if (e.parent === key) {
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

                        for (const key in objInfoEmpresa) {
                            if (
                                Object.hasOwnProperty.call(objInfoEmpresa, key)
                            ) {
                                prevInfoEmpresa.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoEmpresa[key]?.map) {
                                            const json = objInfoEmpresa[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoEmpresa[key];
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

                        for (const key in objInfoAdicional) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoAdicional,
                                    key
                                )
                            ) {
                                prevInfoAdicional.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoAdicional[key]?.map) {
                                            const json = objInfoAdicional[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoAdicional[key];
                                        }
                                    }
                                });
                            }
                        }

                        return {
                            ...prevState,
                            objInfoGeneral: prevInfoGeneral,
                            objInfoFamiliar: prevInfoFamiliar,
                            objInfoEmprendimiento: prevInfoEmprendimiento,
                            objInfoEmpresa: prevInfoEmpresa,
                            objInfoPerfilEco: prevInfoPerfilEco,
                            objInfoAdicional: prevInfoAdicional,
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
                intId={intIdDiagnostico}
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

                            <Tooltip title="Editar diagnóstico">
                                <IconButton
                                    color="success"
                                    disabled={finalizado}
                                    onClick={() => handlerChangeOpenModalEdit()}
                                >
                                    <EditIcon />
                                </IconButton>
                            </Tooltip>

                            <Tooltip title="Imprimir diagnóstico">
                                <IconButton
                                    color="inherit"
                                    disabled
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
                        <b>detalle diagnóstico general</b>
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

export default ResumenEmp;
