//Class
const classInterfaceDAOUsuarios = require("../Infra/conectors/interfaceDAOUsuarios");

const getUsuarios = async(data) => {
    
    if (!data.strApp) {
        throw new Error("Se esperaban parametros de entrada")
    }

    let dao = new classInterfaceDAOUsuarios();
    let result = await dao.getUsuarios(data);
    return result;
};
module.exports = getUsuarios;