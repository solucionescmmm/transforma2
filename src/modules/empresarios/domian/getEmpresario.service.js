//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresario = async (objParams) => {
    let {
        intId, 
        strNombres, 
        strApellidos, 
        strNroDocto, 
        strCorreoElectronico
     } = objParams;

    if (!objParams) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceDAOEmpresarios();

    let query = {
        intId: intId || null,
        strNombres: strNombres || null,
        strApellidos: strApellidos || null,
        strNroDocto: strNroDocto || null,
        strCorreoElectronico: strCorreoElectronico || null,
    };

    let result = await dao.getEmpresario(query);

    

    return result;
};
module.exports = getEmpresario;
