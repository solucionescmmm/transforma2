//class
const classInterfaceDAORutas = require("../infra/conectors/interfaseDAORutas");

//Librerias
const validator = require("validator").default;

//Servicios
const serviceGetIdEstado = require("./getIdEstadoRutas.service");
const getRutas = require("./getRutas.service");

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
        await this.#validations();
        await this.#getIdEstado();
        this.#completeData();
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

    #completeData() {
        let newData = {
            ...this.#objData,
            intIdEstado: this.#intIdEstado,
            strUsuarioCreacion: this.#objUser.strEmail,
        };
        this.#objData = newData;
    }

    async #setRutas() {
        let dao = new classInterfaceDAORutas();

        let query = await dao.setRutas(this.#objData.objRuta);

        if (query.error) {
            throw new Error(query.msg);
        }

        this.#intIdRuta = query.data[0].intId;

        this.#objResult = {
            error: query.error,
            data: query.data,
            msg: query.msg,
        };
    }

    async #setFases() {
        let dao = new classInterfaceDAORutas();
        let arrayFases = this.#objData.arrFases;

        if (arrayFases.length <= 0) {
            throw new Error("El array de las fases esta vacio.");
        }

        for (let i = 0; i < arrayFases.length; i++) {
            let objDataFase = arrayFases[i];

            let query = await dao.setFases({
                ...objDataFase,
                intIdRuta: this.#intIdRuta,
                intIdEstadoFase: this.#intIdEstado,
                strUsuarioCreacion: this.#objUser.strEmail,
            });

            if (query.error) {
                throw new Error(query.msg);
            }

            this.#intIdFase = query.data[0].intId;

            let arrObjetivos = objDataFase[i].arrObjetivos;

            if (arrObjetivos.length > 0) {
                for (let j = 0; j < arrObjetivos.length; j++) {
                    let objDataObjetivos = arrObjetivos[i];

                    let query = await dao.setObjetivosFases({
                        ...objDataObjetivos,
                        intIdFase: this.#intIdFase,
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        throw new Error(query.msg);
                    }
                }
            }

            let arrPaquetes = objDataFase[i].arrPaquetes;

            if (arrPaquetes.length > 0) {
                for (let j = 0; j < arrPaquetes.length; j++) {
                    let objDataPaquete = arrPaquetes[j];

                    let query = await dao.setPaquetesFases({
                        ...objDataPaquete,
                        intIdFase: this.#intIdFase,
                        strUsuarioCreacion: this.#objUser.strEmail,
                    });

                    if (query.error) {
                        throw new Error(query.msg);
                    }

                    let intIdPaqueteFase = query.data[0].intId;

                    let arrObjetivosPaquete = objDataPaquete[j].arrObjetivos;

                    if (arrObjetivosPaquete?.length > 0) {
                        for (let k = 0; k < arrObjetivosPaquete.length; k++) {
                            let objDataObjetivoPaquete = arrObjetivosPaquete[k];

                            let query = await dao.setObjetivosPaquetesFases({
                                ...objDataObjetivoPaquete,
                                intIdPaquetes_Fases: intIdPaqueteFase,
                                strUsuarioCreacion: this.#objUser.strEmail,
                            });

                            if (query.error) {
                                throw new Error(query.msg);
                            }
                        }
                    }
                }
            }


            

            let arrServicios = objDataFase[i].arrPaquetes;

            if (arrPaquetes.length > 0) {
                for (let j = 0; j < arrPaquetes.length; j++) {
                    let objDataPaquete = arrPaquetes[i];

                    let query = await dao.setFases({
                        ...objDataPaquete,
                        intIdFase: this.#intIdFase,
                        intIdEstadoFase: this.#intIdEstado,
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
