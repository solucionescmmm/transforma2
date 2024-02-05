//Librerias
const validator = require("validator").default;

//Interface
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

//service
const serviceGetValorTarifa = require("../../Servicios/Maestros/Tipos de Tarifa por Sede/domain/getSedeTipoTarifaServicioBySedeServicio.service")

const getTarifasEvento = async (objParams, strDataUser) => {
    let { intIdEvento } = objParams;

    if (!intIdEvento) {
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

    const dao = new classInterfaceDAOEventos();

    const queryGetEventos = await dao.getEventos({ intId: intIdEvento });

    if (queryGetEventos.error) {
        throw new Error(queryGetEventos.msg);
    }

    const objEvento = queryGetEventos.data[0]

    let query = {
        intIdSede: objEvento?.intIdSede,
        intIdServicio: objEvento?.intIdServicio,
    };

    let result = await serviceGetValorTarifa(query,strDataUser);

    if (result.error) {
        throw new Error(result.msg)
    }

    return result;
};
module.exports = getTarifasEvento;