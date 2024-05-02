//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getLastEmpresarios = async (objParams, strDataUser) => {
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

    let arrayData = await dao.getLastEmpresario();

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let data = [];

            for (let i = 0; i < array.length; i++) {
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
                data[i] ={
                    intId: array[i]?.intId,
                    strNombre: array[i]?.strNombre,
                    intIdEstado: array[i]?.intIdEstado,
                    intIdSede: array[i]?.intIdSede,
                    strModalidadIngreso: array[i]?.strModalidadIngreso,
                    dtFechaVinculacion: array[i]?.dtFechaVinculacion,
                    intIdEstadoVinculacion: array[i]?.intIdEstadoVinculacion,
                    strEstado: array[i]?.strEstadoVinculacion,
                    strTipoVinculacion: array[i]?.strTipoVinculacion,
                    dtmCreacion: array[i]?.dtmCreacion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    objIdeaEmpresario:array[i]?.objInfoIdeaEmpresario,
                    objInfoPrincipal,
                    objEmpresario,
                    // objInfoEmpresa,
                    // objInfoAdicional,
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