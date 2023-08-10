//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

//services
const serviceGetAreas = require("../../Servicios/Maestros/Areas/domain/getAreas.service")
const serviceGetServicio = require("../../Servicios/Modulo/Servicio/domain/getServicios.service")

const getEventos = async (objParams, strDataUser) => {
    let { intId } = objParams;

    intId = Number(intId)

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

    let arrayData = await dao.getEventos(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data

            for (let i = 0; i < array.length; i++) {
                let arrAreasEventos = array[i]?.arrAreasEventos;

                let arrAreas = []

                for (let j = 0; j < arrAreasEventos.length; j++) {
                    let intIdArea = arrAreasEventos[j]?.intIdArea

                    const getAreas = await serviceGetAreas({ intId: intIdArea }, strDataUser)

                    if (getAreas.error) {
                        throw new Error(getAreas.msg)
                        
                    }

                    arrAreas.push({
                        ...getAreas.data[0]
                    })
                }

                array[i] = {
                    ...array[i],
                    arrAreas,
                    arrInvolucrados: JSON.parse(array[i]?.strInvolucrados),
                    strResponsable: JSON.parse(array[i]?.strResponsable),
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
module.exports = getEventos;