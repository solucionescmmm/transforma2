//Librerias
const validator = require("validator").default;

//Interface
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

const getTipoEventos = async (objParams, strDataUser) => {
    let { strNombre } = objParams;

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let dao = new classInterfaceDAOEventos();

    let query = { strNombre };

    let result = await dao.getTiposEventos(query);

    return result;
};
module.exports = getTipoEventos;