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

    let result = await dao.getComentario(query);

    return result;
};
module.exports = getComentario;
