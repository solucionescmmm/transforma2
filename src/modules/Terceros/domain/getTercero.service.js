//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceTercero = require("../infra/conectors/interfaceDaoTercero");

const getTercero = async (objParams) => {
    let = { intId, intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceTercero();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea || null,
    };

    let arrayData = await dao.getTercero(query);

    return arrayData;
};
module.exports = getTercero;
