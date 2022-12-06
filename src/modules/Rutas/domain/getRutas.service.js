//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceRutas = require("../infra/conectors/interfaseDAORutas");

const getRutas = async (objParams, strDataUser) => {
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
        throw new Error("Se esperaban parametros de entrada")
    }

    let dao = new classInterfaceRutas();

    let query = {
        intId: intId || null,
        intIdIdea : intIdIdea,
    };

    let result = await dao.getRutas(query);

    return result;
};
module.exports = getRutas;
