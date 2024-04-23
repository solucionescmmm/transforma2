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
import { ImageViewer } from "../../../../../common/components/ImageViewer";

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
            // {
            //     parent: "arrFormasComercializacion",
            //     value: "",
            //     label: "Formas de comercialización",
            // },
            // {
            //     parent: "arrMediosDigitales",
            //     value: "",
            //     label: "Medios digitales",
            // },
            {
                parent: "strRegistroCamaraComercio",
                value: "",
                label: "¿Cuenta con registro en cámara de comercio?",
            },
            {
                parent: "strTiempoDedicacion",
                value: "",
                label: "¿Cuánto tiempo dedica actualmente a la empresa?",
            },
            {
                parent: "strSectorEconomico",
                value: "",
                label: "Sector económico",
            },
            {
                parent: "strCategoriaProducto",
                value: "",
                label: "Categoría principal de productos",
            },
            {
                parent: "strCategoriaServicio",
                value: "",
                label: "Categoría principal de los servicios",
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
                parent: "arrCategoriasSecundarias",
                value: "",
                label: "Categorías alternas",
            },
            {
                parent: "strLineaProductoServicioDestacada",
                value: "",
                label: "¿Cuál es la línea de productos/servicios más destacada?",
            },
            {
                parent: "strProductoServiciosNuevosUltimoAño",
                value: "",
                label: "¿Tiene productos/servicios nuevos en el último año o se encuentra renovando los productos actuales?",
            },
            {
                parent: "strListaProductoServiciosNuevosUltimoAño",
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
                parent: "strUniProdSosFinan",
                value: "",
                label: "Mi unidad productiva es sostenible financieramente",
            },
            {
                parent: "strPrecProdServ",
                value: "",
                label: "¿Cómo están definidos los precios de tus productos/servicios?",
            },
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
                parent: "intMargenRentabilidad",
                value: "",
                label: "Margen de rentabilidad",
            },
            {
                parent: "btGeneraEmpleo",
                value: "",
                label: "¿La empresa genera empleo para otras personas?",
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
                label: "La empresa está formalizada de acuerdo con la normatividad laboral",
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
            {
                parent: "strOtrosCanalesCrecimiento",
                value: "",
                label: "¿Ha desarrollado otros canales que le apoyen en el crecimiento en ventas?",
            },
            {
                parent: "strCualesCanalesCrecimiento",
                value: "",
                label: "¿Cuáles?",
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

    const [openCollapseInfoEmprendimiento, setOpenCollapseInfoEmprendimiento] =
        useState(true);

    const [openCollapseInfoPerfilEco, setOpenCollapseInfoPerfilEco] =
        useState(true);

    const [openCollapseInfoMercado, setOpenCollapseInfoMercado] =
        useState(true);

    const [openCollapseInfoNormatividad, setOpenCollapseInfoNormatividad] =
        useState(true);

    const [openCollapseInfoCanalesVenta, setOpenCollapseInfoCanalesVenta] =
        useState(true);

    const [
        openCollapseInfoEncuestaHumanas,
        setOpenCollapseInfoEncuestaHumanas,
    ] = useState(true);

    const [openCollapseConclusiones, setOpenCollapseConclusiones] =
        useState(true);

    const [openCollapseFotos, setOpenCollapseFotos] = useState(true);

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
                        strEtapaDllo: data.objInfoPerfilEco.strEtapaDllo,
                    };

                    const objInfoEmprendimiento = {
                        ...dataEmpr.objInfoEmprendimiento,
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

                    const objInfoPerfilEco = {
                        ...data.objInfoPerfilEco,
                        btGeneraEmpleo:
                            typeof dataEmpr.objInfoEmpresa.btGeneraEmpleo ===
                            "boolean"
                                ? dataEmpr.objInfoEmpresa.btGeneraEmpleo
                                : "",
                        intNumeroEmpleados:
                            dataEmpr.objInfoEmpresa.intNumeroEmpleados,
                    };

                    const objInfoMercado = data.objInfoMercado;
                    const objInfoNormatividad = data.objInfoNormatividad;
                    const objInfoEncuestaHumanas = data.objInfoEncuestaHumanas;
                    const objInfoCanalesVenta = {
                        ...data.objInfoCanalesVenta,
                        arrMediosDigitales:
                            dataEmpr.objInfoEmpresa.arrMediosDigitales || [],
                        arrFormasComercializacion:
                            dataEmpr.objInfoEmpresa.arrFormasComercializacion ||
                            [],
                    };

                    const objInfoAdicional = data.objInfoAdicional;

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

                        let prevInforCanalesVenta =
                            prevState.objInfoCanalesVenta;

                        let prevInfoAdicional = prevState.objInfoAdicional;

                        for (const key in objInfoGeneral) {
                            if (
                                Object.hasOwnProperty.call(objInfoGeneral, key)
                            ) {
                                prevInfoGeneral.forEach((e) => {
                                    if (e.parent === key) {
                                        e.value = objInfoGeneral[key];

                                        if (key === "dtmActualizacion") {
                                            e.value = validator.isDate(e.value)
                                                ? format(e.value, "yyyy-MM-dd H:mm")
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
                                                        "CostoProduccionProductoEscogido") &&
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
                                                key ===
                                                    "intMargenRentabilidad" &&
                                                objInfoPerfilEco[key]
                                            ) {
                                                e.value = `${
                                                    objInfoPerfilEco[key] * 100
                                                }%`;
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

                        for (const key in objInfoMercado) {
                            if (
                                Object.hasOwnProperty.call(objInfoMercado, key)
                            ) {
                                prevInfoMercado.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoMercado[key]?.map) {
                                            const json = objInfoMercado[key];

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
                                            e.value = objInfoMercado[key];
                                        }
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
                                        if (objInfoNormatividad[key]?.map) {
                                            const json =
                                                objInfoNormatividad[key];

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
                                            e.value = objInfoNormatividad[key];
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
                                        if (objInfoEncuestaHumanas[key]?.map) {
                                            const json =
                                                objInfoEncuestaHumanas[key];

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
                                                objInfoEncuestaHumanas[key];
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

                        return {
                            ...prevState,
                            objInfoGeneral: prevInfoGeneral,
                            objInfoEmprendimiento: prevInfoEmprendimiento,
                            objInfoPerfilEco: prevInfoPerfilEco,
                            objInfoMercado: prevInfoMercado,
                            objInfoNormatividad: prevInfoNormatividad,
                            objInfoEncuestaHumanas: prevInfoEncuestaHumanas,
                            objInfoCanalesVenta: prevInforCanalesVenta,
                            objInfoAdicional: prevInfoAdicional,
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

    const handlerChangeOpenModalPDF = () => {
        setOpenModalPDF(!openModalPDF);
    };

    const handlerChangeOpenCollapseInfoGeneral = () => {
        setOpenCollapseInfoGeneral(!openCollapseInfoGeneral);
    };

    const handlerChangeOpenCollapseInfoEmprendimiento = () => {
        setOpenCollapseInfoEmprendimiento(!openCollapseInfoEmprendimiento);
    };

    const handlerChangeOpenCollapseInfoPerfilEco = () => {
        setOpenCollapseInfoPerfilEco(!openCollapseInfoPerfilEco);
    };

    const handlerChangeOpenCollapseInfoMercado = () => {
        setOpenCollapseInfoMercado(!openCollapseInfoMercado);
    };

    const handlerChangeOpenCollapseInfoNormatividad = () => {
        setOpenCollapseInfoNormatividad(!openCollapseInfoNormatividad);
    };

    const handlerChangeOpenCollapseInfoEncuestaHumanas = () => {
        setOpenCollapseInfoEncuestaHumanas(!openCollapseInfoEncuestaHumanas);
    };

    const handlerChangeOpenCollapseInfoCanalesVentas = () => {
        setOpenCollapseInfoCanalesVenta(!openCollapseInfoCanalesVenta);
    };

    const handlerChangeOpenCollapseConclusiones = () => {
        setOpenCollapseConclusiones(!openCollapseConclusiones);
    };

    const handlerChangeOpenCollapseFotos = () => {
        setOpenCollapseFotos(!openCollapseFotos);
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
                                            onChangeRoute("DiagExpressPrev", {
                                                intIdIdea,
                                                intIdDiagnostico,
                                                isPreview: true,
                                            })
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
                                    <b>Perfil económico y productivo</b>
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
                                    <b>Componente de mercados y comercial</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoMercado()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoMercado
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoMercado ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse in={openCollapseInfoMercado} timeout="auto">
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoMercado.map((e, i) => (
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
                                    <b>Normatividad</b>
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
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoNormatividad.map((e, i) => (
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
                                    <Grid item xs={12} md={12} key={i}>
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

export default ResumenExp;
