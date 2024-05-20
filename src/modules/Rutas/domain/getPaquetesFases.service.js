//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getPaqueteFases = async (objParams) => {
    let = { intIdPaqueteFase } = objParams;
    let dao = new classInterfaceEstados();

    let query = {
        intIdPaqueteFase
    };

    let result = await dao.getPaqueteFases(query);

    return result;
};
module.exports = getPaqueteFases;