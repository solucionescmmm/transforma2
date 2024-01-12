//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceTareas = require("../infra/conectors/interfaceDaoTareas");

const getTarea = async (objParams) => {
    let = { intId, intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parámetros de búsqueda.");
    }

    let dao = new classInterfaceTareas();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea || null,
    };

    let arrayData = await dao.getTarea(query);
    

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data?.reverse();
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let { strResponsable } = array[i];

                if (validator.isJSON(strResponsable)) {
                    strResponsable = JSON.parse(strResponsable);
                }
                data[i] = {
                    ...array[i],
                    strResponsable,
                };

                
            }
            let result = {
                error: false,
                data
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getTarea;
