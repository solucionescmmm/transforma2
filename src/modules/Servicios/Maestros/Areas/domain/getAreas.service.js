//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceAreas = require("../infra/conectors/interfaseDAOAreas");

const getAreas = async (objParams, strDataUser) => {
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

    let dao = new classInterfaceAreas();

    let query = {
        intId: intId || null,
    };

    let result = await dao.getAreas(query);

    return result;
};
module.exports = getAreas;
