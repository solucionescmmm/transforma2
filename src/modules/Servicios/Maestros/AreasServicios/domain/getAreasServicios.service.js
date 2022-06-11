//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceAreasServicios = require("../infra/conectors/interfaseDAOAreasServicios");

const getAreasServicios = async (objParams, strDataUser) => {
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

    let dao = new classInterfaceAreasServicios();

    let query = {
        intId: intId || null,
    };

    let result = await dao.getAreasServicios(query);

    return result;
};
module.exports = getAreasServicios;
