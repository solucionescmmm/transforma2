//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

const getTipoDiagnosticos = async (objParams, strDataUser) => {
    let = { intId, strNombre } = objParams;

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let dao = new classInterfaceDiagnosticos();

    let query = {
        intId: intId || null,
        strNombre: strNombre || null,
    };

    let result = await dao.getTipoDiagnosticos(query);

    return result;
};
module.exports = getTipoDiagnosticos;