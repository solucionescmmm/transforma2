//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getServicioFases = async (objParams) => {
    let = { intIdFase, intIdServicio } = objParams;

    if (!intIdFase && !intIdServicio) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEstados();

    let query = {
        intIdFase,
        intIdServicio
    };

    let result = await dao.getServicioFases(query);

    return result;
};
module.exports = getServicioFases;