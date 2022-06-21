//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceSedeTipoTarifaServicio = require("../infra/conectors/interfaceDAOSedeTipoTarifaServicio");

const getSedeTipoTarifaServicio = async (objParams, strDataUser) => {
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

    let dao = new classInterfaceSedeTipoTarifaServicio();

    let query = {
        intId: intId || null,
    };

    let result = await dao.getSedeTipoTarifaServicio(query);

    return result;
};
module.exports = getSedeTipoTarifaServicio;