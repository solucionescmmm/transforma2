//Interface
const classInterfaceMain = require("../infra/conectors/interfaceDAOMain");

const getIdFuenteHistoricos = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceMain();

    let query = { strNombre };

    let result = await dao.getIdFuenteHistorico(query);

    return result;
};
module.exports = getIdFuenteHistoricos;