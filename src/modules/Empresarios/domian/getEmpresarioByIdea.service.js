//Interface
const classInterfaceEmpresario = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresarioByIdea = async (objParams) => {
    let = { intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada.");
    }

    let dao = new classInterfaceEmpresario();

    let query = { intIdIdea };

    let arrayData = await dao.getEmpresarioByIdea(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;

            for (let i = 0; i < array.length; i++) {
                array[i] = {
                    ...array[i],
                    objEmpresario:[{
                        ...array[i]?.objEmpresario[0],
                        intIdTipoEmpresario:array[i]?.intIdTipoEmpresario
                    }]
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
module.exports = getEmpresarioByIdea;