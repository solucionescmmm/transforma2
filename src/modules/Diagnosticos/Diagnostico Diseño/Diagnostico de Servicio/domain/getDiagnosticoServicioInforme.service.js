//Class
const classInterfaceDAODiagnostico = require("../infra/conectors/interfaseDAODiagnosticoServicio");
const validator = require("validator").default;

//service
const serviceGetEmpresario = require("../../../../Empresarios/domian/getEmpresario.service")

const getDiagnosticoServicio = async (objParams, strDataUser) => {
    let { intId, intIdDiagnostico } = objParams;

    if (!intIdDiagnostico) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let dao = new classInterfaceDAODiagnostico();
    let query = {
        intId,
        intIdDiagnostico,
    };

    let arrayData = await dao.getDiagnosticoServicio(query);
    let arrayResultServicios = await dao.getResultDiagnosticoServicio(query)

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let arrayServicios = arrayResultServicios.data

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let queryGetEmpresario = await serviceGetEmpresario({ intId: array[i]?.intIdEmpresario }, strDataUser)
                if (queryGetEmpresario.error) {
                    throw new Error(queryGetEmpresario.msg)
                }

                let objDataEmpresario = queryGetEmpresario.data[0]

                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdDiagnostico: array[i]?.intIdDiagnostico,
                    btFinalizado: array[i]?.btFinalizado,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    objEmpresario: {
                        strNombreCompleto: objDataEmpresario.strNombres + " " + objDataEmpresario.strApellidos,
                        intId: array[i]?.intIdEmpresario,
                        intIdTipoEmpresario: array[i]?.intIdTipoEmpresario,
                        strNombres: objDataEmpresario.strNombres,
                        strApellidos: objDataEmpresario.strApellidos,
                        strNroDocto: objDataEmpresario.strNroDocto,
                        strCorreoElectronico: objDataEmpresario?.strCorreoElectronico1
                    }
                };
                let objInfoEvaluacion = {
                    strServicio: array[i]?.strServicio,
                    strHerramientasServicio: array[i]?.strHerramientasServicio,
                    strObjetivoProposito: array[i]?.strObjetivoProposito,
                    strObjetivoPropositoDetalle:
                        array[i]?.strObjetivoPropositoDetalle,
                    strObjetivoPropositoNivel:
                        array[i]?.strObjetivoPropositoNivel,
                    strRenovacionPortafolio: array[i]?.strRenovacionPortafolio,
                    strRenovacionPortafolioDetalle:
                        array[i]?.strRenovacionPortafolioDetalle,
                    strRenovacionPortafolioNivel:
                        array[i]?.strRenovacionPortafolioNivel,
                    strProcesoInteraccion: array[i]?.strProcesoInteraccion,
                    strProcesoInteraccionDetalle:
                        array[i]?.strProcesoInteraccionDetalle,
                    strProcesoInteraccionNivel:
                        array[i]?.strProcesoInteraccionNivel,
                    strPuntosContacto: array[i]?.strPuntosContacto,
                    strPuntosContactoDetalle:
                        array[i]?.strPuntosContactoDetalle,
                    strPuntosContactoNivel: array[i]?.strPuntosContactoNivel,
                    strExperienciaDiseñada: array[i]?.strExperienciaDiseñada,
                    strExperienciaDiseñadaDetalle:
                        array[i]?.strExperienciaDiseñadaDetalle,
                    strExperienciaDiseñadaNivel:
                        array[i]?.strExperienciaDiseñadaNivel,
                    strRecursosServicio: array[i]?.strRecursosServicio,
                    strRecursosServicioDetalle:
                        array[i]?.strRecursosServicioDetalle,
                    strRecursosServicioNivel:
                        array[i]?.strRecursosServicioNivel,
                    strPostVenta: array[i]?.strPostVenta,
                    strPostVentaDetalle: array[i]?.strPostVentaDetalle,
                    strPostVentaNivel: array[i]?.strPostVentaNivel,
                    strLineaGrafica: array[i]?.strLineaGrafica,
                    strLineaGraficaDetalle: array[i]?.strLineaGraficaDetalle,
                    strLineaGraficaNivel: array[i]?.strLineaGraficaNivel,
                    strIdentidadMarca: array[i]?.strIdentidadMarca,
                    strIdentidadMarcaDetalle:
                        array[i]?.strIdentidadMarcaDetalle,
                    strIdentidadMarcaNivel: array[i]?.strIdentidadMarcaNivel,
                    strComunicacionMarca: array[i]?.strComunicacionMarca,
                    strComunicacionMarcaDetalle:
                        array[i]?.strComunicacionMarcaDetalle,
                    strComunicacionMarcaNivel:
                        array[i]?.strComunicacionMarcaNivel,
                };
                const objInnovacionBajo = [];
                const objInnovacionMedio = [];
                const objInnovacionAlto = [];

                const objExperienciaBajo = [];
                const objExperienciaMedio = [];
                const objExperienciaAlto = [];

                const objMarcaBajo = [];
                const objMarcaMedio = [];
                const objMarcaAlto = [];

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
                                "BAJO"
                            ) {
                                objInnovacionBajo.push({
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
                                "MEDIO"
                            ) {
                                objInnovacionMedio.push({
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
                                objInnovacionAlto.push({
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
                                "BAJO"
                            ) {
                                objExperienciaBajo.push({
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
                                "MEDIO"
                            ) {
                                objExperienciaMedio.push({
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
                                objExperienciaAlto.push({
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
                                "BAJO"
                            ) {
                                objMarcaBajo.push({
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
                                "MEDIO"
                            ) {
                                objMarcaMedio.push({
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
                                objMarcaAlto.push({
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
                let objInfoNormatividad = {
                    strPermisoFuncionamiento:
                        array[i]?.strPermisoFuncionamiento,
                    strCertificadosRequeridos:
                        array[i]?.strCertificadosRequeridos,
                    strCertificadosActuales: array[i]?.strCertificadosActuales,
                    strRegistroMarca: array[i]?.strRegistroMarca,
                    strPatentesUtilidad: array[i]?.strPatentesUtilidad,
                    strCualPatenteUtilidad: array[i]?.strCualPatenteUtilidad,
                };
                let objInfoAdicional = {
                    strConclusiones: array[i]?.strConclusiones,
                    strURLSFotos: array[i]?.strURLSFotos,
                };

                let objResultServicio = arrayServicios

                data[i] = {
                    objInfoGeneral,
                    objInfoEvaluacion,
                    objInfoNormatividad,
                    objInfoAdicional,
                    objResultServicio,
                    objInnovacionBajo,
                    objInnovacionMedio,
                    objInnovacionAlto,
                    objExperienciaBajo,
                    objExperienciaMedio,
                    objExperienciaAlto,
                    objMarcaBajo,
                    objMarcaMedio,
                    objMarcaAlto,
                };
            }
            let result = {
                error: false,
                data,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getDiagnosticoServicio;
