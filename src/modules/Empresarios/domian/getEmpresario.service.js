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
                let objInfoEmpresa ={
                    intId:array[i]?.objInfoEmpresa[0]?.intId,
                    intIdEmpresario:array[i]?.objInfoEmpresa[0]?.intIdEmpresario,
                    strEstadoNegocio:array[i]?.objInfoEmpresa[0]?.strEstadoNegocio,
                    strCuandoComienzaEmpresa:array[i]?.objInfoEmpresa[0]?.strCuandoPlaneaComenzar,
                    strURLFileLogoEmpresa:array[i]?.objInfoEmpresa[0]?.strURLFileLogoEmpresa,
                    strNombreMarca:array[i]?.objInfoEmpresa[0]?.strNombreMarca,
                    dtFechaFundacion:array[i]?.objInfoEmpresa[0]?.dtFechaFundacion,
                    strLugarOperacion:array[i]?.objInfoEmpresa[0]?.strLugarOperacion,
                    arrDepartamento:JSON.parse(array[i]?.objInfoEmpresa[0]?.strDepartamento||null),
                    arrCiudad:JSON.parse(array[i]?.objInfoEmpresa[0]?.strCiudad||null),
                    strBarrio:array[i]?.objInfoEmpresa[0]?.strBarrio,
                    strDireccionResidencia:array[i]?.objInfoEmpresa[0]?.strDireccionResidencia,
                    strSectorEconomico:array[i]?.objInfoEmpresa[0]?.strSectorEconomico,
                    strCategoriaProducto:array[i]?.objInfoEmpresa[0]?.strCategoriaProducto,
                    strCategoriaServicio:array[i]?.objInfoEmpresa[0]?.strCategoriaServicio,
                    arrCategoriasSecundarias: JSON.parse(array[i].objInfoEmpresa[0]?.strCategoriasSecundarias||null),
                    strOtraCategoria:array[i]?.objInfoEmpresa[0]?.strOtraCategoria,
                    strDescProductosServicios:array[i]?.objInfoEmpresa[0]?.strDescProductosServicios,
                    strMateriaPrima:array[i]?.objInfoEmpresa[0]?.strMateriaPrima,
                    strNombreTecnica:array[i]?.objInfoEmpresa[0]?.strNombreTecnica,
                    strTiempoDedicacion:array[i]?.objInfoEmpresa[0]?.strTiempoDedicacion,
                    btGeneraEmpleo:array[i]?.objInfoEmpresa[0]?.btGeneraEmpleo,
                    intNumeroEmpleados:array[i]?.objInfoEmpresa[0]?.intNumeroEmpleados,
                    valorVentasMes:array[i]?.objInfoEmpresa[0]?.valorVentasMes,
                    arrFormasComercializacion: JSON.parse(array[i].objInfoEmpresa[0]?.strFormasComercializacion||null),
                    arrMediosDigitales: JSON.parse(array[i].objInfoEmpresa[0]?.strMediosDigitales||null),
                    btGrupoAsociativo:array[i]?.objInfoEmpresa[0]?.btGrupoAsociativo,
                    strAsociacionUnidadProdIndividual:array[i]?.objInfoEmpresa[0]?.strAsociacionUnidadProdIndividual,
                    arrRequisitosLey: JSON.parse(array[i].objInfoEmpresa[0]?.strRequisitosLey||null),
                    strOtrosRequisitosLey:array[i]?.objInfoEmpresa[0]?.strOtrosRequisitosLey,
                    dtmActualizacion:array[i]?.objInfoEmpresa[0]?.dtmActualizacion,
                    strUsuario:array[i]?.objInfoEmpresa[0]?.strUsuario,
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
                    objInfoEmpresa,
                    objInfoAdicional,
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
