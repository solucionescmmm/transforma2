//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getLastEmpresarios = async (objParams, strDataUser) => {
    let {
        intIdIdea,
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
        intId: intIdIdea || intId || null
    };

    let arrayData = await dao.getIdeaEmpresario(query);
    console.log(arrayData)

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data.reverse();
            let maxLength = array.length >= 10 ? 10 : array.length
            let data = [];

            for (let i = 0; i < maxLength; i++) {
                let arrayEmpresario = array[i].objInfoEmpresario
                let arrayIdeaEmpresario = array[i]?.objInfoIdeaEmpresario;
                let objEmpresario = []
                let objInfoPrincipal = {}

                if (arrayEmpresario?.length > 0) {
                    for (let j = 0; j < arrayEmpresario.length; j++) {
                        let dataEmpresarioPrincipal = arrayIdeaEmpresario?.find((i)=> i.strTipoEmpresario === "Principal")
                        objEmpresario.push({
                            ...arrayEmpresario[j],
                            arrDepartamento:JSON.parse(arrayEmpresario[j]?.strDepartamento||null),
                            arrCiudad:JSON.parse(arrayEmpresario[j]?.strCiudad||null),
                            strSede:arrayEmpresario[j]?.strNombreSedes,
                            strModalidadIngreso:arrayIdeaEmpresario[j]?.strModalidadIngreso,
                            dtFechaVinculacion:arrayIdeaEmpresario[j]?.dtFechaVinculacion,
                            intIdEstadoVinculacion:arrayIdeaEmpresario[j]?.intIdEstadoVinculacionEmpresario,
                            strTipoVinculacion:arrayIdeaEmpresario[j]?.strTipoVinculacion,
                            strEstado:arrayIdeaEmpresario[j]?.strEstado,
                            strEstadoVinculacion: arrayIdeaEmpresario[j]?.strEstadoVinculacion
                        }) 
                            
                        if (arrayEmpresario[j].strTipoEmpresario === "Principal") {
                            objInfoPrincipal ={
                                strSede:arrayEmpresario[j]?.strNombreSedes,
                                intIdSede:arrayEmpresario[j]?.intIdSede,
                                strModalidadIngreso:dataEmpresarioPrincipal?.strModalidadIngreso,
                                dtFechaVinculacion:dataEmpresarioPrincipal?.dtFechaVinculacion,
                                intIdEstadoVinculacion:dataEmpresarioPrincipal?.intIdEstadoVinculacionEmpresario,
                                strTipoVinculacion:dataEmpresarioPrincipal?.strTipoVinculacion
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
                    strURLDocumento:array[i]?.objInfoAdicional[0]?.strUrlSoporteRecibirInfoCMM,
                    strRecomendaciones:array[i]?.objInfoAdicional[0]?.strRecomendaciones,
                    dtmActualizacion:array[i]?.objInfoAdicional[0]?.dtmActualizacion,
                    strUsuario:array[i]?.objInfoAdicional[0]?.strUsuario,
                }
                data[i] ={
                    intId: array[i]?.intId,
                    strNombre: array[i]?.strNombre,
                    intIdEstado: array[i]?.intIdEstado,
                    intIdSede: array[i]?.intIdSede,
                    strModalidadIngreso: array[i]?.strModalidadIngreso,
                    dtFechaVinculacion: array[i]?.dtFechaVinculacion,
                    intIdEstadoVinculacion: array[i]?.intIdEstadoVinculacion,
                    strEstado: array[i]?.strEstado,
                    strTipoVinculacion: array[i]?.strTipoVinculacion,
                    dtmCreacion: array[i]?.dtmCreacion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
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
module.exports = getLastEmpresarios;