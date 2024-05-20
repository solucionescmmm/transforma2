//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getServicioFases = async (objParams) => {
    let = { intIdFase, intIdServicio, intIdPaqueteFase } = objParams;

    let dao = new classInterfaceEstados();

    let query = {
        intIdFase,
        intIdServicio,
        intIdPaqueteFase
    };

    let result = await dao.getServicioFases(query);

    return result;
};
module.exports = getServicioFases;