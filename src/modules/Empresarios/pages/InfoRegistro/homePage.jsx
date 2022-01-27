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
                parent: "strTipoDocto",
                value: null,
                label: "Tipo de documento",
            },
            {
                parent: "strNroDocto",
                value: "",
                label: "Número de documento",
            },
            {
                parent: "strLugarExpedicionDocto",
                value: "",
                label: "Lugar de expedición del documento",
            },
            {
                parent: "dtFechaExpedicionDocto",
                value: "",
                label: "Fecha de expedición del documento",
            },
            {
                parent: "dtFechaNacimiento",
                value: "",
                label: "Fecha de nacimiento",
            },
            {
                parent: "strGenero",
                value: "",
                label: "Género",
            },
            {
                parent: "strCelular1",
                value: "",
                label: "Celular",
            },
            {
                parent: "strCelular2",
                value: "",
                label: "Celular alterno",
            },
            {
                parent: "strCorreoElectronico1",
                value: "",
                label: "Correo electrónico",
            },
            {
                parent: "strCorreoElectronico2",
                value: "",
                label: "Correo electrónico alterno",
            },
            {
                parent: "strNivelEducativo",
                value: "",
                label: "Nivel educativo",
            },
            {
                parent: "strTitulos",
                value: "",
                label: "Título(s)",
            },
            {
                parent: "strCondicionDiscapacidad",
                value: "",
                label: "Condición de discapacidad",
            },
            {
                parent: "strEstrato",
                value: "",
                label: "Estrato socioeconómico",
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
                label: "Dirección de residencia",
            },
        ],
        arrInfoEmpresarioSec: [],
        objInfoEmpresa: [
            {
                parent: "strEstadoNegocio",
                value: "",
                label: "Estado del negocio",
            },
            {
                parent: "strCuandoComienzaEmpresa",
                value: "",
                label: "Si aún no ha comenzado su empresa ¿Cuándo planea comenzar?",
            },
            {
                parent: "strNombreMarca",
                value: "",
                label: "Nombre de la empresa",
            },
            {
                parent: "dtFechaFundacion",
                value: "",
                label: "Fecha de fundación",
            },
            {
                parent: "strLugarOperacion",
                value: "",
                label: "Lugar de operación de la empresa",
            },
            {
                parent: "strDireccionResidencia",
                value: "",
                label: "Dirección de la empresa",
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
                parent: "strDescProductosServicios",
                value: "",
                label: "Describe los productos o servicios que ofrece",
            },
            {
                parent: "strMateriaPrima",
                value: "",
                label: "Materias primas utilizadas",
            },
            {
                parent: "strNombreTecnica",
                value: "",
                label: "Nombre de la técnica utilizada",
            },
            {
                parent: "strTiempoDedicacion",
                value: "",
                label: "Tiempo de dedicación actual a la idea o negocio",
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
                parent: "dblValorVentasMes",
                value: "",
                label: "Valor promedio de las ventas mensuales",
            },
            {
                parent: "arrRequisitosLey",
                value: "",
                label: "Requerimientos legales que cumple",
            },
            {
                parent: "arrRequisitosLey",
                value: "",
                label: "Requerimientos legales que cumple",
            },
            {
                parent: "strOtrosRequisitosLey",
                value: "",
                label: "Otros requerimientos legales",
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
                parent: "btGrupoAsociativo",
                value: "",
                label: "¿Pertenece algún grupo asociativo?",
            },
            {
                parent: "strAsociacionUnidadProdIndividual",
                value: "",
                label: "¿Como desea registrarse?",
            },
        ],
        objInfoAdicional: [
            {
                parent: "strPrincipalesNecesidades",
                value: "",
                label: "¿Cuáles son las principales necesidades e intereses de la empresa?",
            },
            {
                parent: "btInteresadoProcesoCMM",
                value: "",
                label: "¿Tiene interés en hacer parte del proceso de formación, capacitación y asesoría?",
            },
            {
                parent: "arrTemasCapacitacion",
                value: "",
                label: "¿En que temas le gustaría recibir asesoría o capacitación y quiere inscribirse?",
            },
            {
                parent: "arrComoSeEntero",
                value: "",
                label: "¿Cómo conoció De Mis Manos?",
            },
            {
                parent: "strOtroComoSeEntero",
                value: "",
                label: "Otro ¿Cuál?",
            },
            {
                parent: "arrMediosDeComunicacion",
                value: "",
                label: "¿Qué canales prefiere para el envío de información?",
            },
            {
                parent: "strOtrosMediosComunicacion",
                value: "",
                label: "Otro ¿Cuál?",
            },
            {
                parent: "btRecibirInfoCMM",
                value: "",
                label: "¿La persona autoriza a De Mis Manos para el envío de información?",
            },
            {
                parent: "strRecomendaciones",
                value: "",
                label: "Comentarios, ideas y recomendaciones",
            },
        ],
    });

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [loadingGetData, setLoadingGetData] = useState(false);

    const [openCollapseInfoPrincipal, setOpenCollapseInfoPrincipal] =
        useState(false);

    const [openCollapseInfoEmpresarioPr, setOpenCollapseInfoEmpresarioPr] =
        useState(false);

    const [openCollapseInfoEmpresarioSec, setOpenCollapseInfoEmpresarioSec] =
        useState(false);

    const [openCollapseInfoEmpresa, setOpenCollapseInfoEmpresa] =
        useState(false);
    const [openCollapseInfoAdicional, setOpenCollapseInfoAdicional] =
        useState(false);

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
                            dtFechaVinculacion: response.objEmpresario
                                .dtFechaVinculacion
                                ? parseISO(
                                      response.objEmpresario.dtFechaVinculacion
                                  )
                                : null,
                            strEstadoVinculacion:
                                response.objEmpresario.strEstadoVinculacion,
                            strTipoVinculacion:
                                response.objEmpresario.strTipoVinculacion,
                        };

                        let newObjInfoEmpresarioPr = {
                            intId: response.objEmpresario.intId,
                            strNombres: response.objEmpresario.strNombres || "",
                            strApellidos:
                                response.objEmpresario.strApellidos || "",
                            strTipoDocto:
                                response.objEmpresario.strTipoDocto || "",
                            strNroDocto:
                                response.objEmpresario.strNroDocto || "",
                            strLugarExpedicionDocto:
                                response.objEmpresario
                                    .strLugarExpedicionDocto || "",
                            dtFechaExpedicionDocto: response.objEmpresario
                                .dtFechaExpedicionDocto
                                ? parseISO(
                                      response.objEmpresario
                                          .dtFechaExpedicionDocto
                                  )
                                : null,
                            dtFechaNacimiento: response.objEmpresario
                                .dtFechaNacimiento
                                ? parseISO(
                                      response.objEmpresario.dtFechaNacimiento
                                  )
                                : null,
                            strGenero: response.objEmpresario.strGenero || "",
                            strCelular1:
                                response.objEmpresario.strCelular1 || "",
                            strCelular2:
                                response.objEmpresario.strCelular2 || "",
                            strCorreoElectronico1:
                                response.objEmpresario.strCorreoElectronico1 ||
                                "",
                            strCorreoElectronico2:
                                response.objEmpresario.strCorreoElectronico2 ||
                                "",
                            strNivelEducativo:
                                response.objEmpresario.strNivelEducativo || "",
                            strTitulos: response.objEmpresario.strTitulos || "",
                            strCondicionDiscapacidad:
                                response.objEmpresario
                                    .strCondicionDiscapacidad || "",
                            strEstrato: response.objEmpresario.strEstrato || "",
                            arrDepartamento:
                                response.objEmpresario.arrDepartamento || [],
                            arrCiudad: response.objEmpresario.arrCiudad || [],
                            strBarrio: response.objEmpresario.strBarrio || "",
                            strDireccionResidencia:
                                response.objEmpresario.strDireccionResidencia ||
                                "",
                            strURLFileFoto:
                                response.objEmpresario.strURLFileFoto || "",
                        };

                        let newObjInfoEmpresa = {
                            ...response.objInfoEmpresa,
                            dtFechaFundacion: response.objInfoEmpresa
                                .dtFechaFundacion
                                ? parseISO(
                                      response.objInfoEmpresa.dtFechaFundacion
                                  )
                                : null,
                            dblValorVentasMes:
                                response.objInfoEmpresa.valorVentasMes,
                        };

                        let newObjInfoAdicional = {
                            ...response.objInfoAdicional,
                        };

                        let newArrEmpresarioSecundario =
                            response.arrEmpresarioSecundario;

                        setData((prevState) => {
                            let prevObjInfoPrincipal =
                                prevState.objInfoPrincipal;
                            let prevObjInfoEmpresario =
                                prevState.objInfoEmpresarioPr;
                            let prevObjInfoEmpresa = prevState.objInfoEmpresa;
                            let prevObjInfoAdicional =
                                prevState.objInfoAdicional;
                            let prevArrEmpresarioSecundario = [];

                            newArrEmpresarioSecundario?.forEach((e) => {
                                prevArrEmpresarioSecundario.push([
                                    {
                                        parent: "strTipoRelacion",
                                        value: e.strTipoRelacion,
                                        label: "Tipo de relación con la persona principal",
                                    },
                                    {
                                        parent: "strNombres",
                                        value: e.strNombres,
                                        label: "Nombres",
                                    },
                                    {
                                        parent: "strApellidos",
                                        value: e.strApellidos,
                                        label: "Apellidos",
                                    },
                                    {
                                        parent: "strTipoDocto",
                                        value: e.strTipoDocto,
                                        label: "Tipo de documento",
                                    },
                                    {
                                        parent: "strNroDocto",
                                        value: e.strNroDocto,
                                        label: "Número de documento",
                                    },
                                    {
                                        parent: "strLugarExpedicionDocto",
                                        value: e.strLugarExpedicionDocto,
                                        label: "Lugar de expedición del documento",
                                    },
                                    {
                                        parent: "dtFechaExpedicionDocto",
                                        value: validator.isDate(
                                            e.dtFechaExpedicionDocto
                                        )
                                            ? format(
                                                  e.dtFechaExpedicionDocto,
                                                  "yyyy-MM-dd"
                                              )
                                            : "No diligenciado",
                                        label: "Fecha de expedición del documento",
                                    },
                                    {
                                        parent: "dtFechaNacimiento",
                                        value: validator.isDate(
                                            e.dtFechaNacimiento
                                        )
                                            ? format(
                                                  e.dtFechaNacimiento,
                                                  "yyyy-MM-dd"
                                              )
                                            : "No diligenciado",
                                        label: "Fecha de nacimiento",
                                    },
                                    {
                                        parent: "strGenero",
                                        value: e.strGenero,
                                        label: "Género",
                                    },
                                    {
                                        parent: "strCelular",
                                        value: e.strCelular,
                                        label: "Celular",
                                    },
                                    {
                                        parent: "strCorreoElectronico",
                                        value: e.strCorreoElectronico,
                                        label: "Correo electrónico",
                                    },
                                ]);
                            });

                            for (const key in newObjInfoPrincipal) {
                                if (
                                    Object.hasOwnProperty.call(
                                        newObjInfoPrincipal,
                                        key
                                    )
                                ) {
                                    prevObjInfoPrincipal.forEach((element) => {
                                        if (element.parent === key) {
                                            element.value =
                                                newObjInfoPrincipal[key];

                                            if (key === "dtFechaVinculacion") {
                                                element.value =
                                                    validator.isDate(
                                                        element.value
                                                    )
                                                        ? format(
                                                              element.value,
                                                              "yyyy-MM-dd"
                                                          )
                                                        : "No diligenciado";
                                            }
                                        }
                                    });
                                }
                            }

                            for (const key in newObjInfoEmpresarioPr) {
                                if (
                                    Object.hasOwnProperty.call(
                                        newObjInfoEmpresarioPr,
                                        key
                                    )
                                ) {
                                    prevObjInfoEmpresario.forEach((element) => {
                                        if (element.parent === key) {
                                            element.value =
                                                newObjInfoEmpresarioPr[key];

                                            if (
                                                key === "dtFechaExpedicionDocto"
                                            ) {
                                                element.value =
                                                    validator.isDate(
                                                        element.value
                                                    )
                                                        ? format(
                                                              element.value,
                                                              "yyyy-MM-dd"
                                                          )
                                                        : "No diligenciado";
                                            }

                                            if (key === "dtFechaNacimiento") {
                                                element.value =
                                                    validator.isDate(
                                                        element.value
                                                    )
                                                        ? format(
                                                              element.value,
                                                              "yyyy-MM-dd"
                                                          )
                                                        : "No diligenciado";
                                            }

                                            if (key === "arrDepartamento") {
                                                element.value =
                                                    newObjInfoEmpresarioPr[
                                                        key
                                                    ].region_name;
                                            }

                                            if (key === "arrCiudad") {
                                                element.value =
                                                    newObjInfoEmpresarioPr[
                                                        key
                                                    ].city_name;
                                            }
                                        }
                                    });
                                }
                            }

                            for (const key in newObjInfoEmpresa) {
                                if (
                                    Object.hasOwnProperty.call(
                                        newObjInfoEmpresa,
                                        key
                                    )
                                ) {
                                    prevObjInfoEmpresa.forEach((element) => {
                                        if (element.parent === key) {
                                            element.value =
                                                newObjInfoEmpresa[key];

                                            if (
                                                typeof element.value ===
                                                "boolean"
                                            ) {
                                                element.value = element.value
                                                    ? "Si"
                                                    : "No";
                                            }

                                            if (key === "dtFechaFundacion") {
                                                element.value =
                                                    validator.isDate(
                                                        element.value
                                                    )
                                                        ? format(
                                                              element.value,
                                                              "yyyy-MM-dd"
                                                          )
                                                        : "No diligenciado";
                                            }

                                            if (key === "arrDepartamento") {
                                                element.value =
                                                    newObjInfoEmpresa[
                                                        key
                                                    ]?.region_name;
                                            }

                                            if (key === "arrCiudad") {
                                                element.value =
                                                    newObjInfoEmpresa[
                                                        key
                                                    ]?.city_name;
                                            }

                                            if (
                                                key ===
                                                "arrCategoriasSecundarias"
                                            ) {
                                                let array =
                                                    newObjInfoEmpresa[key];

                                                if (array) {
                                                    let text = "";

                                                    array.forEach((e) => {
                                                        text +=
                                                            e.strCodigoRetorno +
                                                            ", ";
                                                    });

                                                    element.value = text;
                                                }
                                            }

                                            if (key === "dblValorVentasMes") {
                                                let moneyFormat =
                                                    Intl.NumberFormat("es-419");

                                                element.value = `$${moneyFormat.format(
                                                    newObjInfoEmpresa[key]
                                                )}`;
                                            }

                                            if (key === "arrRequisitosLey") {
                                                let array =
                                                    newObjInfoEmpresa[key];

                                                if (array) {
                                                    let text = "";

                                                    array.forEach((e) => {
                                                        text +=
                                                            e.strCodigoRetorno +
                                                            ", ";
                                                    });

                                                    element.value = text;
                                                }
                                            }

                                            if (
                                                key ===
                                                "arrFormasComercializacion"
                                            ) {
                                                let array =
                                                    newObjInfoEmpresa[key];

                                                if (array) {
                                                    let text = "";

                                                    array.forEach((e) => {
                                                        text +=
                                                            e.strCodigoRetorno +
                                                            ", ";
                                                    });

                                                    element.value = text;
                                                }
                                            }

                                            if (key === "arrMediosDigitales") {
                                                let array =
                                                    newObjInfoEmpresa[key];

                                                if (array) {
                                                    let text = "";

                                                    array.forEach((e) => {
                                                        if (e.value) {
                                                            text +=
                                                                `${e.label}:${e.value}` +
                                                                ", ";
                                                        } else {
                                                            text +=
                                                                e.label + ", ";
                                                        }
                                                    });

                                                    element.value = text;
                                                }
                                            }
                                        }
                                    });
                                }
                            }

                            for (const key in newObjInfoAdicional) {
                                if (
                                    Object.hasOwnProperty.call(
                                        newObjInfoAdicional,
                                        key
                                    )
                                ) {
                                    prevObjInfoAdicional.forEach((element) => {
                                        if (element.parent === key) {
                                            element.value =
                                                newObjInfoAdicional[key];

                                            if (
                                                typeof element.value ===
                                                "boolean"
                                            ) {
                                                element.value = element.value
                                                    ? "Si"
                                                    : "No";
                                            }

                                            if (
                                                key === "arrTemasCapacitacion"
                                            ) {
                                                let array =
                                                    newObjInfoAdicional[key];

                                                if (array) {
                                                    let text = "";

                                                    array.forEach((e) => {
                                                        text +=
                                                            e.strCodigoRetorno +
                                                            ", ";
                                                    });

                                                    element.value = text;
                                                }
                                            }

                                            if (key === "arrComoSeEntero") {
                                                let array =
                                                    newObjInfoAdicional[key];

                                                if (array) {
                                                    let text = "";

                                                    array.forEach((e) => {
                                                        text +=
                                                            e.strCodigoRetorno +
                                                            ", ";
                                                    });

                                                    element.value = text;
                                                }
                                            }

                                            if (
                                                key ===
                                                "arrMediosDeComunicacion"
                                            ) {
                                                let array =
                                                    newObjInfoAdicional[key];

                                                if (array) {
                                                    let text = "";

                                                    array.forEach((e) => {
                                                        text +=
                                                            e.strCodigoRetorno +
                                                            ", ";
                                                    });

                                                    element.value = text;
                                                }
                                            }
                                        }
                                    });
                                }
                            }

                            return {
                                ...prevState,
                                arrInfoEmpresarioSec:
                                    prevArrEmpresarioSecundario,
                                objInfoEmpresarioPr: prevObjInfoEmpresario,
                                objInfoPrincipal: prevObjInfoPrincipal,
                                objInfoEmpresa: prevObjInfoEmpresa,
                                objInfoAdicional: prevObjInfoAdicional,
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
                            <Typography sx={{ color: "#00BBB4" }}>
                                <b>Información principal</b>
                            </Typography>
                        </Box>

                        <Box>
                            <IconButton
                                onClick={() =>
                                    handlerChangeOpenCollapseInfoPrincipal()
                                }
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
                        <Grid
                            container
                            direction="row"
                            spacing={1}
                            sx={{ padding: "15px" }}
                        >
                            {data.objInfoPrincipal.map((e, i) => (
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
                                <b>
                                    Información de la persona empresaria
                                    principal
                                </b>
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
                        <Grid
                            container
                            direction="row"
                            spacing={1}
                            sx={{ padding: "15px" }}
                        >
                            {data.objInfoEmpresarioPr.map((e, i) => (
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
                                <b>
                                    Información de personas empresarias
                                    secundarias
                                </b>
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
                        <Grid container direction="row" spacing={3}>
                            {data.arrInfoEmpresarioSec.map((arrObj, index) => (
                                <Grid
                                    item
                                    xs={12}
                                    key={index}
                                    sx={{ padding: "15px" }}
                                >
                                    <Paper
                                        style={{
                                            backgroundColor: "#F6F6F6",
                                            padding: "15px",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Box>
                                                <p>{`Persona empresaria secundaria #${
                                                    index + 1
                                                }`}</p>
                                            </Box>
                                        </Box>

                                        <Grid
                                            container
                                            direction="row"
                                            spacing={1}
                                        >
                                            {arrObj.map((e, i) => (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    md={6}
                                                    key={i}
                                                >
                                                    <p
                                                        style={{
                                                            margin: "0px",
                                                            fontSize: "13px",
                                                            display: "flex",
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
                                                            {e.label}:{" "}
                                                        </b>
                                                        {e.value ||
                                                            "No diligenciado"}
                                                    </p>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Paper>
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
                            spacing={1}
                            sx={{ padding: "15px" }}
                        >
                            {data.objInfoEmpresa.map((e, i) => (
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
                                <b>Información adicional</b>
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
                            spacing={1}
                            sx={{ padding: "15px" }}
                        >
                            {data.objInfoAdicional.map((e, i) => (
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
        </Grid>
    );
};

export default InfoRegistro;
