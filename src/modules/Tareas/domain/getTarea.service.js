//Librerias
const validator = require("validator").default;

const { ar } = require("date-fns/locale");
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
                let { strResponsables } = array[i];

                if (validator.isJSON(strResponsables)) {
                    strResponsable = JSON.parse(strResponsables);
                }
                data[i] = {
                    ...array[i],
                    intIdEstado: array[i]?.intIdEstadoTarea,
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
