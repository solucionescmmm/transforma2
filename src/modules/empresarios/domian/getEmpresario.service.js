//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresario = async (data) => {
    if (!data) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }
    let dao = new classInterfaceDAOEmpresarios();
    let result = await dao.getEmpresario(data);
    return result;
};
module.exports = getEmpresario;
