//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

//services
const serviceGetEmpresarios = require("../../Empresarios/domian/getEmpresario.service")
const serviceGetTerceros = require("../../Terceros/domain/getTercero.service")

const getAsistentesSesionesEventos = async (objParams, strDataUser) => {
    let { intIdSesion, intIdAsistenteEvento } = objParams;

    if(!intIdSesion){
        throw new Error("Se esperaban paramentros de entrada")
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

    let queryGetEmpresario = await serviceGetEmpresarios({},strDataUser)

    if (queryGetEmpresario.error) {
        throw new Error(queryGetEmpresario.msg)
    }

    let queryGetTerceros = await serviceGetTerceros({},strDataUser)

    if (queryGetTerceros.error) {
        throw new Error(queryGetTerceros.msg)
    }

    const arrDataEmpresario = queryGetEmpresario?.data
    const arrDataTerceros = queryGetTerceros?.data

    let dao = new classInterfaceDAOEventos();

    let query = {
        intIdSesion: intIdSesion,
        intIdAsistenteEvento: intIdAsistenteEvento || null
    };

    let arrayData = await dao.getAsistentesSesionesEventos(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data.length > 0) {
            let array = arrayData.data
             let data = []

            for (let i = 0; i < array.length; i++) {
                if (array[i]?.intIdEmpresario) {
                    data.push({
                        ...array[i],
                        strTipoPersona:"Empresaria",
                        objDataAsistente:arrDataEmpresario.find((data)=> data.intId === array[i]?.intIdEmpresario),
                    })
                }

                if (array[i]?.intIdTercero) {
                    data.push({
                        ...array[i],
                        strTipoPersona:"Tercero",
                        objDataAsistente:arrDataTerceros.find((data)=> data.intId === array[i]?.intIdTercero),
                    })
                }
            }

            let result = {
                error: false,
                data: arrayData.data,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getAsistentesSesionesEventos;