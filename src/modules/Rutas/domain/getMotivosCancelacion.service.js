//Librerias
const validator = require("validator").default;

//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getMotivosCancelacion = async (strDataUser) => {
    let dao = new classInterfaceEstados();

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    let result = await dao.getMotivosCancelacion();

    return result;
};
module.exports = getMotivosCancelacion;