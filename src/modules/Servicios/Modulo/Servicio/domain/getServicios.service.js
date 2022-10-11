//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOServicios");

const getEmpresario = async (objParams, strDataUser) => {
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
        intId: intId || null,
    };

    let arrayData = await dao.getServicios(query);


    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objInfoPrincipal ={
                    intId: array[i].intId,
                    intIdTipoServicio: array[i].intIdTipoServicio,
                    strNombreTipoServicio:array[i].strNombreTipoServicio,
                    strNombre:array[i].strNombre,
                    strDescripcion:array[i].strDescripcion,
                    bitModulos:array[i].btModulos,
                    intIdProyectoEs:array[i].intIdProyectosEspeciales,
                    strProyecto: array[i].strProyecto,
                    intIdEstado:array[i].intIdEstado,
                    strEstado:array[i].strEstado,
                    dtmCreacion:array[i].dtmCreacion,
                    strUsuarioCreacion:array[i].strUsuarioCreacion,
                    dtmActualizacion:array[i].dtmActualizacion,
                    strUsuarioActualizacion:array[i].strUsuarioActualizacion,
                }
                
                let queryAtributos = await dao.getAtributosTiposServicios({
                    intIdTipoServicio: array[i].intIdTipoServicio
                })

                let arrAtributos = queryAtributos.data

                let objResultAtributos = array[i].objResultAtributos

                for (const prop in objResultAtributos) {
                    for (let j = 0; j < arrAtributos.length; j++) {
                        if (prop === arrAtributos[j].strNombreAtributo) {
                            arrAtributos[j]={
                                ...arrAtributos[j],
                                [prop]:objResultAtributos[prop]
                            }
                        }
                    }
                }

                data[i] ={
                    objInfoPrincipal,
                    arrModulos:array[i]?.arrModulos||[],
                    arrSedesTarifas:array[i]?.arrSedesTarifas||[],
                    arrResponsables:array[i]?.arrResponsables||[],
                    arrAtributos
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