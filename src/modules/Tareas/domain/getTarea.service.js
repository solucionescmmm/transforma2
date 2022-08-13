//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceTareas = require("../infra/conectors/interfaceDaoTareas");

const  getTarea = async (objParams) => {
    let = { intId, intIdEmpresario } = objParams;

    if (!objParams) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceTareas();

    let query = {
        intId: intId || null,
        intIdEmpresario: intIdEmpresario || null,
    };

    let result = await dao.getTarea(query);

    return result;
};
module.exports = getTarea;
