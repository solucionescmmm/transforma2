//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresario = async (objParams, strDataUser) => {
    let {
        intId,
        strNombres,
        strApellidos,
        strNroDocto,
        strCorreoElectronico,
        strSede,
        strEstadoVinculacion,
        strTipoVinculacion,
        dtFechaVinculacion,
    } = objParams;

    if (!objParams) {
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

    let dao = new classInterfaceDAOEmpresarios();

    let query = {
        intId: intId || null,
        strNombres: strNombres || null,
        strApellidos: strApellidos || null,
        strNroDocto: strNroDocto || null,
        strCorreoElectronico: strCorreoElectronico || null,
        strSede: strSede || null,
        strEstadoVinculacion: strEstadoVinculacion || null,
        strTipoVinculacion: strTipoVinculacion || null,
        dtFechaVinculacion: dtFechaVinculacion || null,
    };

    let arrayData = await dao.getEmpresario(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objEmpresario ={
                    intId: array[i].intId,
                    strNombres: array[i].strNombres,
                    strApellidos:array[i].strApellidos,
                    dtFechaNacimiento:array[i].dtFechaNacimiento,
                    strTipoDocto:array[i].strTipoDocto,
                    strNroDocto:array[i].strNroDocto,
                    strLugarExpedicionDocto:array[i].strLugarExpedicionDocto,
                    dtFechaExpedicionDocto:array[i].dtFechaExpedicionDocto,
                    strSexo:array[i].strSexo,
                    strCelular:array[i].strCelular,
                    strCorreoElectronico:array[i].strCorreoElectronico,
                    strNivelEducativo:array[i].strNivelEducativo,
                    strTitulos:array[i].strTitulos,
                    strCondicionDiscapacidad:array[i].strCondicionDiscapacidad,
                    strSede:array[i].strSede,
                    strTipoEmpresario:array[i].strTipoEmpresario,
                    dtFechaVinculacion:array[i].dtFechaVinculacion,
                    strEstado:array[i].strEstado,
                    strUrlFoto:array[i].strUrlFoto,
                    strEspacioJornada:array[i].strEspacioJornada
                }
                data[i] ={
                    objEmpresario,
                    objInfoEmpresa:array[i]?.objInfoEmpresa || undefined,
                    arrEmpresarioSecundario:array[i]?.arrEmpresarioSecundario || undefined,
                }
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
module.exports = getEmpresario;
