//Interface
const classInterfaceEstados = require("../infra/conectors/interfaceDAOEstados");

const getEstados = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfaceEstados();

    let query = { intId: intId || null };

    let result = await dao.getEstados(query);

    return result;
};
module.exports = getEstados;
