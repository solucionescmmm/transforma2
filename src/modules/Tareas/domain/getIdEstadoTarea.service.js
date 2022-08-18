//Interface
const classInterfaceTareas = require("../infra/conectors/interfaceDaoTareas");

const getIdEstadoTarea = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceTareas();

    let query = { strNombre };

    let result = await dao.getIdEstadoTarea(query);

    return result;
};
module.exports = getIdEstadoTarea;