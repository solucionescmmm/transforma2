import React, { Fragment, useState, useEffect, useRef } from "react";

//Librerias
import { useParams } from "react-router-dom";
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
    RemoveRedEye as RemoveRedEyeIcon,
} from "@mui/icons-material";

import Loader from "../../../../../../common/components/Loader";
import ErrorPage from "../../../../../../common/components/Error";
import useGetDiagnProd from "../../../../hooks/useGetDiagnProd";
import ModalEditDiagProd from "./modalEdit";
import ModalPDF from "./modalPDF";
import { ImageViewer } from "../../../../../../common/components/ImageViewer";
import ChartBar from "./chartBar";
import ModalFinish from "./modalFinish";
import { Can } from "../../../../../../common/functions/can";

const ResumenProducto = ({ intIdIdea, intIdDiagnostico, onChangeRoute }) => {
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
        objInfoProductos: [
            {
                parent: "strCategoriaProductos",
                value: "",
                label: "Tipo de diagnóstico aplicado",
            },
            {
                parent: "strProductos",
                value: "",
                label: "Producto(s)",
            },
            {
                parent: "strNombreTecnica",
                value: "",
                label: "Nombre de la técnica utilizada",
            },
            {
                parent: "strMateriaPrima",
                value: "",
                label: "Materias primas utilizadas",
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
        strConclusiones: "",
        arrImagenes: [],
        objResultadoAlimentos: {},
        objResultadoNoAlimentos: {},
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

    const [openCollapseInfoProductos, setOpenCollapseInfoProductos] =
        useState(true);

    const [openCollapseTemasFortalecer, setOpenCollapseTemasFortalecer] =
        useState(true);

    const [openCollapseFortalezas, setOpenCollapseFortalezas] = useState(true);

    const [openCollapseInfoNormatividad, setOpenCollapseInfoNormatividad] =
        useState(true);

    const [openCollapseConclusiones, setOpenCollapseConclusiones] =
        useState(true);

    const [openCollapseFotos, setOpenCollapseFotos] = useState(true);

    const [openCollapseGrafico, setOpenCollapseGrafico] = useState(true);

    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { intId } = useParams();

    const { getUniqueData } = useGetDiagnProd({
        autoLoad: false,
        intIdIdea,
        intIdDiagnostico,
    });

    const refFntGetData = useRef(getUniqueData);

    //===============================================================================================================================================
    //========================================== Funciones ==========================================================================================
    //===============================================================================================================================================

    async function getData() {
        await refFntGetData
            .current({ intIdIdea, intIdDiagnostico })
            .then((res) => {
                if (res.data.error) {
                    throw new Error(res.data.msg);
                }

                if (res.data) {
                    let data = res.data.data[0];

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

                    const objInfoProductos = {
                        strCategoriaProductos:
                            data.objInfoProductos.strCategoriaProductos || "",
                        strProductos: data.objInfoProductos.strProductos || "",
                        strNombreTecnica:
                            data.objInfoProductos.strNombreTecnica || "",
                        strMateriaPrima:
                            data.objInfoProductos.strMateriaPrima || "",
                    };

                    const objInfoNormatividad = {
                        strPermisoFuncionamiento:
                            data.objInfoNormatividad.strPermisoFuncionamiento ||
                            "",
                        strCertificadosRequeridos:
                            data.objInfoNormatividad
                                .strCertificadosRequeridos || "",
                        strCertificadosActuales:
                            data.objInfoNormatividad.strCertificadosActuales ||
                            "",
                        strRegistroMarca:
                            data.objInfoNormatividad.strRegistroMarca || "",
                        strPatentesUtilidad:
                            data.objInfoNormatividad.strPatentesUtilidad || "",
                        strCualPatenteUtilidad:
                            data.objInfoNormatividad.strCualPatenteUtilidad ||
                            "",
                    };

                    const objInfoCategoria1 = data.objInfoCategoria1;
                    const objInfoCategoria2 = data.objInfoCategoria2;

                    setData((prevState) => {
                        let prevInfoGeneral = prevState.objInfoGeneral;
                        let prevInfoProductos = prevState.objInfoProductos;
                        let prevInfoNormatividad =
                            prevState.objInfoNormatividad;
                        let prevInfoTemasFortalecer =
                            prevState.objInfoTemasFortalecer;
                        let prevInfoFortalezas = prevState.objInfoFortalezas;

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

                        for (const key in objInfoProductos) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoProductos,
                                    key
                                )
                            ) {
                                prevInfoProductos.forEach((e) => {
                                    if (e.parent === key) {
                                        e.value = objInfoProductos[key];
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

                        const objPersepcionFortalecer = [];
                        const objPersepcionFortalezas = [];

                        const objEsteticaFortalecer = [];
                        const objEsteticaFortalezas = [];

                        const objExperienciaFortalecer = [];
                        const objExperienciaFortalezas = [];

                        const objMarcaFortalecer = [];
                        const objMarcaFortalezas = [];

                        const getLabel = (key) => {
                            switch (key) {
                                case "strFuncionalidad":
                                    return "Funcionalidad";

                                case "strMetodologia":
                                    return "Metodología para la creación de producto";

                                case "strRenovacionPortafolio":
                                    return "Renovación del portafolio";

                                case "strSostenibilidad":
                                    return "Sostenibilidad";

                                case "strAtributosValor":
                                    return "Atributos de valor";

                                case "strUsoMateriales":
                                    return "Uso de los materiales";

                                case "strMenajoTecnicaAlim":
                                    return "Manejo que tengo de la(s) técnica(s)";

                                case "strProcesosPreparacion":
                                    return "Procesos de preparación";

                                case "strPresentacionApariencia":
                                    return "Presentación y apariencia";

                                case "strProporcionAlim":
                                    return "Proporción";

                                case "strConservacion":
                                    return "Conservación";

                                case "strInocuidad":
                                    return "Inocuidad";

                                case "strEmpaqueEtiquetaAlim":
                                    return "Empaque, Envase y Etiqueta";

                                case "strMenajoTecnica":
                                    return "Manejo que tengo de la(s) técnica(s)";

                                case "strAcabadosFactura":
                                    return "Acabados y Factura";

                                case "strDurabilidad":
                                    return "Durabilidad";

                                case "strUsoColores":
                                    return "Uso de los colores";

                                case "strProporcion":
                                    return "Proporción";

                                case "strRiesgoUso":
                                    return "Riesgo de Uso";

                                case "strEmpaqueEtiqueta":
                                    return "Empaque, Envase y Etiqueta";

                                case "strUsabilidad":
                                    return "Usabilidad";

                                case "strDisenioExperiencia":
                                    return "Diseño de Experiencia";

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

                        for (const key in objInfoCategoria1) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoCategoria1,
                                    key
                                )
                            ) {
                                if (
                                    (key === "strFuncionalidad" ||
                                        key === "strMetodologia" ||
                                        key === "strRenovacionPortafolio" ||
                                        key === "strSostenibilidad" ||
                                        key === "strAtributosValor" ||
                                        key === "strUsoMateriales") &&
                                    objInfoCategoria1[key] !== ""
                                ) {
                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "BAJO" ||
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "MEDIO"
                                    ) {
                                        objInnovacionFortalecer.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }

                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                        "ALTO"
                                    ) {
                                        objInnovacionFortalezas.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }
                                }

                                if (
                                    (key === "strMenajoTecnicaAlim" ||
                                        key === "strProcesosPreparacion" ||
                                        key === "strPresentacionApariencia" ||
                                        key === "strProporcionAlim" ||
                                        key === "strConservacion" ||
                                        key === "strInocuidad" ||
                                        key === "strEmpaqueEtiquetaAlim") &&
                                    objInfoCategoria1[key] !== ""
                                ) {
                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "BAJO" ||
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "MEDIO"
                                    ) {
                                        objPersepcionFortalecer.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }

                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                        "ALTO"
                                    ) {
                                        objPersepcionFortalezas.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }
                                }

                                if (
                                    (key === "strMenajoTecnica" ||
                                        key === "strAcabadosFactura" ||
                                        key === "strDurabilidad" ||
                                        key === "strUsoColores" ||
                                        key === "strProporcion") &&
                                    objInfoCategoria1[key] !== ""
                                ) {
                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "BAJO" ||
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "MEDIO"
                                    ) {
                                        objEsteticaFortalecer.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }

                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                        "ALTO"
                                    ) {
                                        objEsteticaFortalezas.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }
                                }

                                if (
                                    (key === "strRiesgoUso" ||
                                        key === "strEmpaqueEtiqueta" ||
                                        key === "strUsabilidad" ||
                                        key === "strDisenioExperiencia") &&
                                    objInfoCategoria1[key] !== ""
                                ) {
                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "BAJO" ||
                                        objInfoCategoria1[`${key}Nivel`] ===
                                            "MEDIO"
                                    ) {
                                        objExperienciaFortalecer.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }

                                    if (
                                        objInfoCategoria1[`${key}Nivel`] ===
                                        "ALTO"
                                    ) {
                                        objExperienciaFortalezas.push({
                                            parent: key,
                                            value: objInfoCategoria1[key],
                                            detalle:
                                                objInfoCategoria1[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria1[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }
                                }
                            }
                        }

                        for (const key in objInfoCategoria2) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoCategoria2,
                                    key
                                )
                            ) {
                                if (
                                    (key === "strLineaGrafica" ||
                                        key === "strIdentidadMarca" ||
                                        key === "strComunicacionMarca") &&
                                    objInfoCategoria2[key] !== ""
                                ) {
                                    if (
                                        objInfoCategoria2[`${key}Nivel`] ===
                                            "BAJO" ||
                                        objInfoCategoria2[`${key}Nivel`] ===
                                            "MEDIO"
                                    ) {
                                        objMarcaFortalecer.push({
                                            parent: key,
                                            value: objInfoCategoria2[key],
                                            detalle:
                                                objInfoCategoria2[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria2[
                                                `${key}Nivel`
                                            ],
                                            label: getLabel(key),
                                        });
                                    }

                                    if (
                                        objInfoCategoria2[`${key}Nivel`] ===
                                        "ALTO"
                                    ) {
                                        objMarcaFortalezas.push({
                                            parent: key,
                                            value: objInfoCategoria2[key],
                                            detalle:
                                                objInfoCategoria2[
                                                    `${key}Detalle`
                                                ],
                                            nivel: objInfoCategoria2[
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

                        if (objPersepcionFortalecer.length > 0) {
                            prevInfoTemasFortalecer.push({
                                objPersepcionFortalecer,
                            });
                        }

                        if (objPersepcionFortalezas.length > 0) {
                            prevInfoFortalezas.push({
                                objPersepcionFortalezas,
                            });
                        }

                        if (objEsteticaFortalecer.length > 0) {
                            prevInfoTemasFortalecer.push({
                                objEsteticaFortalecer,
                            });
                        }

                        if (objEsteticaFortalezas.length > 0) {
                            prevInfoFortalezas.push({
                                objEsteticaFortalezas,
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
                            objInfoProductos: prevInfoProductos,
                            objInfoNormatividad: prevInfoNormatividad,
                            objInfoTemasFortalecer: prevInfoTemasFortalecer,
                            objInfoFortalezas: prevInfoFortalezas,
                            strConclusiones,
                            arrImagenes: newArrImagenes,
                            objResultadoNoAlimentos:
                                data.objResultadoNoAlimentos,
                            objResultadoAlimentos: data.objResultadoAlimentos,
                            strCategoriaProductos: data.objInfoProductos.strCategoriaProductos,
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

    const handlerChangeOpenModalEdit = () => {
        setOpenModalEdit(!openModalEdit);
    };

    const handlerChangeOpenModalFinish = () => {
        setOpenModalFinish(!openModalFinish);
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
            <ModalEditDiagProd
                intId={intId}
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
                intId={intIdIdea}
                values={data}
                intIdDiagnostico={intIdDiagnostico}
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
                                        onClick={()=> onChangeRoute("DiagDesignProdPrev", {
                                            intIdIdea,
                                            intIdDiagnostico,
                                            isPreview : true
                                        })}
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
                        <b>detalle diagnóstico de producto</b>
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
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoProductos.map((e, i) => (
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
                                spacing={0}
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
                                                                        {i === 0
                                                                            ? "Nivel"
                                                                            : ""}
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
                                                                    {e.nivel ||
                                                                        "No diligenciado"}
                                                                </p>
                                                            </Grid>
                                                        
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8 : 10}
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

                                    if (e.objPersepcionFortalecer) {
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
                                                        Percepción y calidad
                                                    </Typography>
                                                </Grid>

                                                {e.objPersepcionFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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


                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.datelle ? 8: 10}
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

                                    if (e.objEsteticaFortalecer) {
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
                                                        Estética
                                                    </Typography>
                                                </Grid>

                                                {e.objEsteticaFortalecer.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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
                                                            
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8 : 10}
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8 : 10}
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8: 10}
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
                                spacing={0}
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8 : 10}
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

                                    if (e.objPersepcionFortalezas) {
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
                                                        Percepción y calidad
                                                    </Typography>
                                                </Grid>

                                                {e.objPersepcionFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8 : 10}
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

                                    if (e.objEsteticaFortalezas) {
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
                                                        Estética
                                                    </Typography>
                                                </Grid>

                                                {e.objEsteticaFortalezas.map(
                                                    (e, i) => (
                                                        <Fragment key={i}>
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8 : 10}
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8: 10}
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
                                                                    <b>    {i === 0
                                                                            ? "Nivel"
                                                                            : ""}</b>
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

                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={e.detalle ? 8 : 10}
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
                                spacing={0}
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

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Conlusiones </b>
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

                <Grid item xs={12}>
                    <Paper sx={{ padding: "10px" }}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography sx={{ color: "#00BBB4" }}>
                                    <b>Grafíco de resultados </b>
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
                            <Grid container direction="row" spacing={2}>
                                {data.strCategoriaProductos ===
                                "No alimentos" ? (
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box
                                                sx={{ minWidth: "850px" }}
                                                id="chart-diag-prod"
                                            >
                                                <ChartBar
                                                    title="DETALLE DEL DIAGNÓSTICO (No alimentos)"
                                                    labels={[
                                                        "Innovación",
                                                        "Estética",
                                                        "Experiencia",
                                                        "Marca",
                                                    ]}
                                                    values={[
                                                        data
                                                            .objResultadoNoAlimentos
                                                            ?.intInnovación ||
                                                            0,
                                                        data
                                                            .objResultadoNoAlimentos
                                                            ?.intEstética || 0,
                                                        data
                                                            .objResultadoNoAlimentos
                                                            ?.intExperiencia ||
                                                            0,
                                                        data
                                                            .objResultadoNoAlimentos
                                                            ?.intMarca || 0,
                                                    ]}
                                                    maxValues={[30, 30, 30, 30]}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                ) : (
                                    <Grid item xs={12}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Box
                                                sx={{ minWidth: "850px" }}
                                                id="chart-diag-prod"
                                            >
                                                <ChartBar
                                                    title="DETALLE DEL DIAGNÓSTICO (Alimentos)"
                                                    labels={[
                                                        "Innovación",
                                                        "Presentación y calidad",
                                                        "Experiencia",
                                                        "Marca",
                                                    ]}
                                                    values={[
                                                        data
                                                            .objResultadoAlimentos
                                                            ?.intInnovación ||
                                                            0,
                                                        data
                                                            .objResultadoAlimentos
                                                            ?.intEstética || 0,
                                                        data
                                                            .objResultadoAlimentos
                                                            ?.intExperiencia ||
                                                            0,
                                                        data
                                                            .objResultadoAlimentos
                                                            ?.intMarca || 0,
                                                    ]}
                                                    maxValues={[30, 44, 16, 30]}
                                                />
                                            </Box>
                                        </Box>
                                    </Grid>
                                )}
                            </Grid>
                        </Collapse>
                    </Paper>
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default ResumenProducto;
