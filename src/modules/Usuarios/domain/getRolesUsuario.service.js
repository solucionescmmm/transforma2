//Class
const classInterfaceDAOUsuarios = require("../infra/conectors/interfaceDAOUsuarios");

const getRolesUsuario = async(objParams) => {
const {strApp, strEmail} = objParams
    
    if (!strApp && !strEmail) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceDAOUsuarios();

    const query={
        strApp,
        strEmail
    }

    let result = await dao.getRolesUsuario(query);

    return result;
};
module.exports = getRolesUsuario;