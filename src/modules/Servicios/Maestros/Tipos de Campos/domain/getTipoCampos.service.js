//Interface
const classInterfaceTipoCampos = require("../infra/conectors/interfaceDAOTipoCampos");

const getTipoCampos = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfaceTipoCampos();

    let query = { intId: intId || null };

    let result = await dao.getTipoCampos(query);

    return result;
};
module.exports = getTipoCampos;
