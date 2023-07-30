//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceEventos = require("../infra/conectors/interfaceDAOEventos");

const  getTiposEventos = async (objParams) => {
    let = { intId } = objParams;

    if (!objParams) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceEventos();

    let query = {
        intId: intId || null,
    };

    let result = await dao.getTiposEventos(query);

    return result;
};
module.exports = getTiposEventos;