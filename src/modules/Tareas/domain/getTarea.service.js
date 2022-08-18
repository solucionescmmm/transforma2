
//Clases
const classInterfaceTareas = require("../infra/conectors/interfaceDaoTareas");

const  getTarea = async (objParams) => {
    let = { intId, intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceTareas();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea || null,
    };

    let result = await dao.getTarea(query);

    return result;
};
module.exports = getTarea;
