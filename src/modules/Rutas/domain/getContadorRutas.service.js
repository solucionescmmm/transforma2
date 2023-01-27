//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getContadorRutas = async (objParams) => {
    let = { intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEstados();

    let query = { intIdIdea };

    let result = await dao.getContadorRutas(query);

    return result;
};
module.exports = getContadorRutas;