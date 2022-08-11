//Interface
const classInterfaceDAOHistoricos = require("../infra/conectors/interfaceDAOHistoricos");

const getIdFuenteHistorico = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceDAOHistoricos();

    let query = { strNombre };

    let result = await dao.getIdFuenteHistorico(query);

    return result;
};
module.exports = getIdFuenteHistorico;