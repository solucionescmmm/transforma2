//Interface
const classInterfaceEmpresario = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresarioByIdea = async (objParams) => {
    let = { intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada.");
    }

    let dao = new classInterfaceEmpresario();

    let query = { intIdIdea };

    let result = await dao.getEmpresarioByIdea(query);

    return result;
};
module.exports = getEmpresarioByIdea;