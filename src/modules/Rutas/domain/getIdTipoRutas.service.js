//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getIdTipoRutas = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEstados();

    let query = { strNombre };

    let result = await dao.getIdTipoRutas(query);

    return result;
};
module.exports = getIdTipoRutas;