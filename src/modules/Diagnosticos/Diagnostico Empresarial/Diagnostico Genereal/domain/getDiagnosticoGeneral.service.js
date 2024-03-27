//Class
const classInterfaceDAODiagnostico = require("../infra/conectors/interfaseDAODiagnosticoGeneral");
const validator = require("validator").default;

const getDiagnosticoGeneral = async (objParams, strDataUser) => {
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

    let arrayData = await dao.getDiagnosticoGeneral(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objInfoGeneral = {
                    intId: array[i].intId,
                    intIdDiagnostico: array[i]?.intIdDiagnostico,
                    intIdEmpresario: array[i]?.intIdEmpresario,
                    btFinalizado: array[i]?.btFinalizado,
                    strUbicacionVivienda: array[i]?.strUbicacionVivienda,
                    strLugarSesion: array[i]?.strLugarSesion,
                    dtmFechaSesion: array[i]?.dtmFechaSesion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                };
                let objInfoFamiliar = {
                    strCabezaHogar: array[i]?.strCabezaHogar,
                    intNumPersonasCargo: array[i]?.intNumPersonasCargo,
                    intHijos: array[i]?.intHijos,
                    intHijosEstudiando: array[i]?.intHijosEstudiando,
                    strMaxNivelEducativoHijos: array[i]?.strmaxNivelEducativoHijos,
                    strEstadoCivil: array[i]?.strEstadoCivil,
                    strSituacionVivienda: array[i]?.strSituacionVivienda,
                    strGrupoVulnerable: array[i]?.strGrupoVulnerable,
                    strPoblacionEtnica: array[i]?.strPoblacionEtnica,
                };
                let objInfoEmprendimiento = {
                    strUbicacionUP: array[i]?.strUbicacionUP,
                    intAñoInicioOperacion: array[i]?.intAñoInicioOperacion?.toString(),
                    strRegistroCamaraComercio: array[i]?.strRegistroCamaraComercio,
                    strRedesSociales: array[i]?.strRedesSociales,
                    intCantidadUnidadesProducidasMes: array[i]?.intCantidadUnidadesProducidasMes,
                    intPorcentajeMargenRentaProductoEscogido: array[i]?.intPorcentajeMargenRentaProductoEscogido,
                    intRangoPorcentajeIntermediacionVentas: array[i]?.intRangoPorcentajeIntermediacionVentas,
                    strConoceCostosProductoEscogido: array[i]?.strConoceCostosProductoEscogido,
                    strConoceMargenRentaProductoEscogido: array[i]?.strConoceMargenRentaProductoEscogido,
                    strDefinePorcentajesCanal: array[i]?.strDefinePorcentajesCanal,
                    strEscojaProductoServicio: array[i]?.strEscojaProductoServicio,
                    strEtapaValidProductoServicios: array[i]?.strEtapaValidProductoServicios,
                    strLineaProductoServicioDestacada: array[i]?.strLineaProductoServicioDestacada,
                    strListadoProdServ: array[i]?.strListaProductoServiciosNuevosUltimoAño,
                    strNivelDlloProductoServicios: array[i]?.strNivelDlloProductoServicios,
                    strPorcentajeIntermediacionVentas: array[i]?.strPorcentajeIntermediacionVentas,
                    strProductoServiciosEnValidacion: array[i]?.strProductoServiciosEnValidacion,
                    MaximoValorProducto: array[i]?.MaximoValorProducto,
                    MinimoValorProducto: array[i]?.MinimoValorProducto,
                    ValorVentaProductoEscogido: array[i]?.ValorVentaProductoEscogido,
                    strConoceCostosProductoEscogido: array[i]?.strConoceCostosProduccionProductoEscogido,
                    CostoProduccionProductoEscogido: array[i]?.CostoProduccionProductoEscogido,
                    strDefinineLineasProductoServicios: array[i]?.strDefinineLineasProductoServicios,
                };
                let objInfoEmpresa = {
                    strHistoriaEmpresa: array[i]?.strHistoriaEmpresa,
                    strSuenioEmpresa: array[i]?.strSuenioEmpresa,
                    strEstudioEmprendimiento:
                        array[i]?.strEstudioEmprendimiento,
                    strExperienciaEmprendimiento:
                        array[i]?.strExperienciaEmprendimiento,
                    strTipoContribuyente: array[i]?.strTipoContribuyente,
                    strRut: array[i]?.strRut,
                    strPresupuestoFamiliar: array[i]?.strPresupuestoFamiliar,
                    strIngresosDistintos: array[i]?.strIngresosDistintos,
                    strTrabajanFamiliares: array[i]?.strTrabajanFamiliares
                };
                let objInfoPerfilEco = {
                    strOperacionesVentas6Meses:
                        array[i]?.strOperacionesVentas6Meses,
                    strEtapaValidacion: array[i]?.strEtapaValidacion,
                    PromedioVentas6Meses: array[i]?.PromedioVentas6Meses,
                    strRangoVentas: array[i]?.strRangoVentas,
                    strRangoEmpleados: array[i]?.strRangoEmpleados,
                    strTipoEmpleoGenerado: array[i]?.strTipoEmpleoGenerado,
                    strDlloAcitividadesContratados:
                        array[i]?.strDlloAcitividadesContratados,
                    strPromedioTiempoInvertido:
                        array[i]?.strPromedioTiempoInvertido,
                    strRolesEmprendimiento: JSON.parse(array[i]?.strRolesEmprendimiento || ""),
                    strDiasProduccion: array[i]?.strDiasProduccion,
                    intMargenRentabilidad: array[i]?.intMargenRentabilidad,
                    strGeneraEmpleoRiesgoPobreza:
                        array[i]?.strGeneraEmpleoRiesgoPobreza,
                    dblValorGananciasMes: array[i]?.ValorGananciasMes,
                    strActivos: array[i]?.strActivos,
                    dblValorActivos: array[i]?.ValorActivos,
                    strEtapaDllo: array[i]?.strEtapaDllo,
                };
                let objInfoAdicional = {
                    strConclusiones: array[i]?.strConclusiones,
                    strURLSFotosProducto: array[i]?.strURLSFotosProducto,
                };

                data[i] = {
                    objInfoGeneral,
                    objInfoFamiliar,
                    objInfoEmprendimiento,
                    objInfoEmpresa,
                    objInfoPerfilEco,
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
module.exports = getDiagnosticoGeneral;
