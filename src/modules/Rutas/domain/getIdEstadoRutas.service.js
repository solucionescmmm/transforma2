//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getIdEstadoRutas = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEstados();

    let query = { strNombre };

    let result = await dao.getIdEstadoRutas(query);

    return result;
};
module.exports = getIdEstadoRutas;