//Librerias
const validator = require("validator").default;
//Clases
const classInterfaceRutas = require("../infra/conectors/interfaseDAORutas");

//Servicios
const serviceGetPaquete = require("../../Servicios/Modulo/Paquetes/domain/getPaquetes.service");
const serviceGetServicio = require("../../Servicios/Modulo/Servicio/domain/getServicios.service");

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
            if (!intId) {
                let array = arrayData.data.reverse();
                let data = [];
                
                for (let i = 0; i < array.length; i++) {
                    let objInfoPrincipal = {}
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

                        arrInfoFases[j] = {
                            ...objInfoFases,
                            strResponsable: JSON.parse(
                                objInfoFases?.strResponsable || null
                            ),
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
            if (intId) {

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

                        if (arrObjPaquetes?.length > 0) {
                            for (let k = 0; k < arrObjPaquetes.length; k++) {
                                let queryGetPaquetes = await serviceGetPaquete(
                                    { intId: arrObjPaquetes[k].intIdPaquete },
                                    strDataUser
                                );

                                if (queryGetPaquetes.error) {
                                    throw new Error(queryGetPaquetes.msg);
                                }

                                arrPaquetes.push({
                                    ...arrObjPaquetes[k],
                                    strResponsables: JSON.parse(arrObjPaquetes[k]?.strResponsables || null),
                                    objPaquete: queryGetPaquetes.data[0]
                                });
                            }
                        }

                        let arrServicios = [];

                        let arrObjServicios = objInfoFases.arrServicios;

                        if (arrObjServicios?.length > 0) {
                            for (let k = 0; k < arrObjServicios.length; k++) {
                                let queryGetServicio = await serviceGetServicio(
                                    { intId: arrObjServicios[k].intIdServicio },
                                    strDataUser
                                );

                                if (queryGetServicio.error) {
                                    throw new Error(queryGetServicio.msg);
                                }

                                arrServicios.push({
                                    ...arrObjServicios[k],
                                    arrObjetivos: arrObjServicios[k].intIdPaqueteFase ? arrPaquetes[0]?.arrObjetivos : arrObjServicios[k].arrObjetivos,
                                    strResponsables: JSON.parse(arrObjServicios[k]?.strResponsables || null),
                                    objServicio: queryGetServicio.data[0]
                                });
                            }
                        }

                        arrInfoFases[j] = {
                            ...objInfoFases,
                            strResponsable: JSON.parse(
                                objInfoFases?.strResponsable || null
                            ),
                            arrPaquetes,
                            arrServicios,
                            arrPagos: arrFasesRutas[j].arrPagos
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
    }

    return arrayData;
};

module.exports = getRutas;
