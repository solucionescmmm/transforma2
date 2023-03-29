//class
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Librerias
const validator = require("validator").default;

//Funciones
const servicioRepetido = require("../app/functions/servicioRepetido")

//Servicios
const serviceGetIdEstado = require("./getIdEstadoRutas.service");
const serviceGetIdTipo = require("./getIdTipoRutas.service");
const getContadorRutas = require("./getContadorRutas.service")

class setRutas {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdRuta;
    #intIdFase;
    #intIdEstado;
    #intIdTipoRuta;
    #intNumRutas;

    /**
     * @param {object} data
     * @param {object} strDataUser
     */
    constructor(data, strDataUser) {
        this.#objData = data;
        this.#objUser = strDataUser;
    }

    async main() {
        await this.#getCountRutas();
        await this.#getTipoRuta();
        await this.#validations();
        await this.#getIdEstado();
        await this.#setRutas();
        await this.#setFases();
        return this.#objResult;
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

        let arrayFases = this.#objData.arrInfoFases

        if (arrayFases.length <= 0) {
            throw new Error("El array de las fases esta vacío.");
        }

        for (let i = 0; i < arrayFases.length; i++) {
            if (arrayFases[i].arrObjetivos.length <= 0) {
                throw new Error(`El array de los objetivos esta vacío en la fase #${i + 1}`);
            }

            if (arrayFases[i].arrPaquetes.length <= 0 && arrayFases[i].arrServicios.length <= 0) {
                throw new Error(`Por favor eliga un paquete o servicio en la fase #${i + 1}`);
            }

            servicioRepetido(arrayFases[i], i)

            let arrPorcentajes = arrayFases[i].arrPorcentajes

            if (arrPorcentajes.length <= 0) {
                throw new Error(`El array de los porcentajes esta vacío en la fase #${i + 1}`);
            }

            let intPorcentaje = 0
            let intTotalValor = 0
            
            for (let j = 0; j < arrPorcentajes.length; j++) {
                intPorcentaje = intPorcentaje + arrPorcentajes[j].intPorcentaje,
                intTotalValor = intTotalValor + arrPorcentajes[j].valorPorce
            }
            
            if (intPorcentaje !== 100 && intTotalValor !== arrayFases[i].dblValorFase) {
                throw new Error(`Los valores de los pagos no correctos por favor revisalos en la fase #${i + 1}`);
            }

        }
    }

    async #getCountRutas() {
        let queryGetCountRutas = await getContadorRutas({
            intIdIdea: this.#objData.objInfoPrincipal.intIdIdea,
        });

        if (queryGetCountRutas.error) {
            throw new Error(queryGetCountRutas.msg);
        }

        this.#intNumRutas = queryGetCountRutas.data.length;
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

    async #getTipoRuta() {
        let queryGetIdTipo = await serviceGetIdTipo({
            strNombre: "Planeada",
        });

        if (queryGetIdTipo.error) {
            throw new Error(queryGetIdTipo.msg);
        }

