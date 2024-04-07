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

                let objInfoEmprendimiento = {
                    intAñoInicioOperacion: array[i]?.intAñoInicioOperacion,
                    strUbicacionUP: array[i]?.strUbicacionUP,
                    strRegistroCamaraComercio:
                        array[i]?.strRegistroCamaraComercio,
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
                    PromedioVentas6Meses: array[i]?.PromedioVentas6Meses,
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
                let objHumanas = {
                    strHabilidadesAutonomia:array[i]?.strHabilidadesAutonomia,
                    strHabilidadesCapacidad:array[i]?.strHabilidadesCapacidad,
                    strHabilidadesComunicacion:array[i]?.strHabilidadesComunicacion,
                    strHabilidadesCreatividad:array[i]?.strHabilidadesCreatividad,
                    strTomaDesiciones:array[i]?.strTomaDesiciones,
                    strConfianza:array[i]?.strConfianza
                }
                let objTecnicas = {
                    strUniProdSosFinan: array[i]?.strUniProdSosFinan,
                    strTieneBaseDatosClientes: array[i]?.strTieneBaseDatosClientes,
                    strActivIncreVentClient: array[i]?.strActivIncreVentClient,
                    strPlanAtraccionRelacionamientoFidelizacionClientes: array[i]?.strPlanAtraccionRelacionamientoFidelizacionClientes,
                    strEquipTrabEstruct: array[i]?.strEquipTrabEstruct,
                    strEmprFormaAcuerNormLab: array[i]?.strEmprFormaAcuerNormLab,
                    strPlaneaEstraEmpPlanPlani: array[i]?.strPlaneaEstraEmpPlanPlani
                }
                let objProducto = {
                    strPermisoFuncionamiento:array[i]?.strPermisoFuncionamiento,
                    strCertificadosRequeridos:array[i]?.strCertificadosRequeridos,
                    strCertificadosActuales:array[i]?.strCertificadosActuales,
                    strPatentesUtilidad:array[i]?.strPatentesUtilidad,
                    strCualPatenteUtilidad:array[i]?.strCualPatenteUtilidad,
                    strRegistroMarca:array[i]?.strRegistroMarca,
                    strIdentidadMarca:array[i]?.strIdentidadMarca,
                    strComunicacionMarca:array[i]?.strComunicacionMarca
                }
                let objInfoAdicional = {
                    strConclusiones: array[i]?.strConclusiones,
                    strURLSFotosProducto: array[i]?.strURLSFotosProducto,
                };

                data[i] = {
                    objInfoGeneral,
                    objInfoFamiliar,
                    objInfoEmprendimiento,
                    objInfoPerfilEco,
                    objTecnicas,
                    objHumanas,
                    objProducto,
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
