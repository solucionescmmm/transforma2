//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

const getEmpresarioBasica = async (objParams, strDataUser) => {
    let { } = objParams;

    if (!objParams) {
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

    let dao = new classInterfaceDAOEmpresarios();

    let arrayData = await dao.getEmpresarioBasica();

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data.reverse();

            for (let i = 0; i < array.length; i++) {
                array[i] = {
                    ...array[i],
                    strNombreCompleto: `${array[i]?.strNombres?.trim()} ${array[i]?.strApellidos?.trim()}`,
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
module.exports = getEmpresarioBasica;