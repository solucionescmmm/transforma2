//Interface
const classInterfaceEstados = require("../infra/conectors/interfaseDAORutas");

const getRutasActivas = async (objParams) => {
    let = { intIdIdea } = objParams;

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada.")
    }

    let dao = new classInterfaceEstados();

    let query = { intIdIdea };

    let arrayData = await dao.getRutasActivas(query);

    if (arrayData.data.length > 0) {

        let result = {
            error: false,
            data: true,
        };

        return result;
    } else {
        let result = {
            error: false,
            data: false,
        };

        return result;
    }
};
module.exports = getRutasActivas;