//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceAcompañamientos = require("../infra/conectors/interfaceDaoAcompañamientos");

const sp_setFlujoAcompañamiento = async (objParams, strDataUser) => {
    let = { intIdEmpresario, intIdIdea, intIdEvento, intIdSedeTarifaServicio } = objParams;

    if (
        !intIdIdea &&
        !intIdEvento &&
        !intIdEmpresario &&
        !intIdSedeTarifaServicio
    ) {
        throw new Error("Se esperaban parametros de entrada.");
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

    let dao = new classInterfaceAcompañamientos();

    let query = {
        intIdIdea: intIdIdea,
        intIdEvento: intIdEvento,
        intIdEmpresario: intIdEmpresario,
        intIdSedeTarifaServicio: intIdSedeTarifaServicio,
    };

    let result = await dao.sp_setFlujoAcompañamiento(query);

    return result;
};
module.exports = sp_setFlujoAcompañamiento;
