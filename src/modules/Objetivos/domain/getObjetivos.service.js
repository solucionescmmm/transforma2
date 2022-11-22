//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceObjetivos = require("../infra/conectors/interfaseDAOObjetivos");

const getObjetivos = async (objParams, strDataUser) => {
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

    let dao = new classInterfaceObjetivos();

    let query = {
        intId: intId || null,
    };

    let result = await dao.getObjetivos(query);

    return result;
};
module.exports = getObjetivos;