        this.#intIdTipoRuta = queryGetIdTipo.data.intId;
    }

    async #setRutas() {
        let dao = new classInterfaceDAORutas();
        let objDataRuta = this.#objData.objInfoPrincipal;
        let newData = {
            ...objDataRuta,
            strNombre: `Ruta #${this.#intNumRutas + 1}`,
            intIdTipoRuta: this.#intIdTipoRuta,
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

        for (let i = 0; i < arrayFases.length; i++) {
            let objDataFase = arrayFases[i];

            let query = await dao.setFases({
                intIdRuta: this.#intIdRuta,
                strNombre: `Fase # ${i + 1}`,
                intIdDiagnostico: objDataFase.intIdDiagnostico,
                intIdEstadoFase: this.#intIdEstado,
                valorReferenciaTotalFase: objDataFase.dblValorRef,
                valorTotalFase: objDataFase.dblValorFase,
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
                        intIdPaquete: objDataPaquete.objPaquete.objInfoPrincipal.intId,
                        intIdSedeTipoTarifaPaqRef: objDataPaquete.objSedeTarifa.intId,
                        ValorReferenciaPaquete: objDataPaquete.objSedeTarifa.dblValor,
                        ValorTotalPaquete:objDataPaquete.valor,
                        intDuracionHorasReferenciaPaquete: objDataPaquete.objPaquete.objInfoPrincipal.intDuracionHoras || null,
                        intDuracionHorasTotalPaquete: objDataPaquete.intDuracionHoras || null,
                        strResponsables: JSON.stringify(objDataPaquete.strResponsable || null),
                        btFinalizado: false,
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        throw new Error(query.msg);
                    }

                    let intIdPaqueteFase = query.data.intId;

                    let arrServicios = objDataPaquete.objPaquete.objInfoPrincipal.arrServicios

                    if (arrServicios.length) {
                        for (let k = 0; k < arrServicios.length; k++) {
                            let objDataServicio = arrServicios[k];

                            let query = await dao.setServiciosFases({
                                intIdFase: this.#intIdFase,
                                intIdServicio: objDataServicio.objInfoPrincipal.intId,
                                intIdPaqueteFase: intIdPaqueteFase,
                                intIdSedeTipoTarifaServRef: null,
                                ValorReferenciaServicio: 0,
                                ValorTotalServicio: 0,
                                intDuracionHorasReferenciaServicio: null,
                                intDuracionHorasTotalServicio: null,
                                strResponsables: JSON.stringify(objDataPaquete.strResponsable || null),
                                btFinalizado: false,
                                strUsuarioCreacion: this.#objUser.strEmail,
                            });

                            if (query.error) {
                                throw new Error(query.msg);
                            }
                        }
                    }

                    let arrObjetivosPaquete = objDataPaquete.arrObjetivos;

                    if (arrObjetivosPaquete?.length > 0) {
                        for (let k = 0; k < arrObjetivosPaquete.length; k++) {
                            let objDataObjetivoPaquete = arrObjetivosPaquete[k];

                            let query = await dao.setObjetivosPaquetesFases({
                                intIdObjetivo: objDataObjetivoPaquete.intId,
                                intIdPaquetes_Fases: intIdPaqueteFase,
                                btCumplio: false,
                                strObservacionesCumplimiento: "",
                                strUsuarioCreacion: this.#objUser.strEmail,
                            });

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
                        intIdServicio: objDataServicio.objServicio.objInfoPrincipal.intId,
                        intIdPaqueteFase: null,
                        intIdSedeTipoTarifaServRef: objDataServicio.objSedeTarifa.intId,
                        ValorReferenciaServicio: objDataServicio.objSedeTarifa.dblValor,
                        ValorTotalServicio:objDataServicio.valor || null,
                        intDuracionHorasReferenciaServicio: objDataServicio.objServicio.objInfoPrincipal.intDuracionHoras || null,
                        intDuracionHorasTotalServicio: objDataServicio.intDuracionHoras || null,
                        strResponsables: JSON.stringify(objDataServicio.strResponsable || null),
                        btFinalizado: false,
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        throw new Error(query.msg);
                    }

                    let intIdServicioFase = query.data.intId;

                    let arrObjetivosServicio = objDataServicio.arrObjetivos;

                    if (arrObjetivosServicio?.length > 0) {
                        for (let k = 0; k < arrObjetivosServicio.length; k++) {
                            let objDataObjetivoServicio =
                                arrObjetivosServicio[k];

                            let query = await dao.setObjetivosServiciosFases({
                                intIdObjetivo: objDataObjetivoServicio.intId,
                                intIdServicios_Fases: intIdServicioFase,
                                btCumplio: false,
                                strObservacionesCumplimiento: "",
                                strUsuarioCreacion: this.#objUser.strEmail,
                            });

                            if (query.error) {
                                throw new Error(query.msg);
                            }
                        }
                    }
                }
            }

            let arrPagos = objDataFase.arrPorcentajes;

            if (arrPagos?.length > 0) {
                for (let j = 0; j < arrPagos.length; j++) {
                    let objDataPago = arrPagos[j];

                    let query = await dao.setPagosFases({
                        intIdFase: this.#intIdFase,
                        ValorTotalFase: objDataFase.dblValorFase,
                        intNumPago: j + 1,
                        intPorcentaje: objDataPago.intPorcentaje,
                        Valor: objDataPago.valorPorce,
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        throw new Error(query.msg);
                    }
                    
                }
            }
        }
    }
}
module.exports = setRutas;
