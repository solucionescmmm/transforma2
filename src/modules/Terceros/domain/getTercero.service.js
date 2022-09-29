//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceTercero = require("../infra/conectors/interfaceDAOTercero");

const getTercero = async (objParams) => {
    let = { intId, strDocumento } = objParams;

    let dao = new classInterfaceTercero();

    let query = {
        intId: intId || null,
        strDocumento: strDocumento || null,
    };

    let arrayData = await dao.getTercero(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data

            for (let i = 0; i < array.length; i++) {
                array[i] = {
                    ...array[i],
                    arrDepartamento:JSON.parse(array[i]?.strDepartamento||null),
                    arrCiudad:JSON.parse(array[i]?.strCiudad||null),
                }
            }
            let result = {
                error: false,
                data : array,
            };

            return result;
        }
    }
    
    return arrayData;
};
module.exports = getTercero;
