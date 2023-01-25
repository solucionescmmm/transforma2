//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

const getTipoActividad = async (objParams, strDataUser) => {
    let = { intId } = objParams;

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let dao = new classInterfaceAcompañamientos();

    let query = {
        intId: intId || null,
    };

    let result = await dao.getTipoActividad(query);

    return result;
};
module.exports = getTipoActividad;