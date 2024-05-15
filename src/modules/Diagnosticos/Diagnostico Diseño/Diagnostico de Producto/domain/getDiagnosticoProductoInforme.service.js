//Class
const classInterfaceDAODiagnostico = require("../infra/conectros/interfaseDAODiagnosticoProducto");
const validator = require("validator").default;

//service
const serviceGetEmpresario = require("../../../../Empresarios/domian/getEmpresario.service")
const serviceGetUsuario = require("../../../../Usuarios/domain/getUsuarios.service")

const getDiagnosticoProducto = async (objParams, strDataUser) => {
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

    let queryGetUsuarios = await serviceGetUsuario({
        strApp: "Transforma",
    })

    if (queryGetUsuarios.error) {
        throw new Error(queryGetUsuarios.msg)
    }

    const dataUsuario = queryGetUsuarios.data

    let dao = new classInterfaceDAODiagnostico();
    let query = {
        intId,
        intIdDiagnostico
    };

    let arrayData = await dao.getDiagnosticoProducto(query);
    let arrayResultAlimentos = await dao.getResultDiagnosticoAlimentos(query);
    let arrayResultNoAlimentos = await dao.getResultDiagnosticoNoAlimentos(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let arrayAlimentos = arrayResultAlimentos.data;
            let arrayNoAlimentos = arrayResultNoAlimentos.data;


            let data = [];

            for (let i = 0; i < array.length; i++) {
                let queryGetEmpresario = await serviceGetEmpresario({ intId: array[i]?.intIdEmpresario }, strDataUser)
                if (queryGetEmpresario.error) {
                    throw new Error(queryGetEmpresario.msg)
                }

                let objDataEmpresario = queryGetEmpresario.data[0]
                let objDataUser = dataUsuario?.find((u)=>u.strEmail === array[i]?.strUsuarioCreacion)

                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdDiagnostico: array[i]?.intIdDiagnostico,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    btFinalizado: array[i]?.btFinalizado,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    strUsuarioResponsable:`${objDataUser?.strNombre || ""} - ${objDataUser?.strEmail || ""}`,
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
                let objInfoProductos = {
                    strNombreTecnica: array[i]?.strNombreTecnica,
                    strMateriaPrima: array[i]?.strMateriaPrima,
                    strCategoriaProductos: array[i]?.strCategoriaProductos,
                    strProductos: array[i]?.strProductos,
                };

                let objInfoCategoria1 = {
                    strFuncionalidad: array[i]?.strFuncionalidad,
                    strFuncionalidadDetalle: array[i]?.strFuncionalidadDetalle,
                    strFuncionalidadNivel: array[i]?.strFuncionalidadNivel,
                    strMetodologia: array[i]?.strMetodologia,
                    strMetodologiaDetalle: array[i]?.strMetodologiaDetalle,
                    strMetodologiaNivel: array[i]?.strMetodologiaNivel,
                    strRenovacionPortafolio: array[i]?.strRenovacionPortafolio,
                    strRenovacionPortafolioDetalle:
                        array[i]?.strRenovacionPortafolioDetalle,
                    strRenovacionPortafolioNivel:
                        array[i]?.strRenovacionPortafolioNivel,
                    strSostenibilidad: array[i]?.strSostenibilidad,
                    strSostenibilidadDetalle:
                        array[i]?.strSostenibilidadDetalle,
                    strSostenibilidadNivel: array[i]?.strSostenibilidadNivel,
                    strAtributosValor: array[i]?.strAtributosValor,
                    strAtributosValorDetalle:
                        array[i]?.strAtributosValorDetalle,
                    strAtributosValorNivel: array[i]?.strAtributosValorNivel,
                    strUsoMateriales: array[i]?.strUsoMateriales,
                    strUsoMaterialesDetalle: array[i]?.strUsoMaterialesDetalle,
                    strUsoMaterialesNivel: array[i]?.strUsoMaterialesNivel,
                    strMenajoTecnicaAlim: array[i]?.strMenajoTecnicaAlim,
                    strMenajoTecnicaAlimDetalle:
                        array[i]?.strMenajoTecnicaAlimDetalle,
                    strMenajoTecnicaAlimNivel:
                        array[i]?.strMenajoTecnicaAlimNivel,
                    strProcesosPreparacion: array[i]?.strProcesosPreparacion,
                    strProcesosPreparacionDetalle:
                        array[i]?.strProcesosPreparacionDetalle,
                    strProcesosPreparacionNivel:
                        array[i]?.strProcesosPreparacionNivel,
                    strPresentacionApariencia:
                        array[i]?.strPresentacionApariencia,
                    strPresentacionAparienciaDetalle:
                        array[i]?.strPresentacionAparienciaDetalle,
                    strPresentacionAparienciaNivel:
                        array[i]?.strPresentacionAparienciaNivel,
                    strProporcionAlim: array[i]?.strProporcionAlim,
                    strProporcionAlimDetalle:
                        array[i]?.strProporcionAlimDetalle,
                    strProporcionAlimNivel: array[i]?.strProporcionAlimNivel,
                    strConservacion: array[i]?.strConservacion,
                    strConservacionDetalle: array[i]?.strConservacionDetalle,
                    strConservacionNivel: array[i]?.strConservacionNivel,
                    strInocuidad: array[i]?.strInocuidad,
                    strInocuidadDetalle: array[i]?.strInocuidadDetalle,
                    strInocuidadNivel: array[i]?.strInocuidadNivel,
                    strEmpaqueEtiquetaAlim: array[i]?.strEmpaqueEtiquetaAlim,
                    strEmpaqueEtiquetaAlimDetalle:
                        array[i]?.strEmpaqueEtiquetaAlimDetalle,
                    strEmpaqueEtiquetaAlimNivel:
                        array[i]?.strEmpaqueEtiquetaAlimNivel,
                    strMenajoTecnica: array[i]?.strMenajoTecnica,
                    strMenajoTecnicaDetalle: array[i]?.strMenajoTecnicaDetalle,
                    strMenajoTecnicaNivel: array[i]?.strMenajoTecnicaNivel,
                    strAcabadosFactura: array[i]?.strAcabadosFactura,
                    strAcabadosFacturaDetalle:
                        array[i]?.strAcabadosFacturaDetalle,
                    strAcabadosFacturaNivel: array[i]?.strAcabadosFacturaNivel,
                    strDurabilidad: array[i]?.strDurabilidad,
                    strDurabilidadDetalle: array[i]?.strDurabilidadDetalle,
                    strDurabilidadNivel: array[i]?.strDurabilidadNivel,
                    strUsoColores: array[i]?.strUsoColores,
                    strUsoColoresDetalle: array[i]?.strUsoColoresDetalle,
                    strUsoColoresNivel: array[i]?.strUsoColoresNivel,
                    strProporcion: array[i]?.strProporcion,
                    strProporcionDetalle: array[i]?.strProporcionDetalle,
                    strProporcionNivel: array[i]?.strProporcionNivel,
                    strRiesgoUso: array[i]?.strRiesgoUso,
                    strRiesgoUsoDetalle: array[i]?.strRiesgoUsoDetalle,
                    strRiesgoUsoNivel: array[i]?.strRiesgoUsoNivel,
                    strEmpaqueEtiqueta: array[i]?.strEmpaqueEtiqueta,
                    strEmpaqueEtiquetaDetalle:
                        array[i]?.strEmpaqueEtiquetaDetalle,
                    strEmpaqueEtiquetaNivel: array[i]?.strEmpaqueEtiquetaNivel,
                    strUsabilidad: array[i]?.strUsabilidad,
                    strUsabilidadDetalle: array[i]?.strUsabilidadDetalle,
                    strUsabilidadNivel: array[i]?.strUsabilidadNivel,
                    strDisenioExperiencia: array[i]?.strDisenioExperiencia,
                    strDisenioExperienciaDetalle:
                        array[i]?.strDisenioExperienciaDetalle,
                    strDisenioExperienciaNivel:
                        array[i]?.strDisenioExperienciaNivel,
                };
                let objInfoCategoria2 = {
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
                }
                const objInnovacionBajo = [];
                const objInnovacionMedio = [];
                const objInnovacionAlto = [];

                const objPersepcionBajo = [];
                const objPersepcionMedio = [];
                const objPersepcionAlto = [];

                const objEsteticaBajo = [];
                const objEsteticaMedio = [];
                const objEsteticaAlto = [];

                const objExperienciaBajo = [];
                const objExperienciaMedio = [];
                const objExperienciaAlto = [];

                const objMarcaBajo = [];
                const objMarcaMedio = [];
                const objMarcaAlto = [];

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
                                "BAJO"
                            ) {
                                objInnovacionBajo.push({
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
                                "MEDIO"
                            ) {
                                objInnovacionMedio.push({ 
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
                                objInnovacionAlto.push({ 
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
                                "BAJO"
                            ) {
                                objPersepcionBajo.push({
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
                                "MEDIO"
                            ) {
                                objPersepcionMedio.push({
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
                                objPersepcionAlto.push({
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
                                "BAJO"
                            ) {
                                objEsteticaBajo.push({
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
                                "MEDIO"
                            ) {
                                objEsteticaMedio.push({
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
                                objEsteticaAlto.push({
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
                                "BAJO"
                            ) {
                                objExperienciaBajo.push({
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
                                "MEDIO"
                            ) {
                                objExperienciaMedio.push({
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
                                objExperienciaAlto.push({
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
                                    "BAJO"
                            ) {
                                objMarcaBajo.push({
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
                                "MEDIO"
                            ) {
                                objMarcaMedio.push({
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
                                objMarcaAlto.push({
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

                let objResultadoAlimentos = arrayAlimentos

                let objResultadoNoAlimentos = arrayNoAlimentos

                data[i] = {
                    objInfoGeneral,
                    objInfoProductos,
                    objInfoCategoria1,
                    objInfoCategoria2,
                    objInfoNormatividad,
                    objInfoAdicional,
                    objResultadoAlimentos,
                    objResultadoNoAlimentos,
                    objInnovacionBajo,
                    objInnovacionMedio,
                    objInnovacionAlto,
                    objPersepcionBajo,
                    objPersepcionMedio,
                    objPersepcionAlto,
                    objEsteticaBajo,
                    objEsteticaMedio,
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
module.exports = getDiagnosticoProducto;
