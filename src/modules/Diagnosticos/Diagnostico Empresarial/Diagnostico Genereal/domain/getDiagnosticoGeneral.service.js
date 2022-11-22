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
                    strUbicacionVivienda: array[i]?.strUbicacionVivienda,
                    strLugarSesion: "Medellin",
                    dtmFechaSesion: "2021-12-16T13:25:00.000Z",
                    strUsuarioCreacion: "Pepito",
                    dtmActualizacion: "2021-12-09T21:34:58.943Z",
                    strUsuarioActualizacion: "",
                };
                let objInfoFamiliar = {
                    btCabezaHogar: array[i]?.btCabezaHogar,
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
                    strRolesEmprendimiento: array[i]?.strRolesEmprendimiento,
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
module.exports = getDiagnosticoGeneral;
