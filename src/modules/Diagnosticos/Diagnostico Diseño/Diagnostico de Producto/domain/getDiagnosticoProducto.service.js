//Class
const classInterfaceDAODiagnostico = require("../infra/repository/daoDiagnosticoProducto");
const validator = require("validator").default;

const getDiagnosticoProducto = async (objParams, strDataUser) => {
    let { intId, intIdEmpresario } = objParams;

    if (!intId && !intIdEmpresario) {
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
        intIdEmpresario,
    };

    let arrayData = await dao.getDiagnosticoProducto(query);
    let arrayResultAlimentos = await dao.getResultDiagnosticoAlimentos(query);
    let arrayResultNoAlimentos = await dao.getResultDiagnosticoNoAlimentos(
        query
    );

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let arrayAlimentos = arrayResultAlimentos.data;
            let arrayNoAlimentos = arrayResultNoAlimentos.data;

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
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
                };
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

                data[i] = {
                    objInfoGeneral,
                    objInfoProductos,
                    objInfoCategoria1,
                    objInfoCategoria2,
                    objInfoNormatividad,
                    objInfoAdicional,
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
