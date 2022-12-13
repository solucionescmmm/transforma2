//class
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Librerias
const validator = require("validator").default;
const apiCache = require("apicache-plus");

//Servicios
const serviceGetIdEstado = require("./getIdEstadoRutas.service");

class setRutas {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdRuta;
    #intIdFase;
    #intIdEstado;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        console.log(this.#objData.arrInfoFases);
       await this.#deleteCache();
       await this.#validations();
       await this.#getIdEstado();
       await this.#setRutas();
       await this.#setFases();
       return this.#objResult;
    }

    async #deleteCache() {
        await apiCache.clear();
    }

    async #validations() {
        if (
            !validator.isEmail(this.#objUser.strEmail, {
                domain_specific_validation: "cmmmedellin.org",
            })
        ) {
            throw new Error(
                "El campo de Usuario contiene un formato no valido, debe ser de tipo email y pertenecer al domino cmmmedellin.org."
            );
        }
        if (!this.#objData) {
            throw new Error("Se esperaban parámetros de entrada.");
        }
    }

    async #getIdEstado() {
        let queryGetIdEstado = await serviceGetIdEstado({
            strNombre: "En borrador",
        });

        if (queryGetIdEstado.error) {
            throw new Error(queryGetIdEstado.msg);
        }

        this.#intIdEstado = queryGetIdEstado.data.intId;
    }

    async #setRutas() {
        let dao = new classInterfaceDAORutas();
        let objDataRuta = this.#objData.objInfoPrincipal;
        let newData = {
            ...objDataRuta,
            intIdEstadoRuta: this.#intIdEstado,
            strResponsable: JSON.stringify(objDataRuta.strResponsable || null),
            strUsuarioCreacion: this.#objUser.strEmail,
        };

        let query = await dao.setRutas(newData);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdRuta = query.data.intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setFases() {
        let dao = new classInterfaceDAORutas();
        let arrayFases = this.#objData.arrInfoFases;

        if (arrayFases.length <= 0) {
            throw new Error("El array de las fases esta vacio.");
        }

        for (let i = 0; i < arrayFases.length; i++) {
            if (arrayFases[i].objTarifa) {
                let objDataFase = arrayFases[i];

                let query = await dao.setFases({
                    intIdRuta: this.#intIdRuta,
                    strNombre: `Fase # ${i + 1}`,
                    intIdDiagnostico: objDataFase.intIdDiagnostico,
                    intIdEstadoFase: this.#intIdEstado,
                    intIdReferenciaTipoTarifa: objDataFase.objTarifa.intId,
                    valorReferenciaTotalFase: objDataFase.dblValorRef,
                    valorTotalFase: objDataFase.dblValorFase,
                    strResponsable: JSON.stringify(
                        objDataFase.strResponsable || null
                    ),
                    strObservaciones: objDataFase.strObservaciones,
                    intIdMotivoCancelacion: objDataFase.intIdMotivoCancelacion,
                    strUsuarioCreacion: this.#objUser.strEmail,
                });

                if (query.error) {
                    throw new Error(query.msg);
                }

                this.#intIdFase = query.data.intId;

                let arrObjetivos = objDataFase.arrObjetivos;

                if (arrObjetivos.length > 0) {
                    for (let j = 0; j < arrObjetivos.length; j++) {
                        let objDataObjetivos = arrObjetivos[j];

                        let query = await dao.setObjetivosFases({
                            intIdObjetivo: objDataObjetivos.intId,
                            intIdFase: this.#intIdFase,
                            btCumplio: null,
                            strObservacionesCumplimiento: "",
                            strUsuarioCreacion: this.#objUser.strEmail,
                        });

                        if (query.error) {
                            throw new Error(query.msg);
                        }
                    }
                }

                let arrPaquetes = objDataFase.arrPaquetes;

                if (arrPaquetes.length > 0) {
                    for (let j = 0; j < arrPaquetes.length; j++) {
                        let objDataPaquete = arrPaquetes[j];

                        let query = await dao.setPaquetesFases({
                            intIdFase: this.#intIdFase,
                            intIdPaquete:
                                objDataPaquete.objPaquete.objInfoPrincipal
                                    .intId,
                            strUsuarioCreacion: this.#objUser.strEmail,
                        });

                        if (query.error) {
                            throw new Error(query.msg);
                        }

                        let intIdPaqueteFase = query.data.intId;

                        let arrObjetivosPaquete = objDataPaquete.arrObjetivos;

                        if (arrObjetivosPaquete?.length > 0) {
                            for (
                                let k = 0;
                                k < arrObjetivosPaquete.length;
                                k++
                            ) {
                                let objDataObjetivoPaquete =
                                    arrObjetivosPaquete[k];

                                let query = await dao.setObjetivosPaquetesFases(
                                    {
                                        intIdObjetivo:
                                            objDataObjetivoPaquete.intId,
                                        intIdPaquetes_Fases: intIdPaqueteFase,
                                        btCumplio: false,
                                        strObservacionesCumplimiento: "",
                                        strUsuarioCreacion:
                                            this.#objUser.strEmail,
                                    }
                                );

                                if (query.error) {
                                    throw new Error(query.msg);
                                }
                            }
                        }
                    }
                }

                let arrServicios = objDataFase.arrServicios;

                if (arrServicios.length > 0) {
                    for (let j = 0; j < arrServicios.length; j++) {
                        let objDataServicio = arrServicios[j];

                        let query = await dao.setServiciosFases({
                            intIdFase: this.#intIdFase,
                            intIdServicio:
                                objDataServicio.objServicio.objInfoPrincipal
                                    .intId,
                            strUsuarioCreacion: this.#objUser.strEmail,
                        });

                        if (query.error) {
                            throw new Error(query.msg);
                        }

                        let intIdServicioFase = query.data.intId;

                        let arrObjetivosServicio = objDataServicio.arrObjetivos;

                        if (arrObjetivosServicio?.length > 0) {
                            for (
                                let k = 0;
                                k < arrObjetivosServicio.length;
                                k++
                            ) {
                                let objDataObjetivoServicio =
                                    arrObjetivosServicio[k];

                                let query =
                                    await dao.setObjetivosServiciosFases({
                                        intIdObjetivo:
                                            objDataObjetivoServicio.intId,
                                        intIdServicios_Fases: intIdServicioFase,
                                        btCumplio: false,
                                        strObservacionesCumplimiento: "",
                                        strUsuarioCreacion:
                                            this.#objUser.strEmail,
                                    });

                                if (query.error) {
                                    throw new Error(query.msg);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
module.exports = setRutas;
