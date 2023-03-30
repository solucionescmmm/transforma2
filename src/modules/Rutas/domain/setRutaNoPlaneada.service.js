//class
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("./getIdEstadoRutas.service");
const serviceGetIdTipo = require("./getIdTipoRutas.service")
const getContadorRutas = require("./getContadorRutas.service")

class setRutaNoPlaneada {
    //obj info
    #objData;
    #objUser;
    #objResult;

    //variables
    #intIdRuta;
    #intIdFase;
    #intIdEstado;
    #intIdTipo;
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
        await this.#getTipoRuta();
        await this.#getIdEstado();
        await this.#getCountRutas();
        await this.#validations();
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
            strNombre: "No planeada",
        });

        if (queryGetIdTipo.error) {
            throw new Error(queryGetIdTipo.msg);
        }

        this.#intIdTipo = queryGetIdTipo.data.intId;
    }

    async #getCountRutas() {
        let queryGetCountRutas = await getContadorRutas({
            intIdIdea: this.#objData.intIdIdea,
        });

        if (queryGetCountRutas.error) {
            throw new Error(queryGetCountRutas.msg);
        }

        this.#intNumRutas = queryGetCountRutas.data.length;
    }

    async #setRutas() {
        let dao = new classInterfaceDAORutas();

        let newData = {
            ...this.#objData,
            strNombre: `Ruta #${this.#intNumRutas + 1}`,
            valorTotalRuta: null,
            intIdTipoRuta: this.#intIdTipo,
            intIdEstadoRuta: this.#intIdEstado,
            valorTotalRuta:0,
            strResponsable: JSON.stringify(this.#objData.strResponsable || null),
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

            let objDataFase = arrayFases[i];

            let query = await dao.setFases({
                intIdRuta: this.#intIdRuta,
                strNombre: `Fase # ${i + 1}`,
                intIdDiagnostico: null,
                intIdEstadoFase: this.#intIdEstado,
                intIdReferenciaTipoTarifa: null,
                valorReferenciaTotalFase: 0,
                valorTotalFase: 0,
                strObservaciones: objDataFase.strObservaciones,
                intIdMotivoCancelacion: null,
                strUsuarioCreacion: this.#objUser.strEmail,
            });

            if (query.error) {
                throw new Error(query.msg);
            }

            this.#intIdFase = query.data.intId;

            let arrPaquetes = objDataFase.arrPaquetes;

            if (arrPaquetes?.length > 0) {
                for (let j = 0; j < arrPaquetes.length; j++) {
                    let objDataPaquete = arrPaquetes[j];

                    let query = await dao.setPaquetesFases({
                        intIdFase: this.#intIdFase,
                        intIdPaquete:
                            objDataPaquete.objInfoPrincipal
                                .intId,
                        ValorReferenciaPaquete: 0,
                        ValorTotalPaquete: 0,
                        strResponsables: JSON.stringify(this.#objData.strResponsable || null),
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        throw new Error(query.msg);
                    }
                }
            }

            let arrServicios = objDataFase.arrServicios;

            if (arrServicios?.length > 0) {
                for (let j = 0; j < arrServicios.length; j++) {
                    let objDataServicio = arrServicios[j];

                    let query = await dao.setServiciosFases({
                        intIdFase: this.#intIdFase,
                        intIdServicio:
                            objDataServicio.objInfoPrincipal
                                .intId,
                        ValorReferenciaServicio:0,
                        ValorTotalServicio:0,
                        strResponsables: JSON.stringify(this.#objData.strResponsable || null),
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
module.exports = setRutaNoPlaneada;
