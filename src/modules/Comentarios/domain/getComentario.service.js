//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceComentarios = require("../infra/conectors/interfaceDaoComentarios");

const  getComentario = async (objParams, strDataUser) => {
    let = { intId, intIdIdea } = objParams;

    if (!objParams) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceComentarios();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea || null,
    };

    let arrayData = await dao.getComentario(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;

            let result = {
                error: false,
                data: array,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getComentario;
