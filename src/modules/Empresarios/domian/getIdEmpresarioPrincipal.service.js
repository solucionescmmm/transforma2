//Interface
const classInterfaceEmpresario = require("../infra/conectors/interfaceDAOEmpresarios");

const getIdEmpresarioPrincipal = async (objParams) => {
    let = { intIdIdea, intIdTipoEmpresario } = objParams;

    if (!intIdIdea && !intIdTipoEmpresario) {
        throw new Error("Se esperaban parametros de entrada.");
    }

    let dao = new classInterfaceEmpresario();

    let query = { intIdIdea, intIdTipoEmpresario };

    let result = await dao.getIdEmpresarioPrincipal(query);

    return result;
};
module.exports = getIdEmpresarioPrincipal;
