//Class
const classInterfaceDAODiagnostico = require("../infra/conectors/interfaseDAODiagnosticoExpress");
const validator = require("validator").default;

//service
const serviceGetEmpresario = require("../../../Empresarios/domian/getEmpresario.service")

const getDiagnosticoExpress = async (objParams, strDataUser) => {
    let { intIdDiagnostico } = objParams;

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
        intIdDiagnostico,
    };

    let arrayData = await dao.getDiagnosticoExpress(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;

            let data = [];

            for (let i = 0; i < array.length; i++) {
                let queryGetEmpresario = await serviceGetEmpresario({ intId: array[i]?.intIdEmpresario }, strDataUser)
                if (queryGetEmpresario.error) {
                    throw new Error(queryGetEmpresario.msg)
                }

                let objDataEmpresario = queryGetEmpresario.data[0]

                let objInfoGeneral = {
                    intIdDiagnostico: array[i]?.intIdDiagnostico,
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
                let objInfoFamiliar = {
                    strCabezaHogar: array[i]?.strCabezaHogar,
                    intNumPersonasCargo: array[i]?.intNumPersonasCargo,
                    intHijos: array[i]?.intHijos,
                    intHijosEstudiando: array[i]?.intHijosEstudiando,
                    strMaxNivelEducativoHijos:
                        array[i]?.strMaxNivelEducativoHijos,
                    strEstadoCivil: array[i]?.strEstadoCivil,
                    strSituacionVivienda: array[i]?.strSituacionVivienda,
                    strGrupoVulnerable: array[i]?.strGrupoVulnerable,
                    strPoblacionEtnica: array[i]?.strPoblacionEtnica,
                };
                let objInfoEmprendimiento = {
                    intAñoInicioOperacion: array[i]?.intAñoInicioOperacion,
                    strUbicacionUP: array[i]?.strUbicacionUP,
                    strRegistroCamaraComercio:
                        array[i]?.strRegistroCamaraComercio,
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
                };
                let objInfoPerfilEco = {
                    strOperacionesVentas6Meses:
                        array[i]?.strOperacionesVentas6Meses,
                    strEtapaValidacion: array[i]?.strEtapaValidacion,
                    strPromedioVentas6Meses: array[i]?.strPromedioVentas6Meses,
                    strRangoVentas: array[i]?.strRangoVentas,
                    strRangoEmpleados: array[i]?.strRangoEmpleados,
                    strTipoEmpleoGenerado: array[i]?.strTipoEmpleoGenerado,
                    strDlloAcitividadesContratados:
                        array[i]?.strDlloAcitividadesContratados,
                    strPromedioTiempoInvertido:
                        array[i]?.strPromedioTiempoInvertido,
                    strRolesEmprendimiento: JSON.parse(array[i]?.strRolesEmprendimiento),
                    strDiasProduccion: array[i]?.strDiasProduccion,
                    strGeneraEmpleoRiesgoPobreza:
                        array[i]?.strGeneraEmpleoRiesgoPobreza,
                    ValorGananciasMes: array[i]?.ValorGananciasMes,
                    strActivos: array[i]?.strActivos,
                    ValorActivos: array[i]?.ValorActivos,
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
module.exports = getDiagnosticoExpress;
