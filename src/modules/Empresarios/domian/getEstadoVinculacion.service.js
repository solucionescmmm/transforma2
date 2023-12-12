//Interface
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getEstadoVinculacion = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfaceDAOEmpresarios();

    let query = { intId: intId || null };

    let result = await dao.getEstadoVinculacion(query);

    return result;
};
module.exports = getEstadoVinculacion;