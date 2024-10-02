//Librerias
const validator = require("validator").default;

//Clases
const classInterfaceTareas = require("../infra/conectors/interfaceDaoTareas");

const getEstadoTarea = async (objParams) => {
    let = { intId } = objParams;

    let dao = new classInterfaceTareas();

    let query = {
        intId: intId || null,
    };

    let arrayData = await dao.getEstadoTarea(query);


    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data
            let data = [];

            for (let i = 0; i < array.length; i++) {
                data[i] = {
                    ...array[i],
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
module.exports = getEstadoTarea;
