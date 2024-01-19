//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceSedeTipoTarifaServicio = require("../infra/conectors/interfaceDAOSedeTipoTarifaServicio");

const getSedeTipoTarifaServicioBySedeServicio = async (objParams, strDataUser) => {
    let = { intIdSede, intIdServicio } = objParams;

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
        intIdSede: intIdSede,
        intIdServicio: intIdServicio
    };

    let arrayData = await dao.getSedeTipoTarifaServicioBySedeServicio(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data?.reverse();

            let result = {
                error: false,
                data: array,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getSedeTipoTarifaServicioBySedeServicio;