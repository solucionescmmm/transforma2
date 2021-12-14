//Class
const classInterfaceDAOUsuarios = require("../Infra/conectors/interfaceDAOUsuarios");

const getUsuarios = async(data) => {
    let dao = new classInterfaceDAOUsuarios();
    let result = await dao.getUsuarios(data);
    return result;
};
module.exports = getUsuarios;