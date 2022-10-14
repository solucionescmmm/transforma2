//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDiagnosticos = require("../infra/conectors/interfaseDAODiagnosticos");

const getDiagnosticos = async (objParams, strDataUser) => {
    let = { intId, intIdIdea } = objParams;

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada.");
    }

    let dao = new classInterfaceDiagnosticos();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea || null,
    };

    let result = await dao.getDiagnosticos(query);

    return result;
};
module.exports = getDiagnosticos;
