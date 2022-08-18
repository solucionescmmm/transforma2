//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceComentarios = require("../infra/conectors/interfaceDaoComentarios");

const  getComentario = async (objParams, strDataUser) => {
    let = { intId, intIdEmpresario } = objParams;

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

    let dao = new classInterfaceComentarios();

    let query = {
        intId: intId || null,
        intIdEmpresario: intIdEmpresario || null,
    };

    let result = await dao.getComentario(query);

    return result;
};
module.exports = getComentario;
