//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceDocumento = require("../infra/conectors/interfaceDaoDocumento");

const getDocumento = async (objParams) => {
    let = { intId, intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceDocumento();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea || null,
    };

    let arrayData = await dao.getDocumento(query);

    return arrayData;
};
module.exports = getDocumento;
