//Interface
const classInterfaceEstados = require("../infra/conectors/interfaceDAOEventos");

const getIdEstadoEventos = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEstados();

    let query = { strNombre };

    let result = await dao.getIdEstadoEventos(query);

    return result;
};
module.exports = getIdEstadoEventos;