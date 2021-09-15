//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getCategoriaEmpresario = async (data) => {

    if (!data) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    const dao = new classInterfaceDAOEmpresarios();

    let result = dao.getCategoriaEmpresario(data);
    
    return result;
};
module.exports = getCategoriaEmpresario;
