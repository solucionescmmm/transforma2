//Interface
const classInterfaceDAOHistoricos = require("../infra/conectors/interfaceDAOHistoricos");

const getHistoricoByFuente = async (objParams) => {
    let = { intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceDAOHistoricos();

    let query = { intIdIdea };

    let result = await dao.getHistoricoByFuente(query);

    return result;
};
module.exports = getHistoricoByFuente;