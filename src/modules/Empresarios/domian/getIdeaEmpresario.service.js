//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getIdeaEmpresario = async (objParams, strDataUser) => {
    let {
        intId
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
        intId: intId || null
    };

    let arrayData = await dao.getIdeaEmpresario(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let arrayEmpresario = array[i].objInfoEmpresario
                let arrayIdeaEmpresario = array[i].objInfoIdeaEmpresario
                let objEmpresario = []
                let objInfoPrincipal = {}
                
                for (let j = 0; j < arrayEmpresario.length; j++) {
                    for (let k = 0; k < arrayIdeaEmpresario.length; k++) {
                        if (arrayEmpresario[j].intId ===arrayIdeaEmpresario[k].intIdEmpresario) {
                            objEmpresario.push({
                                ...arrayEmpresario[j],
                                arrDepartamento:JSON.parse(arrayEmpresario[j]?.strDepartamento||null),
                                arrCiudad:JSON.parse(arrayEmpresario[j]?.strCiudad||null),
                            }) 
                        }
                        if (arrayIdeaEmpresario[k].strTipoEmpresario === "Principal") {
                            objInfoPrincipal ={
                                strSede:arrayEmpresario[j].strSede,
                                strModalidadIngreso:arrayEmpresario[j].strModalidadIngreso,
                                dtFechaVinculacion:arrayEmpresario[j].dtFechaVinculacion,
                                strEstadoVinculacion:arrayEmpresario[j].strEstadoVinculacion,
                                strTipoVinculacion:arrayEmpresario[j].strTipoVinculacion
                            }
                        }
                    }
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
                    intId:array[i]?.intId,
                    strNombre:array[i]?.strNombre,
                    intIdEstado:array[i]?.intIdEstado,
                    dtmCreacion:array[i]?.dtmCreacion,
                    strUsuarioCreacion:array[i]?.strUsuarioCreacion,
                    dtmActualizacion:array[i]?.dtmActualizacion,
                    strUsuarioActualizacion:array[i]?.strUsuarioActualizacion,
                    objIdeaEmpresario:array[i]?.objInfoIdeaEmpresario,
                    objInfoPrincipal,
                    objEmpresario,
                    objInfoEmpresa,
                    objInfoAdicional,
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
module.exports = getIdeaEmpresario;
