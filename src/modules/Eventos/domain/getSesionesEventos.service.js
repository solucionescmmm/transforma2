//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

//services
const serviceGetAreas = require("../../Servicios/Maestros/Areas/domain/getAreas.service")
const serviceGetServicio = require("../../Servicios/Modulo/Servicio/domain/getServicios.service")

const getSesionesEventos = async (objParams, strDataUser) => {
    let { intId, intIdEvento } = objParams;

    if(!intIdEvento){
        throw new Error("Se esperaban paramentros de entrada")
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

    let dao = new classInterfaceDAOEventos();

    let query = {
        intId: intId,
        intIdEvento:intIdEvento
    };

    let arrayData = await dao.getSesionesEventos(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data.reverse()

            for (let i = 0; i < array.length; i++) {
                const getAreas = await serviceGetAreas({
                    intId: array[i]?.intAreaResponsable
                }, strDataUser)

                if (getAreas.error) {
                    throw new Error(getAreas.msg)
                }

                array[i] = {
                    ...array[i],
                    strArea:getAreas.data[0],
                    strResponsables: JSON.parse(array[i]?.strResponsables),
                };
            }

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