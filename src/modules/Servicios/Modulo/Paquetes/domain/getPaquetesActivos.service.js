//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOPaquetes = require("../infra/conectors/interfaceDAOPaquetes");

const getPaquetesActivos = async (objParams, strDataUser) => {
    let = { strNombreMaestro, intIdMaestro } = objParams;

    if (!intIdMaestro && !strNombreMaestro) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let dao = new classInterfaceDAOPaquetes();

    let query = {
        strNombreMaestro,
        intIdMaestro,
    };

    let result = await dao.getPaquetesActivos(query);

    return result;
};
module.exports = getPaquetesActivos;
