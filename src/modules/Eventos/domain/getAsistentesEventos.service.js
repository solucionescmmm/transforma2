//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

//services
const serviceGetEmpresarios = require("../../Empresarios/domian/getEmpresario.service")
const serviceGetTerceros = require("../../Terceros/domain/getTercero.service")

const getAsistentesEventos = async (objParams, strDataUser) => {
    let { intId, intIdEvento, intIdSesion } = objParams;

    if (!intIdEvento) {
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

    let queryGetEmpresario = await serviceGetEmpresarios({}, strDataUser)

    if (queryGetEmpresario.error) {
        throw new Error(queryGetEmpresario.msg)
    }

    let queryGetTerceros = await serviceGetTerceros({}, strDataUser)

    if (queryGetTerceros.error) {
        throw new Error(queryGetTerceros.msg)
    }

    const arrDataEmpresario = queryGetEmpresario?.data
    const arrDataTerceros = queryGetTerceros?.data

    let dao = new classInterfaceDAOEventos();

    let query = {
        intId: intId,
        intIdEvento: intIdEvento,
        intIdSesion: intIdSesion,
    };

    let arrData = await dao.getAsistentesEventos(query);

    if (!arrData.error && arrData.data) {
        if (arrData.data.length > 0) {
            if (!intIdSesion) {
                let array = arrData.data
                let data = []

                for (let i = 0; i < array.length; i++) {
                    if (array[i]?.intIdEmpresario) {
                        data.push({
                            ...array[i],
                            strTipoPersona: "Empresaria",
                            objDataAsistente: arrDataEmpresario.find((data) => data.intId === array[i]?.intIdEmpresario),
                        })
                    }

                    if (array[i]?.intIdTercero) {
                        data.push({
                            ...array[i],
                            strTipoPersona: "Tercero",
                            objDataAsistente: arrDataTerceros.find((data) => data.intId === array[i]?.intIdTercero),
                        })
                    }
                }

                let result = {
                    error: false,
                    data: data,
                };

                return result;
            } else {
                let arrDataAsistencia = await dao.getAsistentesSesionesEventos(query)
                let array = arrData.data
                let data = []

                for (let i = 0; i < array.length; i++) {
                    let btAsistio = arrDataAsistencia?.data?.find((data) => data.intIdAsistenteEvento === array[i]?.intId)

                    if (array[i]?.intIdEmpresario) {
                        let objDataAsistente = arrDataEmpresario.find((data) => data.intId === array[i]?.intIdEmpresario)
                        data.push({
                            //...array[i],
                            intId: array[i].intId,
                            strTipoPersona: "Empresaria",
                            btAsistio: btAsistio ? true : false,
                            strNombre: `${objDataAsistente.strNombres.trim()} ${objDataAsistente.strApellidos.trim()}`
                        })
                    }

                    if (array[i]?.intIdTercero) {
                        let objDataAsistente = arrDataTerceros.find((data) => data.intId === array[i]?.intIdTercero)
                        data.push({
                            //...array[i],
                            intId: array[i].intId,
                            strTipoPersona: "Tercero",
                            btAsistio: btAsistio ? true : false,
                            strNombre: `${objDataAsistente.strNombres.trim()} ${objDataAsistente.strApellidos.trim()}`
                        })
                    }
                }

                let result = {
                    error: false,
                    data: data,
                };

                return result;

            }
        }
    }

    return arrData;
};
module.exports = getAsistentesEventos;