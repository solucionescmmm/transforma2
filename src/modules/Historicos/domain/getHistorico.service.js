//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOHistoricos = require("../infra/conectors/interfaceDAOHistoricos");

const getHistorico = async (objParams, strDataUser) => {
    let { intIdIdea } = objParams;

    if (!intIdIdea) {
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

    let dao = new classInterfaceDAOHistoricos();

    let query = {
        intIdIdea: intIdIdea
    };

    let arrayData = await dao.getHistorico(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data
            let arrNumeroEmpleados =[]
            let arrValorVentas = []
            let arrEtapaDllo =[]
            let data ={}

            for (let i = 0; i < array.length; i++) {
                arrNumeroEmpleados.push({
                    intNumeroEmpleados: array[i]?.intNumeroEmpleados,
                    dtmCreacion:array[i]?.dtmCreacion
                })

                arrValorVentas.push({
                    ValorVentas: array[i]?.ValorVentas,
                    dtmCreacion:array[i]?.dtmCreacion
                })

                arrEtapaDllo.push({
                    intEtapaDlloFecha: array[i]?.intEtapaDlloFecha,
                    intIdPuntaje: array[i]?.intPuntaje,
                    strClasificacionFecha:array[i]?.strClasificacionFecha,
                    dtmCreacion:array[i]?.dtmCreacion
                })
            }
            data = {
                arrNumeroEmpleados,
                arrValorVentas,
                arrEtapaDllo
            }

            let result = {
                error: false,
                data,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getHistorico;