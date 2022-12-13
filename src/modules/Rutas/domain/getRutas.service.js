//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceRutas = require("../infra/conectors/interfaseDAORutas");

//Servicios
const serviceGetPaquete = require("../../Servicios/Modulo/Paquetes/domain/getPaquetes.service");
const serviceGetServicio = require("../../Servicios/Modulo/Servicio/domain/getServicios.service");
const serviceGetTipoTarifa = require("../../Servicios/Maestros/Tipos de Tarifas/domain/getTipoTarifa.service");

const getRutas = async (objParams, strDataUser) => {
    let = { intId, intIdIdea } = objParams;

    if (
        !validator.isEmail(strDataUser.strEmail, {
            domain_specific_validation: "cmmmedellin.org",
        })
    ) {
        throw new Error(
            "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
        );
    }

    if (!intIdIdea) {
        throw new Error("Se esperaban parametros de entrada");
    }

    let dao = new classInterfaceRutas();

    let query = {
        intId: intId || null,
        intIdIdea: intIdIdea,
    };

    let arrayData = await dao.getRutas(query);

    if (!arrayData.error && arrayData.data) {
        if (arrayData.data?.length > 0) {
            let array = arrayData.data;
            let data = [];

            for (let i = 0; i < array.length; i++) {
                let objInfoPrincipal = {};
                let arrInfoFases = [];
                let arrFasesRutas = array[i].arrFasesRutas;

                objInfoPrincipal = {
                    intId: array[i]?.intId,
                    intIdIdea: array[i]?.intIdIdea,
                    strNombre: array[i]?.strNombre,
                    intIdEstadoRuta: array[i]?.intIdEstadoRuta,
                    valorTotalRuta: array[i]?.valorTotalRuta,
                    intIdDoctoPropuesta: array[i]?.intIdDoctoPropuesta,
                    strResponsable: JSON.parse(array[i]?.strResponsables),
                    strObservaciones: array[i]?.strObservaciones,
                    intIdMotivoCancelacion: array[i]?.intIdMotivoCancelacion,
                    dtmCreacion: array[i]?.dtmCreacion,
                    strUsuarioCreacion: array[i]?.strUsuarioCreacion,
                    dtmActualizacion: array[i]?.dtmActualizacion,
                    strUsuarioActualizacion: array[i]?.strUsuarioActualizacion,
                    strEstadoRuta: array[i]?.strEstadoRuta,
                };

                for (let j = 0; j < arrFasesRutas.length; j++) {
                    let objInfoFases = arrFasesRutas[j];

                    let arrPaquetes = [];

                    let arrObjPaquetes = objInfoFases.arrPaquetes;

                    for (let k = 0; k < arrObjPaquetes.length; k++) {
                        let queryGetPaquetes = await serviceGetPaquete(
                            { intId: arrObjPaquetes[k].intIdPaquete },
                            strDataUser
                        );

                        if (queryGetPaquetes.error) {
                            throw new Error(queryGetPaquetes.msg);
                        }

                        arrPaquetes.push({
                            objPaquete: queryGetPaquetes.data[0],
                            arrObjetivos:
                                arrObjPaquetes[k]?.arrFasesObjPaquetes,
                        });
                    }

                    let arrServicios = [];

                    let arrObjServicios = objInfoFases.arrPaquetes;

                    for (let k = 0; k < arrObjServicios.length; k++) {
                        let queryGetServicio = await serviceGetServicio(
                            { intId: arrObjServicios[k].intIdServicio },
                            strDataUser
                        );

                        if (queryGetServicio.error) {
                            throw new Error(queryGetServicio.msg);
                        }

                        arrServicios.push({
                            objServicio: queryGetServicio.data[0],
                            arrObjetivos:
                                arrObjServicios[k]?.arrFasesObjPaquetes,
                        });
                    }

                    let objTarifa = {};

                    let queryGetTarifa = await serviceGetTipoTarifa(
                        { intId: arrFasesRutas[j]?.intIdTarifa },
                        strDataUser
                    );

                    if (queryGetTarifa.error) {
                        throw new Error(queryGetTarifa.msg);
                    }

                    objTarifa = queryGetTarifa?.data[0] || null;

                    arrInfoFases[j] = {
                        ...objInfoFases,
                        arrPaquetes,
                        arrServicios,
                        objTarifa,
                    };
                }

                data[i] = {
                    objInfoPrincipal,
                    arrInfoFases,
                };
            }
            let result = {
                error: false,
                data,
            };

            return result;
        }
    }

    return arrayData;
};
module.exports = getRutas;
