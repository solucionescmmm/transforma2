//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

const getIdEstadoDiagnosticos = async (objParams, strDataUser) => {
    let = { strNombre } = objParams;

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }
    if (!strNombre) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceDiagnosticos();

    let query = {
        strNombre: strNombre || null,
    };

    let result = await dao.getIdEstadoDiagnosticos(query);

    return result;
};
module.exports = getIdEstadoDiagnosticos;