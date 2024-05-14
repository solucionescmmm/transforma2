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

import Loader from "../../../../../../common/components/Loader";
import ErrorPage from "../../../../../../common/components/Error";
import useGetDiagnGeneral from "../../../../hooks/useGetDiagnGeneral";
import ModalEditDiag from "./modalEdit";
import ModalPDF from "./modalPDF";
import ModalFinish from "./modalFinish";
import { Can } from "../../../../../../common/functions/can";
import { ImageViewer } from "../../../../../../common/components/ImageViewer";
import useGetEmpresarios from "../../../../../Empresarios/hooks/useGetEmpresarios";

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
                parent: "dtmActualizacion",
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
                parent: "strTrabajanFamiliares",
                value: "",
                label: "¿En la empresa participan familiares?",
            },
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
                parent: "intAñoInicioOperacion",
                value: "",
                label: "¿En qué año inició la operación?",
            },
            {
                parent: "strLugarOperacion",
                value: "",
                label: "Lugar de operación de la empresa",
            },
            {
                parent: "arrPais",
                value: "",
                label: "País",
            },
            {
                parent: "arrDepartamento",
                value: "",
                label: "Departamento",
            },
            {
                parent: "arrCiudad",
                value: "",
                label: "Ciudad",
            },
            {
                parent: "strBarrio",
                value: "",
                label: "Barrio/Corregimiento/Vereda",
            },
            {
                parent: "strDireccionResidencia",
                value: "",
                label: "Dirección de la empresa",
            },
            {
                parent: "strUbicacionUP",
                value: "",
                label: "Ubicación de la UP (Urbana o Rural)",
            },
            {
                parent: "strCelular",
                value: "",
                label: "Celular",
            },
            {
                parent: "strCorreoElectronico",
                value: "",
                label: "Correo electrónico",
            },
            {
                parent: "strRegistroCamaraComercio",
                value: "",
                label: "¿Cuenta con registro en cámara de comercio?",
            },
            {
                parent: "strHistoriaEmpresa",
                value: "",
                label: "¿Cómo nace la empresa? - Historia",
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
                label: "Categorías alternas",
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
                parent: "strProductoServiciosEnValidacion",
                value: "",
                label: "¿Cuenta con productos/servicios en validación?",
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
        objInfoEmpresa: [
            {
                parent: "strSuenioEmpresa",
                value: "",
                label: "¿Cómo sueña su empresa?",
            },
            {
                parent: "strComoVeCincoAños",
                value: "",
                label: "¿Cómo se ve usted en cinco años?",
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
        ],
        objInfoPerfilEco: [
            {
                parent: "strEtapaDllo",
                value: "",
                label: "Etapa de desarrollo",
            },
            {
                parent: "strOperacionesVentas6Meses",
                value: "",
                label: "¿La empresa tiene operaciones de producción y venta en los últimos 6 meses de manera continua?",
            },
            {
                parent: "PromedioVentas6Meses",
                value: "",
                label: "Promedio de ventas de los últimos 6 meses",
            },
            {
                parent: "dblValorVentasMes",
                value: "",
                label: "Valor de ventas del último mes",
            },
            {
                parent: "dblValorGananciasMes",
                value: "",
                label: "Valor de las ganancias mensuales",
            },
            {
                parent: "strRangoVentas",
                value: "",
                label: "Rango de ventas",
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
                parent: "MinimoValorProducto",
                value: "",
                label: "Rango de precios de productos mínimo",
            },
            {
                parent: "MaximoValorProducto",
                value: "",
                label: "Rango de precios de productos máximo",
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
                parent: "intPorcentajeMargenRentaProductoEscogido",
                value: "",
                label: "En caso de que la pregunta anterior sea afirmativa, ¿Cuál es el margen de utilidad de este producto?",
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
                parent: "strPorcentajeIntermediacionVentas",
                value: "",
                label: "Tiene porcentaje(s) estimados para la intermediación en ventas?",
            },
            {
                parent: "intMargenRentabilidad",
                value: "",
                label: "Margen de rentabilidad",
            },
            {
                parent: "strDefinePorcentajesCanal",
                value: "",
                label: "En caso de que la pregunta anterior sea afirmativa, ¿tiene definido este porcentaje, de acuerdo con cada canal?",
            },
            {
                parent: "intRangoPorcentajeIntermediacionVentas",
                value: "",
                label: "¿De cuánto es el rango o porcentaje definido?",
            },
            {
                parent: "btGeneraEmpleo",
                value: "",
                label: "¿La empresa genera empleo para ti y/o para otras personas? ",
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
                label: "¿En promedio al día cuántas horas dispones para la producción?",
            },
            {
                parent: "strGeneraEmpleoRiesgoPobreza",
                value: "",
                label: "¿Genera empleo o ingresos para personas que se encuentren en riesgo de pobreza o de exclusión social?",
            },
        ],
        objInfoCanalesVenta: [
            {
                parent: "arrMediosDigitales",
                value: "",
                label: "Medios digitales",
            },
            {
                parent: "arrFormasComercializacion",
                value: "",
                label: "Formas de comercialización",
            },
        ],
        objInfoAdicional: [
            {
                parent: "strConclusiones",
                value: "",
                label: "Conclusiones y observaciones",
            },
        ],
        arrImagenes: [],
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
    const [openCollapseConclusiones, setOpenCollapseConclusiones] =
        useState(true);

    const [openCollapseInfoCanalesVenta, setOpenCollapseInfoCanalesVenta] =
        useState(true);

    const [openCollapseFotos, setOpenCollapseFotos] = useState(true);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { getUniqueData: getUniqueDataGen } = useGetDiagnGeneral({
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

                    const arrImagenes =
                        data.objInfoAdicional?.strURLSFotosProducto?.split(";");

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
                        dtmActualizacion: data.objInfoGeneral.dtmActualizacion
                            ? parseISO(data.objInfoGeneral.dtmActualizacion)
                            : null,
                        strUsuarioActualizacion:
                            data.objInfoGeneral.strUsuarioActualizacion || "",
                    };

                    const objInfoFamiliar = data.objInfoFamiliar;
                    const objInfoEmprendimiento = {
                        ...data.objInfoEmprendimiento,
                        strUnidadProductiva:
                            dataEmpr.objInfoEmpresa.strNombreMarca,
                        strLugarOperacion:
                            dataEmpr.objInfoEmpresa.strLugarOperacion,
                        arrPais: dataEmpr.objInfoEmpresa.arrPais,
                        arrDepartamento:
                            dataEmpr.objInfoEmpresa.arrDepartamento,
                        arrCiudad: dataEmpr.objInfoEmpresa.arrCiudad,
                        strBarrio: dataEmpr.objInfoEmpresa.strBarrio,
                        strDireccionResidencia:
                            dataEmpr.objInfoEmpresa.strDireccionResidencia,
                        strCelular: objEmprPrincipal.strCelular1 || "",
                        strCorreoElectronico:
                            objEmprPrincipal.strCorreoElectronico1 || "",
                        strRedesSociales:
                            dataEmpr.objInfoEmpresa.arrMediosDigitales?.length >
                            0
                                ? "Sí"
                                : "No",
                        arrMediosDigitales:
                            dataEmpr.objInfoEmpresa.arrMediosDigitales || [],
                        strTiempoDedicacion:
                            dataEmpr.objInfoEmpresa.strTiempoDedicacion || "",
                        strSectorEconomico:
                            dataEmpr.objInfoEmpresa.strSectorEconomico || "",
                        strCategoriaProducto:
                            dataEmpr.objInfoEmpresa.strCategoriaProducto || "",
                        strCategoriaServicio:
                            dataEmpr.objInfoEmpresa.strCategoriaServicio || "",
                        arrCategoriasSecundarias:
                            dataEmpr.objInfoEmpresa.arrCategoriasSecundarias ||
                            [],
                        strOtraCategoria:
                            dataEmpr.objInfoEmpresa.strOtraCategoria || "",
                        btGeneraEmpleo:
                            typeof dataEmpr.objInfoEmpresa.btGeneraEmpleo ===
                            "boolean"
                                ? dataEmpr.objInfoEmpresa.btGeneraEmpleo
                                : "",
                    };
                    const objInfoEmpresa = data.objInfoEmpresa;
                    const objInfoPerfilEco = {
                        ...data.objInfoPerfilEco,
                        btGeneraEmpleo:
                            typeof dataEmpr.objInfoEmpresa.btGeneraEmpleo ===
                            "boolean"
                                ? dataEmpr.objInfoEmpresa.btGeneraEmpleo
                                : "",
                        dblValorVentasMes:
                            dataEmpr.objInfoEmpresa.valorVentasMes || "",
                        intNumeroEmpleados:
                            dataEmpr.objInfoEmpresa.intNumeroEmpleados || "",
                    };
                    const objInfoAdicional = data.objInfoAdicional;

                    const objInfoCanalesVenta = {
                        ...data.objInfoCanalesVenta,
                        arrMediosDigitales:
                            dataEmpr.objInfoEmpresa.arrMediosDigitales || [],
                        arrFormasComercializacion:
                            dataEmpr.objInfoEmpresa.arrFormasComercializacion ||
                            [],
                    };

                    setData((prevState) => {
                        let prevInfoGeneral = prevState.objInfoGeneral;
                        let prevInfoFamiliar = prevState.objInfoFamiliar;
                        let prevInfoEmprendimiento =
                            prevState.objInfoEmprendimiento;
                        let prevInfoEmpresa = prevState.objInfoEmpresa;
                        let prevInfoPerfilEco = prevState.objInfoPerfilEco;
                        let prevInfoAdicional = prevState.objInfoAdicional;
                        let prevInforCanalesVenta =
                            prevState.objInfoCanalesVenta;

                        for (const key in objInfoGeneral) {
                            if (
                                Object.hasOwnProperty.call(objInfoGeneral, key)
                            ) {
                                prevInfoGeneral.forEach((e) => {
                                    if (e.parent === key) {
                                        e.value = objInfoGeneral[key];

                                        if (key === "dtmActualizacion") {
                                            e.value = validator.isDate(e.value)
                                                ? format(
                                                      e.value,
                                                      "yyyy-MM-dd H:mm"
                                                  )
                                                : "No diligenciado";
                                        }

                                        if (key === "dtmFechaSesion") {
                                            e.value = validator.isDate(e.value)
                                                ? format(
                                                      e.value,
                                                      "yyyy-MM-dd H:mm"
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
                                                    if (x.strCodigoRetorno) {
                                                        return x.strCodigoRetorno;
                                                    }

                                                    if (x.label && x.value) {
                                                        return `${x.label}:${x.value}`;
                                                    }

                                                    if (x.label) {
                                                        return x.label;
                                                    }

                                                    return "";
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
                                    if (
                                        e.parent === key &&
                                        key === "arrDepartamento"
                                    ) {
                                        e.value =
                                            objInfoEmprendimiento[
                                                key
                                            ]?.region_name;
                                    } else if (
                                        e.parent === key &&
                                        key === "arrPais"
                                    ) {
                                        e.value =
                                            objInfoEmprendimiento[
                                                key
                                            ]?.country_name;
                                    } else if (
                                        e.parent === key &&
                                        key === "arrCiudad"
                                    ) {
                                        e.value =
                                            objInfoEmprendimiento[
                                                key
                                            ]?.city_name;
                                    } else if (e.parent === key) {
                                        if (objInfoEmprendimiento[key]?.map) {
                                            const json =
                                                objInfoEmprendimiento[key];

                                            const str = json
                                                .map((x) => {
                                                    if (x.strCodigoRetorno) {
                                                        return x.strCodigoRetorno;
                                                    }

                                                    if (x.label && x.value) {
                                                        return `${x.label}:${x.value}`;
                                                    }

                                                    if (x.label) {
                                                        return x.label;
                                                    }

                                                    return "";
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
                                                    if (x.strCodigoRetorno) {
                                                        return x.strCodigoRetorno;
                                                    }

                                                    if (x.label && x.value) {
                                                        return `${x.label}:${x.value}`;
                                                    }

                                                    if (x.label) {
                                                        return x.label;
                                                    }

                                                    return "";
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
                                                    if (x.strCodigoRetorno) {
                                                        return x.strCodigoRetorno;
                                                    }

                                                    if (x.label && x.value) {
                                                        return `${x.label}:${x.value}`;
                                                    }

                                                    if (x.label) {
                                                        return x.label;
                                                    }

                                                    return "";
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            if (
                                                (key ===
                                                    "PromedioVentas6Meses" ||
                                                    key ===
                                                        "ValorVentaProductoEscogido" ||
                                                    key ===
                                                        "CostoProduccionProductoEscogido" ||
                                                    key ===
                                                        "dblValorVentasMes" ||
                                                    key ===
                                                        "dblValorGananciasMes" ||
                                                    key === "dblValorActivos" ||
                                                    key ===
                                                        "MinimoValorProducto" ||
                                                    key ===
                                                        "MaximoValorProducto") &&
                                                objInfoPerfilEco[key]
                                            ) {
                                                e.value = new Intl.NumberFormat(
                                                    "es-ES",
                                                    {
                                                        style: "currency",
                                                        currency: "COP",
                                                    }
                                                ).format(objInfoPerfilEco[key]);

                                                return;
                                            }

                                            if (
                                                key ===
                                                    "intPorcentajeMargenRentaProductoEscogido" &&
                                                objInfoPerfilEco[key]
                                            ) {
                                                e.value = `${objInfoPerfilEco[key]}%`;
                                                return;
                                            }

                                            if (
                                                key === "intMargenRentabilidad" &&
                                                objInfoPerfilEco[key]
                                            ) {
                                                // Multiplica por 100 y redondea a 2 decimales
                                                const valorRedondeado = (objInfoPerfilEco[key] * 100).toFixed(2);
                                                e.value = `${valorRedondeado}%`;
                                                return;
                                            }

                                            e.value =
                                                typeof objInfoPerfilEco[key] ===
                                                "boolean"
                                                    ? objInfoPerfilEco[key] ===
                                                      true
                                                        ? "Sí"
                                                        : "No"
                                                    : objInfoPerfilEco[key];
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
                                                    if (x.strCodigoRetorno) {
                                                        return x.strCodigoRetorno;
                                                    }

                                                    if (x.label && x.value) {
                                                        return `${x.label}:${x.value}`;
                                                    }

                                                    if (x.label) {
                                                        return x.label;
                                                    }

                                                    return "";
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

                        for (const key in objInfoCanalesVenta) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoCanalesVenta,
                                    key
                                )
                            ) {
                                prevInforCanalesVenta.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoCanalesVenta[key]?.map) {
                                            const json =
                                                objInfoCanalesVenta[key];

                                            const str = json
                                                .map((x) => {
                                                    if (x.strCodigoRetorno) {
                                                        return x.strCodigoRetorno;
                                                    }

                                                    if (x.label && x.value) {
                                                        return `${x.label}:${x.value}`;
                                                    }

                                                    if (x.label) {
                                                        return x.label;
                                                    }

                                                    return "";
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoCanalesVenta[key];
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
                            arrImagenes: newArrImagenes,
                            objInfoCanalesVenta: prevInforCanalesVenta,
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

    const handlerChangeOpenCollapseConclusiones = () => {
        setOpenCollapseConclusiones(!openCollapseConclusiones);
    };

    const handlerChangeOpenCollapseFotos = () => {
        setOpenCollapseFotos(!openCollapseFotos);
    };

    const handlerChangeOpenCollapseInfoCanalesVentas = () => {
        setOpenCollapseInfoCanalesVenta(!openCollapseInfoCanalesVenta);
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
                        <b>detalle información general</b>
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
                                                alignContent: "center",
                                            }}
                                        >
                                            <b style={{ marginRight: "5px" }}>
                                                {e.label}:{" "}
                                            </b>
                                            {typeof e.value === "number"
                                                ? e.value
                                                : e.value || "No diligenciado"}
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
                                    <b>Información de la empresa</b>
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
                                    <b>Canales de ventas</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoCanalesVentas()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoCanalesVenta
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoCanalesVenta ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoCanalesVenta}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoCanalesVenta.map((e, i) => (
                                    <Grid item xs={12} md={6} key={i}>
                                        <p
                                            style={{
                                                margin: "0px",
                                                fontSize: "13px",
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

                <Grid id item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Conclusiones y observaciones </b>
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
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoAdicional.map((e, i) => (
                                    <Grid item xs={12} md={6} key={i}>
                                        <p
                                            style={{
                                                margin: "0px",
                                                fontSize: "13px",
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
                                spacing={0}
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
            </Grid>
        </Fragment>
    );
};

export default ResumenEmp;
