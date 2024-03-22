//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceTercero = require("../infra/conectors/interfaceDAOTercero");

const getTercero = async (objParams) => {
    let = { intId, strDocumento, strNombres, strApellidos, btActivo } = objParams;

    let dao = new classInterfaceTercero();

    let query = {
        intId: intId || null,
        strDocumento: strDocumento || null,
        strNombres: strNombres || null,
        strApellidos: strApellidos || null,
        btActivo: btActivo || null,
    };

    let arrayData = await dao.getTercero(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data?.reverse();

            for (let i = 0; i < array.length; i++) {
                array[i] = {
                    ...array[i],
                    arrPais: JSON.parse(array[i]?.strPais || null),
                    arrDepartamento: JSON.parse(
                        array[i]?.strDepartamento || null
                    ),
                    arrCiudad: JSON.parse(array[i]?.strCiudad || null),
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
module.exports = getTercero;
