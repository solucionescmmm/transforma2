//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getServicioFases = async (objParams) => {
    let = { intIdFase, intIdServicio } = objParams;
    let dao = new classInterfaceEstados();

    let query = {
        intIdFase,
        intIdServicio
    };

    let result = await dao.getServicioFases(query);

    return result;
};
module.exports = getServicioFases;