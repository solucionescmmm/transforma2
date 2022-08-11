//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresario = async (objParams, strDataUser) => {
    let { intId } = objParams;

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

    let arrayData = await dao.getEmpresario(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let arrayEmpresario = array[i].objInfoEmpresario;
                let arrayIdeaEmpresario = array[i].objInfoIdeaEmpresario;
                let objEmpresario = [];

                for (let j = 0; j < arrayEmpresario.length; j++) {
                    for (let k = 0; k < arrayIdeaEmpresario.length; k++) {
                        if (
                            arrayEmpresario[j].intId ===
                            arrayIdeaEmpresario[k].intIdEmpresario
                        ) {
                            objEmpresario.push({
                                ...arrayEmpresario[j],
                                arrDepartamento: JSON.parse(
                                    arrayEmpresario[j]?.strDepartamento || null
                                ),
                                arrCiudad: JSON.parse(
                                    arrayEmpresario[j]?.strCiudad || null
                                ),
                                strTipoEmpresario:
                                    arrayIdeaEmpresario[k].strTipoEmpresario,
                            });
                        }
                    }
                }
                data[i] = {
                    intId: array[i]?.intId,
                    strNombre: array[i]?.strNombre,
                    intIdEstado: array[i]?.intIdEstado,
                    dtmCreacion: array[i]?.dtmCreacion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    objIdeaEmpresario: array[i]?.objInfoIdeaEmpresario,
                    objEmpresario,
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
module.exports = getEmpresario;
