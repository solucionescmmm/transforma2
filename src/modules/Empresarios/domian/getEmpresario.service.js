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
        strCategoriaProducto,
        strCategoriaServicio
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
        strCategoriaProducto: strCategoriaProducto || null,
        strCategoriaServicio:strCategoriaServicio || null,
    };

    let arrayData = await dao.getEmpresario(query);


    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
                console.log(array)
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objEmpresario ={
                    intId: array[i].intId,
                    strNombres: array[i].strNombres,
                    strApellidos:array[i].strApellidos,
                    strTipoDocto:array[i].strTipoDocto,
                    strNroDocto:array[i].strNroDocto,
                    strLugarExpedicionDocto:array[i].strLugarExpedicionDocto,
                    dtFechaExpedicionDocto:array[i].dtFechaExpedicionDocto,
                    dtFechaNacimiento:array[i].dtFechaNacimiento,
                    strGenero:array[i].strGenero,
                    strCelular1:array[i].strCelular1,
                    strCelular2:array[i].strCelular2,
                    strCorreoElectronico1:array[i].strCorreoElectronico1,
                    strCorreoElectronico2:array[i].strCorreoElectronico2,
                    strNivelEducativo:array[i].strNivelEducativo,
                    strTitulos:array[i].strTitulos,
                    strCondicionDiscapacidad:array[i].strCondicionDiscapacidad,
                    strSede:array[i].strSede,
                    strModalidadIngreso:array[i].strModalidadIngreso,
                    dtFechaVinculacion:array[i].dtFechaVinculacion,
                    strEstadoVinculacion: array[i].strEstadoVinculacion,
                    strTipoVinculacion:array[i].strTipoVinculacion,
                    strEstrato:array[i].strEstrato,
                    arrDepartamento:JSON.parse(array[i]?.strDepartamento||null),
                    arrCiudad:JSON.parse(array[i]?.strCiudad||null),
                    strBarrio:array[i].strBarrio,
                    strDireccionResidencia:array[i].strDireccionResidencia,
                    strURLFileFoto:array[i].strUrlFileFoto,
                }
                let objInfoAdicional ={
                    intId:array[i]?.objInfoAdicional[0]?.intId,
                    intIdEmpresario:array[i]?.objInfoAdicional[0]?.intIdEmpresario,
                    strPrincipalesNecesidades:array[i]?.objInfoAdicional[0]?.strPrincipalesNecesidades,
                    btInteresadoProcesoCMM:array[i]?.objInfoAdicional[0]?.btInteresadoProcesoCMM,
                    arrTemasCapacitacion:JSON.parse(array[i].objInfoAdicional[0]?.strTemasCapacitacion||null),
                    arrComoSeEntero:JSON.parse(array[i].objInfoAdicional[0]?.strComoSeEntero||null),
                    strOtroComoSeEntero:array[i]?.objInfoAdicional[0]?.strOtroComoSeEntero,
                    arrMediosDeComunicacion:JSON.parse(array[i].objInfoAdicional[0]?.strMediosDeComunicacion||null),
                    strOtrosMediosComunicacion:array[i]?.objInfoAdicional[0]?.strOtrosMediosComunicacion,
                    btRecibirInfoCMM:array[i]?.objInfoAdicional[0]?.btRecibirInfoCMM,
                    strRecomendaciones:array[i]?.objInfoAdicional[0]?.strRecomendaciones,
                    dtmActualizacion:array[i]?.objInfoAdicional[0]?.dtmActualizacion,
                    strUsuario:array[i]?.objInfoAdicional[0]?.strUsuario,
                }
                data[i] ={
                    objEmpresario,
                    objInfoAdicional,
                }
            }
            let result = {
                error: false,
                data,
            };

            console.log(result)

            return result;
        }
    }

    return arrayData;
};
module.exports = getEmpresario;
