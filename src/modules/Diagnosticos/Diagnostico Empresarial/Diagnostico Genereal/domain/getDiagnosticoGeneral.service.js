//Class
const classInterfaceDAODiagnostico = require("../Infra/conectors/interfaseDAODiagnosticoGeneral");
const validator = require("validator").default;

const getDiagnosticoGeneral = async(objParams, strDataUser) => {
    let {
        intId,
        intIdEmpresario,
    } = objParams;
    
    if (!intId && !intIdEmpresario ) {
        throw new Error("Se esperaban parámetros de búsqueda.");
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

    let dao = new classInterfaceDAODiagnostico();
    let query ={
        intId,
        intIdEmpresario
    }
    let result = await dao.getDiagnosticoGeneral(query);

    return result;
};
module.exports = getDiagnosticoGeneral;