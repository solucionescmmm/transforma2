//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getEstadosRutas = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfaceEstados();

    let query = { intId: intId || null };

    let result = await dao.getEstadosRutas(query);

    return result;
};
module.exports = getEstadosRutas;
