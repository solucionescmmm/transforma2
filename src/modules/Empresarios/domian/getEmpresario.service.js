//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEmpresarios = require("../infra/conectors/interfaceDAOEmpresarios");

//Servicios
const serviceGetTercero = require("../../Terceros/domain/getTercero.service");

const getEmpresario = async (objParams, strDataUser) => {
    let { intId, strDocumento } = objParams;

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

    let query = {
        intId: intId || null,
        strDocumento: strDocumento || null,
    };

    let arrayData = await dao.getEmpresario(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data;

            for (let i = 0; i < array.length; i++) {
                array[i] = {
                    ...array[i],
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

    let arrayDataTercero = await serviceGetTercero(objParams, strDataUser);

    if (!arrayDataTercero.error && arrayDataTercero.data) {
        let array = arrayDataTercero.data;

        let result = {
            error: false,
            data: array,
        };

        return result;
    }

    return arrayData;
};
module.exports = getEmpresario;
