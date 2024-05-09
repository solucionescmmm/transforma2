//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceDAOEventos = require("../infra/conectors/interfaceDAOEventos");

//services
const serviceGetEmpresarios = require("../../Empresarios/domian/getEmpresarioBasica.service")
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
    const arrDataAsistencia = await dao.getAsistentesSesionesEventos(query)

    if (!arrData.error && arrData.data) {
        if (arrData.data.length > 0) {
            if (!intIdSesion) {
                let array = arrData.data
                let data = []

                for (let i = 0; i < array.length; i++) {
                    if (array[i]?.intIdEmpresario) {
                        objDataEmpresario = arrDataEmpresario.find((data) => data.intId === array[i]?.intIdEmpresario)
                        data.push({
                            ...array[i],
                            strTipoPersona: "Empresaria",
                            strTarifaServicio: `${array[i]?.strTarifaServicio?.trim()} - Valor: ${array[i]?.ValorMatricula}`,
                            objDataAsistente:{
                                ...objDataEmpresario,
                                strCorreoElectronico: objDataEmpresario.strCorreoElectronico1 || objDataEmpresario.strCorreoElectronico2
                            }
                        })
                    }

                    if (array[i]?.intIdTercero) {
                        data.push({
                            ...array[i],
                            strTipoPersona: "Tercero",
                            strTarifaServicio: `${array[i]?.strTarifaServicio?.trim()} - Valor: ${array[i]?.ValorMatricula}`,
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
                
                let array = arrData.data
                let data = []

                for (let i = 0; i < array.length; i++) {
                    let btAsistio = arrDataAsistencia?.data?.find((data) => data.intIdAsistenteEvento === array[i]?.intId)

                    if (array[i]?.intIdEmpresario) {
                        let objDataAsistente = arrDataEmpresario.find((data) => data.intId === array[i]?.intIdEmpresario)
                        data.push({
                            intId: array[i].intId,
                            strTipoDocto: objDataAsistente?.strTipoDocto,
                            strNroDocto: objDataAsistente?.strNroDocto,
                            strCorreoElectronico: objDataAsistente?.strCorreoElectronico1 || objDataAsistente?.strCorreoElectronico2,
                            strTipoPersona: "Empresaria",
                            strNombre: `${objDataAsistente.strNombres.trim()} ${objDataAsistente.strApellidos.trim()}`,
                            btAsistio: btAsistio ? true : false,
                        })
                    }

                    if (array[i]?.intIdTercero) {
                        let objDataAsistente = arrDataTerceros.find((data) => data.intId === array[i]?.intIdTercero)
                        data.push({
                            intId: array[i].intId,
                            strTipoDocto: objDataAsistente?.strTipoDocto,
                            strNroDocto: objDataAsistente?.strNroDocto,
                            strCorreoElectronico: objDataAsistente?.strCorreoElectronico,
                            strTipoPersona: "Tercero",
                            strNombre: `${objDataAsistente.strNombres.trim()} ${objDataAsistente.strApellidos.trim()}`,
                            btAsistio: btAsistio ? true : false,
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