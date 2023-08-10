//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

//services
const serviceGetAreas = require("../../Servicios/Maestros/Areas/domain/getAreas.service")
const serviceGetServicio = require("../../Servicios/Modulo/Servicio/domain/getServicios.service")

const getSesionesEventos = async (objParams, strDataUser) => {
    let { intId } = objParams;

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

    let query = {
        intId: intId
    };

    let arrayData = await dao.getSesionesEventos(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data

            let result = {
                error: false,
                data: array,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getSesionesEventos;