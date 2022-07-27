//Interface
const classInterfaceEmpresario = require("../infra/conectors/interfaceDAOEmpresarios");

const getIdTipoEmpresario = async (objParams) => {
    let = { strNombre } = objParams;

    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEmpresario();

    let query = { strNombre };

    let result = await dao.getIdTipoEmpresario(query);

    return result;
};
module.exports = getIdTipoEmpresario;