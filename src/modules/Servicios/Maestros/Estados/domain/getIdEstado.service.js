//Interface
const classInterfaceEstados = require("../infra/conectors/interfaceDAOEstados");

const getIdEstados = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEstados();

    let query = { strNombre };

    let result = await dao.getIdEstados(query);

    return result;
};
module.exports = getIdEstados;