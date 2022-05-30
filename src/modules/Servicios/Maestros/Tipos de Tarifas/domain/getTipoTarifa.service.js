//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceTipoTarifa = require("../infra/conectors/interfaceDAOTipoTarifa");

const getTipoTarifa = async (objParams, strDataUser) => {
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

    let dao = new classInterfaceTipoTarifa();

    let query = {
        intId: intId || null,
    };

    let result = await dao.getTipoTarifa(query);

    return result;
};
module.exports = getTipoTarifa;