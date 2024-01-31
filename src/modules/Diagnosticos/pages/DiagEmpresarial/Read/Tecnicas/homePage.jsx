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
import useGetDiagnHumano from "../../../../hooks/useGetDiagnHumano";
import ModalEditDiag from "./modalEdit";
import ModalPDF from "./modalPDF";
import ModalFinish from "./modalFinish";
import { Can } from "../../../../../../common/functions/can";

const ResumenTecnicas = ({ onChangeRoute, intIdIdea, intIdDiagnostico }) => {
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
        objInfoComMercadeo: [
            {
                parent: "strCaractEmpresaComp",
                value: "",
                label: "Reconozco las características que hacen diferente a mi empresa frente a la competencia",
            },
            {
                parent: "strCaractEmpresaCompDetalle",
                value: "",
                label: "Detalle - Reconozco las características que hacen diferente a mi empresa frente a la competencia",
            },
            {
                parent: "strAnalizoObjetivoEmpresa",
                value: "",
                label: "Conozco y analizo el público objetivo de mi empresa",
            },
            {
                parent: "strAnalizoObjetivoEmpresaDetalle",
                value: "",
                label: "Detalle - Conozco y analizo el público objetivo de mi empresa",
            },
            {
                parent: "strAnalizoCompetiEmpresa",
                value: "",
                label: "Conozco y analizo los competidores de mi empresa",
            },
            {
                parent: "strAnalizoCompetiEmpresaDetalle",
                value: "",
                label: "Detalle - Conozco y analizo los competidores de mi empresa",
            },
            {
                parent: "strActivIncreVentClient",
                value: "",
                label: "Realizo actividades enfocadas en incrementar el nivel de ventas y clientes",
            },
            {
                parent: "strActivIncreVentClientDetalle",
                value: "",
                label: "Detalle - Realizo actividades enfocadas en incrementar el nivel de ventas y clientes",
            },
            {
                parent: "strProceComerciEsta",
                value: "",
                label: "Mis procesos comerciales están",
            },
            {
                parent: "strProceComerciEstaDetalle",
                value: "",
                label: "Detalle - Mis procesos comerciales están",
            },
            {
                parent: "strDefiniPortProd",
                value: "",
                label: "Tengo definido el portafolio de productos",
            },
            {
                parent: "strDefiniPortProdDetalle",
                value: "",
                label: "Detalle - Tengo definido el portafolio de productos",
            },
            {
                parent: "strNumLugMedComerProd",
                value: "",
                label: "El número de lugares y medios en los que comercializo mis productos es",
            },
            {
                parent: "strNumLugMedComerProdDetalle",
                value: "",
                label: "Detalle - El número de lugares y medios en los que comercializo mis productos es",
            },
            {
                parent: "strPartiRedesEmpreComer",
                value: "",
                label: "Pertenezco y participo en redes empresariales para la comercialización",
            },
            {
                parent: "strPartiRedesEmpreComerDetalle",
                value: "",
                label: "Detalle - Pertenezco y participo en redes empresariales para la comercialización",
            },
            {
                parent: "strPreseMedDigital",
                value: "",
                label: "Tengo presencia en medios digitales",
            },
            {
                parent: "strPreseMedDigitalDetalle",
                value: "",
                label: "Detalle - Tengo presencia en medios digitales",
            },
            {
                parent: "strFormatosGestionComercial",
                value: "",
                label: "Tengo definido un discurso comercial atractivo para mis clientes",
            },
            {
                parent: "strFormatosGestionComercialDetalle",
                value: "",
                label: "Detalle - Tengo definido un discurso comercial atractivo para mis clientes",
            },
            {
                parent: "strTieneBaseDatosClientes",
                value: "",
                label: "Tengo definido un discurso comercial atractivo para mis clientes",
            },
            {
                parent: "strTieneBaseDatosClientesDetalle",
                value: "",
                label: "Detalle - Tengo un plan de atracción, relacionamiento y fidelización con mis clientes",
            },
            {
                parent: "strDefineDiscursoComercialClientes",
                value: "",
                label: "Tengo definido un discurso comercial atractivo para mis clientes",
            },
            {
                parent: "strDefineDiscursoComercialClientesDetalle",
                value: "",
                label: "Detalle - Tengo definido un discurso comercial atractivo para mis clientes",
            },
            {
                parent: "strPlanAtraccionRelacionamientoFidelizacionClientes",
                value: "",
                label: "Tengo un plan de atracción, relacionamiento y fidelización con mis clientes",
            },
            {
                parent: "strPlanAtraccionRelacionamientoFidelizacionClientesDetalle",
                value: "",
                label: "Detalle - Tengo un plan de atracción, relacionamiento y fidelización con mis clientes",
            },
            {
                parent: "strTieneLogisticaTransporteClientes",
                value: "",
                label: "Cuento con capacidad logística y de transporte para llegar a mis clientes",
            },
            {
                parent: "strTieneLogisticaTransporteClientesDetalle",
                value: "",
                label: "Detalle - Cuento con capacidad logística y de transporte para llegar a mis clientes",
            },
        ],
        objInfoComProductivo: [
            {
                parent: "strGradoIntervProdServi",
                value: "",
                label: "Grado de intervención en el producto/servicio",
            },
            {
                parent: "strGradoIntervProdServiDetalle",
                value: "",
                label: "Detalle - Grado de intervención en el producto/servicio",
            },
            {
                parent: "strProcProdEst",
                value: "",
                label: "Mis procesos productivos están",
            },
            {
                parent: "strProcProdEstDetalle",
                value: "",
                label: "Detalle - Mis procesos productivos están",
            },
            {
                parent: "strDefProcComProv",
                value: "",
                label: "Tengo definido los procesos de compra y los proveedores",
            },
            {
                parent: "strDefProcComProvDetalle",
                value: "",
                label: "Tengo definido los procesos de compra y los proveedores",
            },
            {
                parent: "strContrlRegInv",
                value: "",
                label: "Llevo control y registro de los inventarios",
            },
            {
                parent: "strContrlRegInvDetalle",
                value: "",
                label: "Detalle - Llevo control y registro de los inventarios",
            },
            {
                parent: "strCapProdRespMer",
                value: "",
                label: "Mi capacidad de producción y respuesta al mercado es",
            },
            {
                parent: "strCapProdRespMerDetalle",
                value: "",
                label: "Detalle - Mi capacidad de producción y respuesta al mercado es",
            },
            {
                parent: "strEstadTecProd",
                value: "",
                label: "El estado de la ficha técnica de los productos es",
            },
            {
                parent: "strEstadTecProdDetalle",
                value: "",
                label: "Detalle - El estado de la ficha técnica de los productos es",
            },
            {
                parent: "strEquipNecDesProdServi",
                value: "",
                label: "Tengo los equipos necesarios para el desarrollo de mis productos/servicio(s)",
            },
            {
                parent: "strEquipNecDesProdServidDetalle",
                value: "",
                label: "Detalle Tengo los equipos necesarios para el desarrollo de mis productos/servicio(s)",
            },
            {
                parent: "strProcManAmbiProd",
                value: "",
                label: "Tengo procesos para el manejo ambiental en la unidad productiva",
            },
            {
                parent: "strProcManAmbiProdDetalle",
                value: "",
                label: "Detalle - Tengo procesos para el manejo ambiental en la unidad productiva",
            },

            {
                parent: "strConoceTiemposProduccionReferencias",
                value: "",
                label: "Conozco los tiempos de producción de cada una de mis referencias",
            },
            {
                parent: "strConoceTiemposProduccionReferenciasDetalle",
                value: "",
                label: "Detalle - Conozco los tiempos de producción de cada una de mis referencias",
            },
            {
                parent: "strDeterminaNumUnidadesInventario",
                value: "",
                label: "Tengo determinado el número de unidades mínimas y máximas de mi inventario",
            },
            {
                parent: "strDeterminaNumUnidadesInventarioDetalle",
                value: "",
                label: "Detalle - Tengo determinado el número de unidades mínimas y máximas de mi inventario",
            },
            {
                parent: "strProcesoProductivoLoRealiza",
                value: "",
                label: "Conozco los tiempos de producción de cada una de mis referencias",
            },
            {
                parent: "strProcesoProductivoLoRealizaDetalle",
                value: "",
                label: "Detalle - Conozco los tiempos de producción de cada una de mis referencias",
            },
            {
                parent: "strCapacidadRespuestaTerceros",
                value: "",
                label: "Conozco los tiempos de producción de cada una de mis referencias",
            },
            {
                parent: "strCapacidadRespuestaTercerosDetalle",
                value: "",
                label: "Detalle - Conozco los tiempos de producción de cada una de mis referencias",
            },
        ],
        objInfoComFinanciero: [
            {
                parent: "strUniProdSosFinan",
                value: "",
                label: "Mi unidad productiva es sostenible financieramente",
            },
            {
                parent: "strUniProdSosFinanDetalle",
                value: "",
                label: "Detalle - Mi unidad productiva es sostenible financieramente",
            },
            {
                parent: "strDefProcConUniProd",
                value: "",
                label: "Tengo definidos los procesos contables de mi unidad productiva",
            },
            {
                parent: "strDefProcConUniProdDetalle",
                value: "",
                label: "Detalle - Tengo definidos los procesos contables de mi unidad productiva",
            },
            {
                parent: "strElabPresUniProd",
                value: "",
                label: "Elaboro un presupuesto para mi unidad productiva",
            },
            {
                parent: "strElabPresUniProdDetalle",
                value: "",
                label: "Detalle - Elaboro un presupuesto para mi unidad productiva",
            },
            {
                parent: "strAdminDinUniProd",
                value: "",
                label: "Sé como administrar el dinero de mi unidad productiva",
            },
            {
                parent: "strAdminDinUniProdDetalle",
                value: "",
                label: "Detalle - Sé como administrar el dinero de mi unidad productiva",
            },
            {
                parent: "strEstrCosUniProdDef",
                value: "",
                label: "",
            },
            {
                parent: "strEstrCosUniProdDefDetalle",
                value: "",
                label: "",
            },
            {
                parent: "strPrecProdServDef",
                value: "",
                label: "",
            },
            {
                parent: "strPrecProdServDefDetalle",
                value: "",
                label: "",
            },
        ],
        objInfoComAdministrativo: [
            {
                parent: "strUniProdGenEmple",
                value: "",
                label: "La unidad productiva genera empleo",
            },
            {
                parent: "strEquipTrabEstruct",
                value: "",
                label: "Tengo un equipo de trabajo estructurado",
            },
            {
                parent: "strUniProdGenEmpleDetalle",
                value: "",
                label: "Detalle - La unidad productiva genera empleo",
            },
            {
                parent: "strEquipTrabEstructDetalle",
                value: "",
                label: "Detalle - Tengo un equipo de trabajo estructurado",
            },
            {
                parent: "strEstrucFormaOrganiza",
                value: "",
                label: "Tengo una estructura formal en la organización",
            },
            {
                parent: "strEstrucFormaOrganizaDetalle",
                value: "",
                label: "Detalle - Tengo una estructura formal en la organización",
            },
            {
                parent: "strElabPlanTrabActiv",
                value: "",
                label: "Elaboro planes de trabajo para organizar las actividades",
            },
            {
                parent: "strElabPlanTrabActivDetalle",
                value: "",
                label: "Detalle - Elaboro planes de trabajo para organizar las actividades",
            },
            {
                parent: "strReaEvalPerioEquipTrab",
                value: "",
                label: "Realizo evalución periodica de el equipo de trabajo",
            },
            {
                parent: "strReaEvalPerioEquipTrabDetalle",
                value: "",
                label: "Detalle - Realizo evalución periodica de el equipo de trabajo",
            },
            {
                parent: "strEmprFormaAcuerNormLab",
                value: "",
                label: "Mi empresa está formalizada de acuerdo con la normatividad laboral",
            },
            {
                parent: "strEmprFormaAcuerNormLabDetalle",
                value: "",
                label: "Detalle - Mi empresa está formalizada de acuerdo con la normatividad laboral",
            },
            {
                parent: "strEmprFormaReqLey",
                value: "",
                label: "Mi empresa está formalizada con los requisitos de ley",
            },
            {
                parent: "strEmprFormaReqLeyDetalle",
                value: "",
                label: "Detalle - Mi empresa está formalizada con los requisitos de ley",
            },
            {
                parent: "strPlaneaEstraEmpPlanPlani",
                value: "",
                label: "Tengo una planeación estratégica para mi empresa, mas que estrategica plan de trabajo, planificación",
            },
            {
                parent: "strPlaneaEstraEmpPlanPlaniDetalle",
                value: "",
                label: "Detalle - Tengo una planeación estratégica para mi empresa, mas que estrategica plan de trabajo, planificación",
            },
            {
                parent: "strMidConstCumpliMetObj",
                value: "",
                label: "Tengo una planeación estratégica para mi empresa, mas que estrategica plan de trabajo, planificación",
            },
            {
                parent: "strMidConstCumpliMetObjDetalle",
                value: "",
                label: "Detalle - Mido constatemente el cumplimiento de mis metas y objetivos",
            },
            {
                parent: "strCueAcompJuri",
                value: "",
                label: "Mido constatemente el cumplimiento de mis metas y objetivos",
            },
            {
                parent: "strCueAcompJuriDetalle",
                value: "",
                label: "Detalle - Cuento con acompañamiento jurídico",
            },
        ],
        objInfoComAsociativo: [
            {
                parent: "strPartReuPerioSociSoli",
                value: "",
                label: "Participo en las reuniones periódicas de la organización social y solidaria (asociación)",
            },
            {
                parent: "strPartReuPerioSociSoliDetalle",
                value: "",
                label: "Detalle - Participo en las reuniones periódicas de la organización social y solidaria (asociación)",
            },
            {
                parent: "strConApliEstOrgSociSoli",
                value: "",
                label: "Conozco y aplico estatutos de la organización social y solidaria",
            },
            {
                parent: "strConApliEstOrgSociSoliDetalle",
                value: "",
                label: "Detalle - Conozco y aplico estatutos de la organización social y solidaria",
            },
            {
                parent: "strAsociEmpoOrgAdmin",
                value: "",
                label: "Los asociados están empoderados y cuentan con órganos de administración y control",
            },
            {
                parent: "strAsociEmpoOrgAdminDetalle",
                value: "",
                label: "Detalle - Los asociados están empoderados y cuentan con órganos de administración y control",
            },
        ],
    });

    const [loadingGetData, setLoadingGetData] = useState(false);
    const [openModalFinish, setOpenModalFinish] = useState(false);
    const [finalizado, setFinalizado] = useState(false);

    const [errorGetData, setErrorGetData] = useState({
        flag: false,
        msg: "",
    });

    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [openModalPDF, setOpenModalPDF] = useState(false);

    const [openCollapseInfoGeneral, setOpenCollapseInfoGeneral] =
        useState(true);
    const [openCollapseInfoComMercadeo, setOpenCollapseInfoComMercadeo] =
        useState(true);
    const [openCollapseInfoComProductivo, setOpenCollapseInfoComProductivo] =
        useState(true);
    const [openCollapseInfoComFinanciero, setOpenCollapseInfoComFinanciero] =
        useState(true);
    const [
        openCollapseInfoComAdministrativo,
        setOpenCollapseInfoComAdministrativo,
    ] = useState(true);
    const [openCollapseInfoComAsociativo, setOpenCollapseInfoComAsociativo] =
        useState(true);
    //===============================================================================================================================================
    //========================================== Hooks personalizados ===============================================================================
    //===============================================================================================================================================
    const { getUniqueData } = useGetDiagnHumano({
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

                    const objInfoComMercadeo = data.objInfoComMercadeo;
                    const objInfoComProductivo = data.objInfoComProductivo;
                    const objInfoComFinanciero = data.objInfoComFinanciero;
                    const objInfoComAdministrativo =
                        data.objInfoComAdministrativo;
                    const objInfoComAsociativo = data.objInfoComAsociativo;

                    setData((prevState) => {
                        let prevInfoGeneral = prevState.objInfoGeneral;
                        let prevInfoComMercadeo = prevState.objInfoComMercadeo;
                        let prevInfoComProductivo =
                            prevState.objInfoComProductivo;
                        let prevInfoComFinanciero =
                            prevState.objInfoComFinanciero;
                        let prevInfoComAdministrativo =
                            prevState.objInfoComAdministrativo;
                        let prevInfoComAsociativo =
                            prevState.objInfoComAsociativo;

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

                        for (const key in objInfoComMercadeo) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoComMercadeo,
                                    key
                                )
                            ) {
                                prevInfoComMercadeo.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoComMercadeo[key].map) {
                                            const json =
                                                objInfoComMercadeo[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoComMercadeo[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoComProductivo) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoComProductivo,
                                    key
                                )
                            ) {
                                prevInfoComProductivo.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoComProductivo[key].map) {
                                            const json =
                                                objInfoComProductivo[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoComProductivo[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoComFinanciero) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoComFinanciero,
                                    key
                                )
                            ) {
                                prevInfoComFinanciero.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoComFinanciero[key].map) {
                                            const json =
                                                objInfoComFinanciero[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoComFinanciero[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoComAdministrativo) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoComAdministrativo,
                                    key
                                )
                            ) {
                                prevInfoComAdministrativo.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoComAdministrativo[key].map) {
                                            const json =
                                                objInfoComAdministrativo[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value =
                                                objInfoComAdministrativo[key];
                                        }
                                    }
                                });
                            }
                        }

                        for (const key in objInfoComAsociativo) {
                            if (
                                Object.hasOwnProperty.call(
                                    objInfoComAsociativo,
                                    key
                                )
                            ) {
                                prevInfoComAsociativo.forEach((e) => {
                                    if (e.parent === key) {
                                        if (objInfoComAsociativo[key].map) {
                                            const json =
                                                objInfoComAsociativo[key];

                                            const str = json
                                                .map((x) => {
                                                    return x.strCodigoRetorno;
                                                })
                                                .join(", ");
                                            e.value = str;
                                        } else {
                                            e.value = objInfoComAsociativo[key];
                                        }
                                    }
                                });
                            }
                        }

                        return {
                            ...prevState,
                            objInfoGeneral: prevInfoGeneral,
                            objInfoComMercadeo: prevInfoComMercadeo,
                            objInfoComProductivo: prevInfoComProductivo,
                            objInfoComFinanciero: prevInfoComFinanciero,
                            objInfoComAdministrativo: prevInfoComAdministrativo,
                            objInfoComAsociativo: prevInfoComAsociativo,
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

    const handlerChangeOpenCollapseInfoComMercadeo = () => {
        setOpenCollapseInfoComMercadeo(!openCollapseInfoComMercadeo);
    };

    const handlerChangeOpenCollapseInfoComProductivo = () => {
        setOpenCollapseInfoComProductivo(!openCollapseInfoComProductivo);
    };

    const handlerChangeOpenCollapseInfoComFinanciero = () => {
        setOpenCollapseInfoComFinanciero(!openCollapseInfoComFinanciero);
    };

    const handlerChangeOpenCollapseInfoComAdministrativo = () => {
        setOpenCollapseInfoComAdministrativo(
            !openCollapseInfoComAdministrativo
        );
    };

    const handlerChangeOpenCollapseInfoComAsociativo = () => {
        setOpenCollapseInfoComAsociativo(!openCollapseInfoComAsociativo);
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
                        <b>detalle diagnóstico técnico</b>
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
                                    <b>Componente mercadeo</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoComMercadeo()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoComMercadeo
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoComMercadeo ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoComMercadeo}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoComMercadeo.map((e, i) => (
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
                                    <b>Componente productivo</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoComProductivo()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoComProductivo
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoComProductivo ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoComProductivo}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoComProductivo.map((e, i) => (
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
                                    <b>Componente productivo</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoComProductivo()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoComProductivo
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoComProductivo ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoComProductivo}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoComProductivo.map((e, i) => (
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
                                    <b>Componente financiero</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoComFinanciero()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoComFinanciero
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoComFinanciero ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoComFinanciero}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoComFinanciero.map((e, i) => (
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
                                    <b>Componente administrativo</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoComAdministrativo()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoComAdministrativo
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoComAdministrativo ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoComAdministrativo}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoComAdministrativo.map((e, i) => (
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
                                    <b>Componente asociativo</b>
                                </Typography>
                            </Box>

                            <Box>
                                <IconButton
                                    onClick={() =>
                                        handlerChangeOpenCollapseInfoComAsociativo()
                                    }
                                    size="large"
                                >
                                    <Tooltip
                                        title={
                                            openCollapseInfoComAsociativo
                                                ? "Contraer detalle"
                                                : "Expandir detalle"
                                        }
                                    >
                                        {openCollapseInfoComAsociativo ? (
                                            <ExpandLessIcon />
                                        ) : (
                                            <ExpandMoreIcon />
                                        )}
                                    </Tooltip>
                                </IconButton>
                            </Box>
                        </Box>

                        <Collapse
                            in={openCollapseInfoComAsociativo}
                            timeout="auto"
                        >
                            <Grid
                                container
                                direction="row"
                                spacing={0}
                                sx={{ padding: "15px" }}
                            >
                                {data.objInfoComAsociativo.map((e, i) => (
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

export default ResumenTecnicas;
