//Interface
const classInterfaceEstados = require("../infra/conectors/interfaceDAOEventos");

const getProximosEventos = async (objParams) => {
    let = {  } = objParams;

    let dao = new classInterfaceEstados();

    let arrayData = await dao.getProximosEventos();

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data

            for (let i = 0; i < array.length; i++) {

                array[i] = {
                    ...array[i],
                    Responsable: JSON.parse(array[i]?.Responsable),
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
module.exports = getProximosEventos;