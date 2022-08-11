//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresario = async (objParams, strDataUser) => {
    let { intId } = objParams;

    if (!objParams) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let dao = new classInterfaceDAOEmpresarios();

    let query = {
        intId: intId || null,
    };

    let data = await dao.getEmpresario(query)

    return data;
};
module.exports = getEmpresario;
